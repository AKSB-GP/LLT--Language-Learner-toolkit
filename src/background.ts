import {
  ContextMenu,
  RussianWordAPIResponse,
  WordAPIResponse,
  WordAPIResponseFailed,
} from "./interfaces";
import {
  listOfContextMenus,
  LANGUAGE_CODES,
  DEFAULT_SETTINGS,
  RUSSIAN_GENDER_LIST,
  RUSSIAN_ANIMACY_LIST,
  RUSSIAN_CASE_LIST,
  RUSSIAN_NUMBER_LIST,
} from "./const";
import { eld } from "eld/extrasmall";

// set eld subsets as to avoid as most languages wont be used
//eld is an word classifier
eld.setLanguageSubset(["en", "sv"]);

/**
 * Creates context menu items registered in `listOfContextMenus`.
 */
function CreateContextMenus(): void {
  for (let i = 0; i < listOfContextMenus.length; i++) {
    chrome.contextMenus.create(listOfContextMenus[i]);
  }
}

/**
 * Listener to register context menus on installation.
 */
chrome.runtime.onInstalled.addListener(() => {
  CreateContextMenus();
});

/**
 * Listener to route context menu click actions to their corresponding handlers.
 */
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "pronounce-with-piper-tts") {
    PiperTTS(info, tab);
  } else if (info.menuItemId === "pronounce-with-google-tts") {
    GoogleTTS(info);
  } else if (info.menuItemId === "open-wikitionary-of-word") {
    OpenWordWikiByWord(info, tab);
  } else if (info.menuItemId === "get-definition-of-word") {
    getWikiDefinitionOfWord(info, tab);
  }
});

/**
 * Triggers Google TTS speech synthesis for the selected text.
 *
 * @param info - The context menu click event data containing selected text.
 */
function GoogleTTS(info: chrome.contextMenus.OnClickData): void {
  if (info.selectionText) {
    chrome.storage.sync.get(
      {
        googleLanguage: DEFAULT_SETTINGS.googleLanguage,
        googleRate: DEFAULT_SETTINGS.googleRate,
      },
      (settings) => {
        chrome.tts.speak(info.selectionText!, {
          lang: settings.googleLanguage,
          rate: settings.googleRate,
        });
      },
    );
  }
}

/**
 * Sends a message to the active tab to perform Piper offline TTS synthesis.
 *
 * @param info - Context menu event data with selection text.
 * @param tab - Active browser tab where the content script is loaded.
 */
function PiperTTS(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
): void {
  if (info.selectionText && tab?.id) {
    chrome.tabs
      .sendMessage(tab.id, {
        action: "speakSelection",
        text: info.selectionText,
      })
      .catch((err) => {
        console.warn(
          "Could not send message to tab. Content script might not be loaded yet.",
          err,
        );
      });
  }
}

/**
 * Classifies a Latin-script word as English or Swedish using ELD language detector.
 *
 * @param word - The word to classify.
 * @returns strings 'english' or 'swedish'.
 */
function classifyLatinWord(word: string): "english" | "swedish" {
  const result = eld.detect(word);
  return result.language === "sv" ? "swedish" : "english";
}

/**
 * Identifies the language category of a word (Russian, English, or Swedish).
 * Uses script detection for Russian, then lookup mode setting (classifier vs manual prompt).
 *
 * @param word - Input word to detect.
 * @param tab - Active tab reference for manual language prompt dialogs.
 * @returns The language name as a string ('russian' | 'english' | 'swedish') or null if undetermined.
 */
async function IdentifiyLanguage(
  word: string,
  tab?: chrome.tabs.Tab,
): Promise<string | null> {
  const cleanWord = word.trim();

  // 1. Cyrillic letters? If yes, it's Russian.
  const isCyrillic = /[а-яёА-ЯЁ]/.test(cleanWord);
  if (isCyrillic) {
    return "russian";
  }

  // check if  user using manual or ELD classification
  const settings = await new Promise<{ lookupMethod: string }>((resolve) => {
    chrome.storage.sync.get(
      {
        lookupMethod: DEFAULT_SETTINGS.lookupMethod,
      },
      (items) => {
        resolve(items as { lookupMethod: string });
      },
    );
  });

  const mode = settings.lookupMethod || DEFAULT_SETTINGS.lookupMethod;

  if (mode === "classifier") {
    // Auto decide using ELD classifier
    return classifyLatinWord(cleanWord);
  } else {
    // Manual selection popup
    // Swedish letters? If yes --> it's Swedish.
    const isSwedish = /[åäöÅÄÖ]/.test(cleanWord);
    if (isSwedish) {
      return "swedish";
    }

    // Otherwise, prompt the user with UI in the active tab to choose.
    if (tab?.id) {
      try {
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "promptLanguageSelection",
          word: cleanWord,
        });
        return response?.language || null;
      } catch (err) {
        console.warn(
          "Could not message active tab content script to display prompt dialog:",
          err,
        );
        return null;
      }
    }
  }

  return null;
}

