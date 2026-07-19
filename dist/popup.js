"use strict";
(() => {
  // src/const.ts
  var VOICES_MAP = {
    russian: [
      { id: "irina", name: "Irina (Medium, Smooth)", file: "ru_RU-irina-medium" },
      { id: "denis", name: "Denis (Medium, Energetic)", file: "ru_RU-denis-medium" },
      { id: "dmitri", name: "Dmitri (Medium, Natural)", file: "ru_RU-dmitri-medium" },
      { id: "ruslan", name: "Ruslan (Medium, Warm)", file: "ru_RU-ruslan-medium" }
    ],
    english: [
      { id: "alan", name: "Alan (Medium, GB)", file: "en_GB-alan-medium" },
      { id: "alba", name: "Alba (Medium, GB)", file: "en_GB-alba-medium" },
      { id: "bryce", name: "Bryce (Medium, US)", file: "en_US-bryce-medium" },
      { id: "hfc_female", name: "HFC Female (Medium, US)", file: "en_US-hfc_female-medium" },
      { id: "hfc_male", name: "HFC Male (Medium, US)", file: "en_US-hfc_male-medium" }
    ],
    swedish: [
      { id: "alma", name: "Alma (Medium, Soft)", file: "sv_SE-alma-medium" },
      { id: "lisa", name: "Lisa (Medium, Standard)", file: "sv_SE-lisa-medium" },
      { id: "nst", name: "NST (Medium, Standard)", file: "sv_SE-nst-medium" }
    ]
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

  // src/popup.ts
  document.addEventListener("DOMContentLoaded", () => {
    const languageCategory = document.getElementById("language-category");
    const piperVoice = document.getElementById("piper-voice");
    const piperSpeed = document.getElementById("piper-speed");
    const piperNoiseScale = document.getElementById("piper-noise-scale");
    const piperNoiseW = document.getElementById("piper-noise-w");
    const googleLanguage = document.getElementById("google-language");
    const googleRate = document.getElementById("google-rate");
    const toastStatus = document.getElementById("status");
    const piperSpeedVal = document.getElementById("piper-speed-val");
    const piperNoiseScaleVal = document.getElementById("piper-noise-scale-val");
    const piperNoiseWVal = document.getElementById("piper-noise-w-val");
    const googleRateVal = document.getElementById("google-rate-val");
    let toastTimeout = null;
    const triggerSaveToast = () => {
      toastStatus.classList.add("show");
      if (toastTimeout !== null) {
        clearTimeout(toastTimeout);
      }
      toastTimeout = window.setTimeout(() => {
        toastStatus.classList.remove("show");
      }, 1e3);
    };
    const notifyContentScript = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: "settingsChanged" }).catch(() => {
          });
        }
      });
    };
    const populateVoices = (category, selectedVoiceId = "") => {
      piperVoice.innerHTML = "";
      const voices = VOICES_MAP[category] || [];
      voices.forEach((voice) => {
        const opt = document.createElement("option");
        opt.value = voice.id;
        opt.textContent = voice.name;
        piperVoice.appendChild(opt);
      });
      if (selectedVoiceId) {
        piperVoice.value = selectedVoiceId;
      }
    };
    const saveVoicePreference = () => {
      const category = languageCategory.value;
      const voiceId = piperVoice.value;
      const voices = VOICES_MAP[category] || [];
      const matchedVoice = voices.find((v) => v.id === voiceId) || voices[0];
      if (matchedVoice) {
        chrome.storage.sync.set({
          piperLanguageCategory: category,
          piperVoice: matchedVoice.id,
          piperVoiceFile: matchedVoice.file
        }, () => {
          triggerSaveToast();
          notifyContentScript();
        });
      }
    };
    chrome.storage.sync.get({
      piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory,
      piperVoice: DEFAULT_SETTINGS.piperVoice,
      piperSpeed: DEFAULT_SETTINGS.piperSpeed,
      piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
      piperNoiseW: DEFAULT_SETTINGS.piperNoiseW,
      googleLanguage: DEFAULT_SETTINGS.googleLanguage,
      googleRate: DEFAULT_SETTINGS.googleRate
    }, (items) => {
      languageCategory.value = items.piperLanguageCategory;
      populateVoices(items.piperLanguageCategory, items.piperVoice);
      piperSpeed.value = items.piperSpeed.toString();
      piperNoiseScale.value = items.piperNoiseScale.toString();
      piperNoiseW.value = items.piperNoiseW.toString();
      googleLanguage.value = items.googleLanguage;
      googleRate.value = items.googleRate.toString();
      piperSpeedVal.textContent = `${parseFloat(items.piperSpeed).toFixed(1)}x`;
      piperNoiseScaleVal.textContent = parseFloat(items.piperNoiseScale).toFixed(2);
      piperNoiseWVal.textContent = parseFloat(items.piperNoiseW).toFixed(2);
      googleRateVal.textContent = `${parseFloat(items.googleRate).toFixed(1)}x`;
    });
    languageCategory.addEventListener("change", () => {
      populateVoices(languageCategory.value);
      saveVoicePreference();
    });
    piperVoice.addEventListener("change", () => {
      saveVoicePreference();
    });
    piperSpeed.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      piperSpeedVal.textContent = `${val.toFixed(1)}x`;
      chrome.storage.sync.set({ piperSpeed: val }, triggerSaveToast);
    });
    piperNoiseScale.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      piperNoiseScaleVal.textContent = val.toFixed(2);
      chrome.storage.sync.set({ piperNoiseScale: val }, triggerSaveToast);
    });
    piperNoiseW.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      piperNoiseWVal.textContent = val.toFixed(2);
      chrome.storage.sync.set({ piperNoiseW: val }, triggerSaveToast);
    });
    googleLanguage.addEventListener("change", () => {
      chrome.storage.sync.set({ googleLanguage: googleLanguage.value }, triggerSaveToast);
    });
    googleRate.addEventListener("input", (e) => {
      const target = e.target;
      const val = parseFloat(target.value);
      googleRateVal.textContent = `${val.toFixed(1)}x`;
      chrome.storage.sync.set({ googleRate: val }, triggerSaveToast);
    });
  });
})();
//# sourceMappingURL=popup.js.map
