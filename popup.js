// popup.js – Dynamic voice options controller for local Piper & Google TTS settings

const VOICES_MAP = {
    russian: [
        { id: 'irina', name: 'Irina (Medium, Smooth)', file: 'ru_RU-irina-medium' },
        { id: 'denis', name: 'Denis (Medium, Energetic)', file: 'ru_RU-denis-medium' },
        { id: 'dmitri', name: 'Dmitri (Medium, Natural)', file: 'ru_RU-dmitri-medium' },
        { id: 'ruslan', name: 'Ruslan (Medium, Warm)', file: 'ru_RU-ruslan-medium' }
    ],
    english: [
        { id: 'alan', name: 'Alan (Medium, GB)', file: 'en_GB-alan-medium' },
        { id: 'alba', name: 'Alba (Medium, GB)', file: 'en_GB-alba-medium' },
        { id: 'bryce', name: 'Bryce (Medium, US)', file: 'en_US-bryce-medium' },
        { id: 'hfc_female', name: 'HFC Female (Medium, US)', file: 'en_US-hfc_female-medium' },
        { id: 'hfc_male', name: 'HFC Male (Medium, US)', file: 'en_US-hfc_male-medium' }
    ],
    swedish: [
        { id: 'alma', name: 'Alma (Medium, Soft)', file: 'sv_SE-alma-medium' },
        { id: 'lisa', name: 'Lisa (Medium, Standard)', file: 'sv_SE-lisa-medium' },
        { id: 'nst', name: 'NST (Medium, Standard)', file: 'sv_SE-nst-medium' }
    ]
};

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const languageCategory = document.getElementById('language-category');
    const piperVoice = document.getElementById('piper-voice');
    const piperSpeed = document.getElementById('piper-speed');
    const piperNoiseScale = document.getElementById('piper-noise-scale');
    const piperNoiseW = document.getElementById('piper-noise-w');

    const googleLanguage = document.getElementById('google-language');
    const googleRate = document.getElementById('google-rate');

    const toastStatus = document.getElementById('status');

    // Value label displays
    const piperSpeedVal = document.getElementById('piper-speed-val');
    const piperNoiseScaleVal = document.getElementById('piper-noise-scale-val');
    const piperNoiseWVal = document.getElementById('piper-noise-w-val');
    const googleRateVal = document.getElementById('google-rate-val');

    let toastTimeout = null;

    // Show status update toast
    const triggerSaveToast = () => {
        toastStatus.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
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
    const populateVoices = (category, selectedVoiceId = '') => {
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
        piperLanguageCategory: 'russian',
        piperVoice: 'irina',
        piperSpeed: 1.0,
        piperNoiseScale: 0.667,
        piperNoiseW: 0.8,
        googleLanguage: 'ru-RU',
        googleRate: 1.0
    }, (items) => {
        languageCategory.value = items.piperLanguageCategory;
        populateVoices(items.piperLanguageCategory, items.piperVoice);

        piperSpeed.value = items.piperSpeed;
        piperNoiseScale.value = items.piperNoiseScale;
        piperNoiseW.value = items.piperNoiseW;
        googleLanguage.value = items.googleLanguage;
        googleRate.value = items.googleRate;

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
        const val = parseFloat(e.target.value);
        piperSpeedVal.textContent = `${val.toFixed(1)}x`;
        chrome.storage.sync.set({ piperSpeed: val }, triggerSaveToast);
    });

    piperNoiseScale.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        piperNoiseScaleVal.textContent = val.toFixed(2);
        chrome.storage.sync.set({ piperNoiseScale: val }, triggerSaveToast);
    });

    piperNoiseW.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        piperNoiseWVal.textContent = val.toFixed(2);
        chrome.storage.sync.set({ piperNoiseW: val }, triggerSaveToast);
    });

    googleLanguage.addEventListener('change', () => {
        chrome.storage.sync.set({ googleLanguage: googleLanguage.value }, triggerSaveToast);
    });

    googleRate.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        googleRateVal.textContent = `${val.toFixed(1)}x`;
        chrome.storage.sync.set({ googleRate: val }, triggerSaveToast);
    });
});