/**
 * Generates a Wiktionary page URL for a given language code and word.
 *
 * @param langCode - Two-letter language code ('ru', 'en', 'sv').
 * @param word - Target word.
 * @returns Full Wiktionary URL string.
 */
function getWordOnWiktionary(langCode: string, word: string): string {
  return `https://${langCode}.wiktionary.org/wiki/${word.toLocaleLowerCase()}`;
}

/**
 * Fetches definition and part-of-speech metadata for English or Swedish words from Free Dictionary API.
 *
 * @param langCode - Language code string ('en' or 'sv').
 * @param word - Word string to look up .
 * @returns Dictionary response or failed response fallback.
 */
async function getWordFromFreeDictAPI(
  langCode: string,
  word: string,
): Promise<WordAPIResponse | WordAPIResponseFailed> {
  const wordLowerCase = word.toLowerCase();
  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/${langCode}/${wordLowerCase}`,
    );
    if (response.ok) {
      const responseData = await response.json();
      const entry = responseData.entries?.[0];
      const pageUrl =
        responseData.source?.url ||
        getWordOnWiktionary(langCode, wordLowerCase);
      const definition = entry?.senses?.[0]?.definition || "Not found";
      const wordcategory = entry?.partOfSpeech || "not found";

      const data: WordAPIResponse = {
        url: pageUrl,
        definition: definition,
        wordtype: wordcategory,
      };
      return data;
    } else {
      return {
        url: getWordOnWiktionary(langCode, word),
        definition: "Not found",
        wordtype: "Not found",
      };
    }
  } catch (err: any) {
    return {
      url: getWordOnWiktionary(langCode, word),
      definition: "Not found",
      wordtype: "Not found",
      error: err.message,
    };
  }
}

/**
 * Fetches Russian word definition, gender, animacy, and case inflections from Free Dictionary API.
 *
 * @param langCode - Language code ('ru').
 * @param word - Russian word to look up.
 * @returns RussianWordAPIResponse or failed response payload.
 */
async function getRussianWordFromFreeDictAPI(
  langCode: string,
  word: string,
): Promise<RussianWordAPIResponse | WordAPIResponseFailed> {
  const cleanWord = decodeURIComponent(word).trim();
  try {
    const response = await fetch(
      `https://freedictionaryapi.com/api/v1/entries/${langCode}/${word}`,
    );
    if (response.ok) {
      const responseData = await response.json();
      const entry = responseData.entries?.[0];
      const pageUrl =
        responseData.source?.url || getWordOnWiktionary(langCode, word);
      const definition = entry?.senses?.[0]?.definition || "Not found";
      const wordcategory = entry?.partOfSpeech || "not found";
      //set stating values for gender, animacy and case
      let gender = "not found";
      let animacy = "not found";
      let caseName = "";
      // normalize the word for comparison since some sites use word stress markings
      //"за́мок" becomes "замок for instance
      const cleanInput = cleanWord
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      for (const form of entry?.forms || []) {
        //clean tags to lowercase for comparision
        const tags = (form.tags || []).map((t: string) => t.toLowerCase());
        //gender check, check if gender
        if (gender === "not found") {
          const foundG = tags.find((t: string) =>
            (RUSSIAN_GENDER_LIST as readonly string[]).includes(t),
          );
          if (foundG) gender = foundG;
        }
        //animacy check
        if (animacy === "not found") {
          const foundA = tags.find((t: string) =>
            (RUSSIAN_ANIMACY_LIST as readonly string[]).includes(t),
          );
          if (foundA) animacy = foundA;
        }
        //normalize word for comparision, sanity check
        const cleanFormWord = (form.word || "")
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");

        if (cleanFormWord === cleanInput && !caseName) {
          // join tags with /
          const foundCase = tags
            .filter((t: string) =>
              (RUSSIAN_CASE_LIST as readonly string[]).includes(t),
            )
            .join("/");
          const foundNum = tags
            .filter((t: string) =>
              (RUSSIAN_NUMBER_LIST as readonly string[]).includes(t),
            )
            .join("/");
          if (foundCase) {
            //If a case was found, combines case and number (e.g. "genitive singular") into caseName.
            caseName = foundNum ? `${foundCase} ${foundNum}` : foundCase;
          }
        }
      }
      //look for "singular, "plural" constructions in api
      if (!caseName) {
        const inflectionMatch = definition.match(
          /((?:[a-z\/]+\s+)*(?:singular|plural))\s+of/i,
        );
        if (inflectionMatch) {
          caseName = inflectionMatch[1].trim();
        }
      }
      //build api response
      const data: RussianWordAPIResponse = {
        url: pageUrl,
        definition: definition,
        wordtype: wordcategory,
        gender: gender,
        animate: animacy,
        case: caseName || "nominative singular",
      };
      return data;
    } else {
      return {
        url: getWordOnWiktionary(langCode, word),
        definition: "Not found on Freedict, check wiktionary",
        wordtype: "Not found",
      };
    }
  } catch (err: any) {
    return {
      url: getWordOnWiktionary(langCode, word),
      definition: "Not found",
      wordtype: "Not found",
      error: err.message,
    };
  }
}

