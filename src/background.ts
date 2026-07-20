import { ContextMenu, RussianWordAPIResponse, WordAPIResponse, WordAPIResponseFailed } from './interfaces';
import {
  listOfContextMenus,
  LANGUAGE_CODES,
  DEFAULT_SETTINGS,
  RUSSIAN_GENDER_LIST,
  RUSSIAN_ANIMACY_LIST,
  RUSSIAN_CASE_LIST,
  RUSSIAN_NUMBER_LIST
} from './const';
import { eld } from 'eld/extrasmall';

eld.setLanguageSubset(['en', 'sv']);

function CreateContextMenus(): void {
  for (let i = 0; i < listOfContextMenus.length; i++) {
    chrome.contextMenus.create(listOfContextMenus[i]);
  }
}

// 1. Create context menus on installation
chrome.runtime.onInstalled.addListener(() => {
  CreateContextMenus();
});

// 2. Routing clicked menu items
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

function GoogleTTS(info: chrome.contextMenus.OnClickData): void {
  if (info.selectionText) {
    chrome.storage.sync.get({
      googleLanguage: DEFAULT_SETTINGS.googleLanguage,
      googleRate: DEFAULT_SETTINGS.googleRate
    }, (settings) => {
      chrome.tts.speak(info.selectionText!, {
        lang: settings.googleLanguage,
        rate: settings.googleRate
      });
    });
  }
}

function PiperTTS(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void {
  if (info.selectionText && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: "speakSelection",
      text: info.selectionText
    }).catch(err => {
      console.warn("Could not send message to tab. Content script might not be loaded yet.", err);
    });
  }
}
/*
used to predicte if word is english or swedish word
*/
function classifyLatinWord(word: string): 'english' | 'swedish' {
  const result = eld.detect(word);
  return result.language === 'sv' ? 'swedish' : 'english';
}

/*
used to identify what language the word is in.

*/
async function IdentifiyLanguage(word: string, tab?: chrome.tabs.Tab): Promise<string | null> {
  const cleanWord = word.trim();

  // 1. Cyrillic letters? If yes, it's Russian.
  const isCyrillic = /[а-яёА-ЯЁ]/.test(cleanWord);
  if (isCyrillic) {
    return 'russian';
  }

  // Fetch lookup mode
  const settings = await new Promise<{ lookupMethod: string }>(resolve => {
    chrome.storage.sync.get({
      lookupMethod: DEFAULT_SETTINGS.lookupMethod
    }, (items) => {
      resolve(items as { lookupMethod: string });
    });
  });

  const mode = settings.lookupMethod || DEFAULT_SETTINGS.lookupMethod;

  if (mode === 'classifier') {
    // Auto decide using ELD classifier
    return classifyLatinWord(cleanWord);
  } else {
    // Manual selection popup 
    // Swedish letters? If yes --> it's Swedish.
    const isSwedish = /[åäöÅÄÖ]/.test(cleanWord);
    if (isSwedish) {
      return 'swedish';
    }

    // Otherwise, prompt the user with UI in the active tab to choose.
    if (tab?.id) {
      try {
        const response = await chrome.tabs.sendMessage(tab.id, {
          action: "promptLanguageSelection",
          word: cleanWord
        });
        return response?.language || null;
      } catch (err) {
        console.warn("Could not message active tab content script to display prompt dialog:", err);
        return null;
      }
    }
  }

  return null;
}


function getWordOnWikipedia(langCode: string, word: string): string {
  return `https://${langCode}.wikipedia.org/wiki/${word}`;
}

