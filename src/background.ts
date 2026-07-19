interface ContextMenu {
  id: string;
  title: string;
  contexts: chrome.contextMenus.ContextType[];
}

const listOfContextMenus: ContextMenu[] = [
  { id: "pronounce-with-piper-tts", title: "Pronounce in Russian (Piper)", contexts: ["selection"] },
  { id: "pronounce-with-google-tts", title: "Pronounce in Russian (Google TTS)", contexts: ["selection"] },
  { id: "lookUp-russian-word", title: "Look up meaning", contexts: ["selection"] },
];

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
    AddGoogleTTS(info, tab);
  } else if (info.menuItemId === "lookUp-russian-word") {
    AddWikiSearch(info, tab);
  }
});

function AddGoogleTTS(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void {
  if (info.selectionText) {
    chrome.storage.sync.get({
      googleLanguage: 'ru-RU',
      googleRate: 1.0
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

function AddWikiSearch(info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab): void {
  if (info.selectionText) {
    chrome.storage.sync.get({
      piperLanguageCategory: 'russian'
    }, (settings) => {
      const langCodes: Record<string, string> = {
        russian: 'ru',
        english: 'en',
        swedish: 'sv'
      };
      const category = (settings.piperLanguageCategory as string) || 'russian';
      const langCode = langCodes[category] || 'en';
      const word = encodeURIComponent(info.selectionText!.trim().toLowerCase());
      chrome.tabs.create({
        url: `https://${langCode}.wiktionary.org/wiki/${word}`
      });
    });
  }
}