/**
 * Handles context menu click for "Get definition of word".
 * Detects word language, fetches definition from API, and sends definition payload to tab content script.
 *
 * @param info - Context menu click data.
 * @param tab - Active browser tab.
 */
async function getWikiDefinitionOfWord(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
): Promise<void> {
  if (info.selectionText && tab?.id) {
    const rawWord = info.selectionText.trim();
    const determinedCategory = await IdentifiyLanguage(rawWord, tab);
    if (!determinedCategory) {
      return;
    }
    const langCode = LANGUAGE_CODES[determinedCategory] || "en";
    const word = encodeURIComponent(rawWord.toLowerCase());

    /*russian words require more processing */
    if (determinedCategory === "russian") {
      const data = await getRussianWordFromFreeDictAPI(langCode, word);
      if (data) {
        const lines: string[] = [];
        //check if gender, animacy and case is present in data response and add to toast if so
        if ("gender" in data && data.gender !== "not found") {
          const grammar: string[] = [];
          if (data.gender && data.gender !== "not found")
            grammar.push(`Gender: ${data.gender}`);
          if (data.animate && data.animate !== "not found")
            grammar.push(`Animacy: ${data.animate}`);
          if (data.case) grammar.push(`Case: ${data.case}`);
          if (grammar.length > 0) {
            lines.push(`[${grammar.join(" | ")}]`);
          }
        }
        lines.push(data.definition);
        //send to toast
        chrome.tabs
          .sendMessage(tab.id, {
            action: "showDefinition",
            word: rawWord,
            definition: lines,
            pageUrl:
              data.url || `https://${langCode}.wikipedia.org/wiki/${word}`,
            language: determinedCategory,
          })
          .catch((err) =>
            console.warn("Failed to send definition to content script:", err),
          );
        return;
      }
    }

    /* english or swedish word */
    else {
      const data = await getWordFromFreeDictAPI(langCode, word);
      if (data) {
        const lines: string[] = [];
        if (data.wordtype && data.wordtype !== "Not found") {
          lines.push(`[Type: ${data.wordtype}]`);
        }
        lines.push(data.definition);
        //send to toast
        chrome.tabs
          .sendMessage(tab.id, {
            action: "showDefinition",
            word: rawWord,
            definition: lines,
            pageUrl:
              data.url || `https://${langCode}.wikipedia.org/wiki/${word}`,
            language: determinedCategory,
          })
          .catch((err) =>
            console.warn("Failed to send definition to content script:", err),
          );
        return;
      }
    }
  }
}

/**
 * Handles context menu click for "Open Wiktionary of word".
 * Detects word language and opens corresponding Wiktionary URL in a new browser tab.
 *
 * @param info - Context menu click data.
 * @param tab - Active browser tab.
 */
async function OpenWordWikiByWord(
  info: chrome.contextMenus.OnClickData,
  tab?: chrome.tabs.Tab,
): Promise<void> {
  if (info.selectionText) {
    const determinedCategory = await IdentifiyLanguage(info.selectionText, tab);
    if (!determinedCategory) {
      return;
    }
    //fallback to english
    const langCode = LANGUAGE_CODES[determinedCategory] || "en";
    const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
    chrome.tabs.create({
      url: `https://${langCode}.wiktionary.org/wiki/${word}`,
    });
  }
}
