"use strict";
(() => {
  // src/config/const.ts
  var listOfContextMenus = [
    { id: "pronounce-with-piper-tts", title: "Pronounce in Russian (Piper)", contexts: ["selection"] },
    { id: "pronounce-with-google-tts", title: "Pronounce in Russian (Google TTS)", contexts: ["selection"] },
    { id: "lookUp-russian-word", title: "Look up meaning", contexts: ["selection"] }
  ];
  var LANGUAGE_CODES = {
    russian: "ru",
    english: "en",
    swedish: "sv"
  };
  var DEFAULT_SETTINGS = {
    piperLanguageCategory: "russian",
    piperVoice: "irina",
    piperVoiceFile: "ru_RU-irina-medium",
    piperSpeed: 1,
    piperNoiseScale: 0.667,
    piperNoiseW: 0.8,
    googleLanguage: "ru-RU",
    googleRate: 1
  };

  // src/background.ts
  function CreateContextMenus() {
    for (let i = 0; i < listOfContextMenus.length; i++) {
      chrome.contextMenus.create(listOfContextMenus[i]);
    }
  }
  chrome.runtime.onInstalled.addListener(() => {
    CreateContextMenus();
  });
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "pronounce-with-piper-tts") {
      AddPiperTTS(info, tab);
    } else if (info.menuItemId === "pronounce-with-google-tts") {
      AddGoogleTTS(info);
    } else if (info.menuItemId === "lookUp-russian-word") {
      AddWikiSearch(info, tab);
    }
  });
  function AddGoogleTTS(info) {
    if (info.selectionText) {
      chrome.storage.sync.get({
        googleLanguage: DEFAULT_SETTINGS.googleLanguage,
        googleRate: DEFAULT_SETTINGS.googleRate
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
      }).catch((err) => {
        console.warn("Could not send message to tab. Content script might not be loaded yet.", err);
      });
    }
  }
  function AddWikiSearch(info, tab) {
    if (info.selectionText) {
      chrome.storage.sync.get({
        piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory
      }, (settings) => {
        const category = settings.piperLanguageCategory || DEFAULT_SETTINGS.piperLanguageCategory;
        const langCode = LANGUAGE_CODES[category] || "en";
        const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
        chrome.tabs.create({
          url: `https://${langCode}.wiktionary.org/wiki/${word}`
        });
      });
    }
  }
})();
//# sourceMappingURL=background.js.map
