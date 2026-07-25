// background.js – Context menu relay worker (thin background wrapper)

const listOfContextMenus = [
  { id: "pronounce-with-piper-tts", title: "Pronounce in Russian (Piper)", contexts: ["selection"] },
  { id: "pronounce-with-google-tts", title: "Pronounce in Russian (Google TTS)", contexts: ["selection"] },
  { id: "open-wikitionary-of-word", title: "Look up meaning", contexts: ["selection"] },
];

function CreateContextMenus() {
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
  } else if (info.menuItemId === "open-wikitionary-of-word") {
    AddWikiSearch(info, tab);
  }
});

function AddGoogleTTS(info) {
  if (info.selectionText) {
    chrome.storage.sync.get({
      googleLanguage: 'ru-RU',
      googleRate: 1.0
    }, (settings) => {
      chrome.tts.speak(info.selectionText, {
        lang: settings.googleLanguage,
        rate: settings.googleRate
      });
    });
  }
}

function AddPiperTTS(info, tab) {
  if (info.selectionText && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: "speakSelection",
      text: info.selectionText
    }).catch(err => {
      console.warn("Could not send message to tab. Content script might not be loaded yet.", err);
    });
  }
}



function AddWikiSearch(info) {
  if (info.selectionText) {
    chrome.storage.sync.get({
      piperLanguageCategory: 'russian'
    }, (settings) => {
      const langCodes = {
        russian: 'ru',
        english: 'en',
        swedish: 'sv'
      };
      const langCode = langCodes[settings.piperLanguageCategory] || 'en';
      const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
      chrome.tabs.create({
        url: `https://${langCode}.wiktionary.org/wiki/${word}`
      });
    });
  }
}