"use strict";
(() => {
  // src/background.ts
  var listOfContextMenus = [
    { id: "pronounce-with-piper-tts", title: "Pronounce in Russian (Piper)", contexts: ["selection"] },
    { id: "pronounce-with-google-tts", title: "Pronounce in Russian (Google TTS)", contexts: ["selection"] },
    { id: "lookUp-russian-word", title: "Look up meaning", contexts: ["selection"] }
  ];
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
      AddGoogleTTS(info, tab);
    } else if (info.menuItemId === "lookUp-russian-word") {
      AddWikiSearch(info, tab);
    }
  });
  function AddGoogleTTS(info, tab) {
    if (info.selectionText) {
      chrome.storage.sync.get({
        googleLanguage: "ru-RU",
        googleRate: 1
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
        piperLanguageCategory: "russian"
      }, (settings) => {
        const langCodes = {
          russian: "ru",
          english: "en",
          swedish: "sv"
        };
        const category = settings.piperLanguageCategory || "russian";
        const langCode = langCodes[category] || "en";
        const word = encodeURIComponent(info.selectionText.trim().toLowerCase());
        chrome.tabs.create({
          url: `https://${langCode}.wiktionary.org/wiki/${word}`
        });
      });
    }
  }
})();
//# sourceMappingURL=background.js.map
