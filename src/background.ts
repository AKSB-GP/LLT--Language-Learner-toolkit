import { ContextMenu } from './interfaces';
import { listOfContextMenus, LANGUAGE_CODES, DEFAULT_SETTINGS } from './const';

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
    AddPiperTTS(info, tab);
  } else if (info.menuItemId === "pronounce-with-google-tts") {
    AddGoogleTTS(info);
  } else if (info.menuItemId === "lookUp-russian-word") {
    AddWikiSearch(info, tab);
  }
});

function AddGoogleTTS(info: chrome.contextMenus.OnClickData): void {
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

function AddPiperTTS(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void {
  if (info.selectionText && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: "speakSelection",
      text: info.selectionText
    }).catch(err => {
      console.warn("Could not send message to tab. Content script might not be loaded yet.", err);
    });
  }
}

let langModel: any = null;

async function loadLangModel(): Promise<any> {
  if (langModel) return langModel;
  try {
    const url = chrome.runtime.getURL('models/lang_model.json');
    const response = await fetch(url);
    langModel = await response.json();
    return langModel;
  } catch (err) {
    console.error("Failed to load language classification model:", err);
    return null;
  }
}

async function classifyLanguageNaiveBayes(word: string): Promise<'english' | 'swedish' | null> {
  const model = await loadLangModel();
  if (!model) return null;

  const cleanWord = word.trim().toLowerCase().replace(/\s+/g, '_');
  const padded = `_${cleanWord}_`;

  let scoreEn = 0;
  let scoreSv = 0;

  const unseenEn = model.en._UNKNOWN_ || -12.2642;
  const unseenSv = model.sv._UNKNOWN_ || -12.3133;

  for (let i = 0; i < padded.length - 2; i++) {
    const trigram = padded.substring(i, i + 3);
    scoreEn += (trigram in model.en) ? model.en[trigram] : unseenEn;
    scoreSv += (trigram in model.sv) ? model.sv[trigram] : unseenSv;
  }

  return scoreEn >= scoreSv ? 'english' : 'swedish';
}

async function AddIdentifiyLanguage(word: string, tab?: chrome.tabs.Tab): Promise<string | null> {
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
    // Auto decide using Naive Bayes classifier
    return await classifyLanguageNaiveBayes(cleanWord);
  } else {
    // Manual selection popup (Ask me)
    // Does the word have Swedish letters (åäöÅÄÖ)? If yes, it's Swedish.
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

async function AddWikiSearch(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): Promise<void> {
  if (info.selectionText) {
    const determinedCategory = await AddIdentifiyLanguage(info.selectionText, tab);
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
