"use strict";
(() => {
  // src/const.ts
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
  async function AddIdentifiyLanguage(word, tab) {
    const cleanWord = word.trim();
    const isCyrillic = /[а-яёА-ЯЁ]/.test(cleanWord);
    if (isCyrillic) {
      return "russian";
    }
    const isSwedish = /[åäöÅÄÖ]/.test(cleanWord);
    if (isSwedish) {
      return "swedish";
    }
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
    return null;
  }
  async function AddWikiSearch(info, tab) {
    if (info.selectionText) {
      const determinedCategory = await AddIdentifiyLanguage(info.selectionText, tab);
      if (!determinedCategory) {
        return;
      }
      const langCode = LANGUAGE_CODES[determinedCategory] || "en";
      const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
      chrome.tabs.create({
        url: `https://${langCode}.wiktionary.org/wiki/${word}`
      });
    }
  }
})();
//# sourceMappingURL=background.js.map