/* english or swedish word */
async function getWordFromFreeDictAPI(langCode: string, word: string): Promise<WordAPIResponse | WordAPIResponseFailed> {
  try {
    const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/${langCode}/${word}`);
    if (response.ok) {
      const responseData = await response.json();
      const entry = responseData.entries?.[0];
      const pageUrl = responseData.source?.url || `https://${langCode}.wikipedia.org/wiki/${word}`;
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
        url: `https://${langCode}.wikipedia.org/wiki/${word}`,
        definition: "Not found",
        wordtype: "Not found",
      };
    }
  } catch (err: any) {
    return {
      url: `https://${langCode}.wikipedia.org/wiki/${word}`,
      definition: "Not found",
      wordtype: "Not found",
      error: err.message,
    };
  }
}
/*
russian words have gender, animate/inanimate and case declension 
*/
async function getRussianWordFromFreeDictAPI(langCode: string, word: string): Promise<RussianWordAPIResponse | WordAPIResponseFailed> {
  const cleanWord = decodeURIComponent(word).trim();
  try {
    const response = await fetch(`https://freedictionaryapi.com/api/v1/entries/${langCode}/${word}`);
    if (response.ok) {
      const responseData = await response.json();
      const entry = responseData.entries?.[0];
      //fallback to wikipedia 
      const pageUrl = responseData.source?.url || `https://${langCode}.wiktionary.org/wiki/${word}`;
      const definition = entry?.senses?.[0]?.definition || "Not found";
      const wordcategory = entry?.partOfSpeech || "not found";

      let gender = "not found";
      let animacy = "not found";
      let caseName = "";



      const cleanInput = cleanWord.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      for (const form of (entry?.forms || [])) {
        const tags = (form.tags || []).map((t: string) => t.toLowerCase());
        if (gender === "not found") {
          const foundG = tags.find((t: string) => (RUSSIAN_GENDER_LIST as readonly string[]).includes(t));
          if (foundG) gender = foundG;
        }
        if (animacy === "not found") {
          const foundA = tags.find((t: string) => (RUSSIAN_ANIMACY_LIST as readonly string[]).includes(t));
          if (foundA) animacy = foundA;
        }
        const cleanFormWord = (form.word || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
        if (cleanFormWord === cleanInput && !caseName) {
          const foundCase = tags.filter((t: string) => (RUSSIAN_CASE_LIST as readonly string[]).includes(t)).join('/');
          const foundNum = tags.filter((t: string) => (RUSSIAN_NUMBER_LIST as readonly string[]).includes(t)).join('/');
          if (foundCase) {
            caseName = foundNum ? `${foundCase} ${foundNum}` : foundCase;
          }
        }
      }

      if (!caseName) {
        const inflectionMatch = definition.match(/((?:[a-z\/]+\s+)*(?:singular|plural))\s+of/i);
        if (inflectionMatch) {
          caseName = inflectionMatch[1].trim();
        }
      }

      const data: RussianWordAPIResponse = {
        url: pageUrl,
        definition: definition,
        wordtype: wordcategory,
        gender: gender,
        animate: animacy,
        case: caseName || "nominative singular"
      };
      return data;
    } else {
      return {
        url: `https://${langCode}.wikipedia.org/wiki/${word}`,
        definition: "Not found",
        wordtype: "Not found",
      };
    }
  } catch (err: any) {
    return {
      url: `https://${langCode}.wikipedia.org/wiki/${word}`,
      definition: "Not found",
      wordtype: "Not found",
      error: err.message,
    };
  }
}

async function getWikiDefinitionOfWord(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): Promise<void> {
  if (info.selectionText && tab?.id) {
    const rawWord = info.selectionText.trim();
    const determinedCategory = await IdentifiyLanguage(rawWord, tab);
    if (!determinedCategory) {
      return;
    }
    const langCode = LANGUAGE_CODES[determinedCategory] || 'en';
    const word = encodeURIComponent(rawWord.toLowerCase());

    if (determinedCategory === 'russian') {
      const data = await getRussianWordFromFreeDictAPI(langCode, word);
      if (data) {
        const lines: string[] = [];
        if ('gender' in data && data.gender !== "not found") {
          const grammar: string[] = [];
          if (data.gender && data.gender !== "not found") grammar.push(`Gender: ${data.gender}`);
          if (data.animate && data.animate !== "not found") grammar.push(`Animacy: ${data.animate}`);
          if (data.case) grammar.push(`Case: ${data.case}`);
          if (grammar.length > 0) {
            lines.push(`[${grammar.join(' | ')}]`);
          }
        }
        lines.push(data.definition);

        chrome.tabs.sendMessage(tab.id, {
          action: "showDefinition",
          word: rawWord,
          definition: lines,
          pageUrl: data.url || `https://${langCode}.wikipedia.org/wiki/${word}`,
          language: determinedCategory,
        }).catch(err => console.warn("Failed to send definition to content script:", err));
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

        chrome.tabs.sendMessage(tab.id, {
          action: "showDefinition",
          word: rawWord,
          definition: lines,
          pageUrl: data.url || `https://${langCode}.wikipedia.org/wiki/${word}`,
          language: determinedCategory,
        }).catch(err => console.warn("Failed to send definition to content script:", err));
        return;
      }
    }
  }
}

async function OpenWordWikiByWord(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): Promise<void> {
  if (info.selectionText) {
    const determinedCategory = await IdentifiyLanguage(info.selectionText, tab);
    if (!determinedCategory) {
      return;
    }
    const langCode = LANGUAGE_CODES[determinedCategory] || 'en';
    const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
    chrome.tabs.create({
      url: `https://${langCode}.wiktionary.org/wiki/${word}`
    });
  }
}
