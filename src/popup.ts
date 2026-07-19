import { VOICES_MAP, DEFAULT_SETTINGS } from './const';

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const languageCategory = document.getElementById('language-category') as HTMLSelectElement;
  const piperVoice = document.getElementById('piper-voice') as HTMLSelectElement;
  const piperSpeed = document.getElementById('piper-speed') as HTMLInputElement;
  const piperNoiseScale = document.getElementById('piper-noise-scale') as HTMLInputElement;
  const piperNoiseW = document.getElementById('piper-noise-w') as HTMLInputElement;

  const googleLanguage = document.getElementById('google-language') as HTMLSelectElement;
  const googleRate = document.getElementById('google-rate') as HTMLInputElement;
  const lookupMethod = document.getElementById('lookup-method') as HTMLSelectElement;

  const toastStatus = document.getElementById('status') as HTMLDivElement;

  // Value label displays
  const piperSpeedVal = document.getElementById('piper-speed-val') as HTMLSpanElement;
  const piperNoiseScaleVal = document.getElementById('piper-noise-scale-val') as HTMLSpanElement;
  const piperNoiseWVal = document.getElementById('piper-noise-w-val') as HTMLSpanElement;
  const googleRateVal = document.getElementById('google-rate-val') as HTMLSpanElement;

  let toastTimeout: number | null = null;

  // Show status update toast
  const triggerSaveToast = () => {
    toastStatus.classList.add('show');
    if (toastTimeout !== null) {
      clearTimeout(toastTimeout);
    }
    toastTimeout = window.setTimeout(() => {
      toastStatus.classList.remove('show');
    }, 1000);
  };

  // Broadcast settings changes to the active tab's content script
  const notifyContentScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "settingsChanged" }).catch(() => { });
      }
    });
  };

  // Populate voice dropdown based on active language category
  const populateVoices = (category: string, selectedVoiceId: string = '') => {
    piperVoice.innerHTML = '';
    const voices = VOICES_MAP[category] || [];
    voices.forEach(voice => {
      const opt = document.createElement('option');
      opt.value = voice.id;
      opt.textContent = voice.name;
      piperVoice.appendChild(opt);
    });
    if (selectedVoiceId) {
      piperVoice.value = selectedVoiceId;
    }
  };

  // Save active voice and corresponding filename prefix
  const saveVoicePreference = () => {
    const category = languageCategory.value;
    const voiceId = piperVoice.value;
    const voices = VOICES_MAP[category] || [];
    const matchedVoice = voices.find(v => v.id === voiceId) || voices[0];

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

  // Load preferences from storage
  chrome.storage.sync.get({
    piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory,
    piperVoice: DEFAULT_SETTINGS.piperVoice,
    piperSpeed: DEFAULT_SETTINGS.piperSpeed,
    piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
    piperNoiseW: DEFAULT_SETTINGS.piperNoiseW,
    googleLanguage: DEFAULT_SETTINGS.googleLanguage,
    googleRate: DEFAULT_SETTINGS.googleRate,
    lookupMethod: DEFAULT_SETTINGS.lookupMethod
  }, (items) => {
    languageCategory.value = items.piperLanguageCategory;
    populateVoices(items.piperLanguageCategory, items.piperVoice);
    lookupMethod.value = items.lookupMethod || DEFAULT_SETTINGS.lookupMethod;

    piperSpeed.value = items.piperSpeed.toString();
    piperNoiseScale.value = items.piperNoiseScale.toString();
    piperNoiseW.value = items.piperNoiseW.toString();
    googleLanguage.value = items.googleLanguage;
    googleRate.value = items.googleRate.toString();

    // Set label text
    piperSpeedVal.textContent = `${parseFloat(items.piperSpeed).toFixed(1)}x`;
    piperNoiseScaleVal.textContent = parseFloat(items.piperNoiseScale).toFixed(2);
    piperNoiseWVal.textContent = parseFloat(items.piperNoiseW).toFixed(2);
    googleRateVal.textContent = `${parseFloat(items.googleRate).toFixed(1)}x`;
  });

  // Event Listeners
  languageCategory.addEventListener('change', () => {
    populateVoices(languageCategory.value);
    saveVoicePreference();
  });

  piperVoice.addEventListener('change', () => {
    saveVoicePreference();
  });

  piperSpeed.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    piperSpeedVal.textContent = `${val.toFixed(1)}x`;
    chrome.storage.sync.set({ piperSpeed: val }, triggerSaveToast);
  });

  piperNoiseScale.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    piperNoiseScaleVal.textContent = val.toFixed(2);
    chrome.storage.sync.set({ piperNoiseScale: val }, triggerSaveToast);
  });

  piperNoiseW.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    piperNoiseWVal.textContent = val.toFixed(2);
    chrome.storage.sync.set({ piperNoiseW: val }, triggerSaveToast);
  });

  googleLanguage.addEventListener('change', () => {
    chrome.storage.sync.set({ googleLanguage: googleLanguage.value }, triggerSaveToast);
  });

  googleRate.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    googleRateVal.textContent = `${val.toFixed(1)}x`;
    chrome.storage.sync.set({ googleRate: val }, triggerSaveToast);
  });

  lookupMethod.addEventListener('change', () => {
    chrome.storage.sync.set({ lookupMethod: lookupMethod.value }, () => {
      triggerSaveToast();
      notifyContentScript();
    });
  });
});
