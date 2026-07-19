import { ContextMenu } from './config/interfaces';
import { listOfContextMenus, LANGUAGE_CODES, DEFAULT_SETTINGS } from './config/const';

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

function AddIdentifiyLanguage(word: string): string {
  return "languages";
}

function AddWikiSearch(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void {
  if (info.selectionText) {
    chrome.storage.sync.get({
      piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory
    }, (settings) => {
      const category = (settings.piperLanguageCategory as string) || DEFAULT_SETTINGS.piperLanguageCategory;
      const langCode = LANGUAGE_CODES[category] || 'en';
      const word = encodeURIComponent(info.selectionText!.trim().toLowerCase());
      chrome.tabs.create({
        url: `https://${langCode}.wiktionary.org/wiki/${word}`
      });
    });
  }
}
