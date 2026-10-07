import { VOICES_MAP, DEFAULT_SETTINGS, LANGUAGE_CODES } from "./const";
import { DatabaseModel } from "./model/DatabaseModel";
import { GoogleTranslatorModel } from "./model/GoogleTranslatorModel";
import { SendChromeMessage, CreateChromeTabMessage } from "./utils/chrome";
import initSqlJs from "sql.js";
import { Package, Deck, Notetype, Note } from "ankipack";
import ankiCss from "../Anki.css";
/*add listeners for extension panel */
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const languageCategory = document.getElementById(
    "language-category",
  ) as HTMLSelectElement;
  const piperVoice = document.getElementById(
    "piper-voice",
  ) as HTMLSelectElement;
  const piperSpeed = document.getElementById("piper-speed") as HTMLInputElement;
  const piperNoiseScale = document.getElementById(
    "piper-noise-scale",
  ) as HTMLInputElement;
  const piperNoiseW = document.getElementById(
    "piper-noise-w",
  ) as HTMLInputElement;

  const googleLanguage = document.getElementById(
    "google-language",
  ) as HTMLSelectElement;
  const googleTranslateTargetLanguage = document.getElementById(
    "google-translate-target-language",
  ) as HTMLSelectElement | null;
  const googleRate = document.getElementById("google-rate") as HTMLInputElement;
  const lookupMethod = document.getElementById(
    "lookup-method",
  ) as HTMLSelectElement;

  const toastStatus = document.getElementById("status") as HTMLDivElement;

  // Value label displays
  const piperSpeedVal = document.getElementById(
    "piper-speed-val",
  ) as HTMLSpanElement;
  const piperNoiseScaleVal = document.getElementById(
    "piper-noise-scale-val",
  ) as HTMLSpanElement;
  const piperNoiseWVal = document.getElementById(
    "piper-noise-w-val",
  ) as HTMLSpanElement;
  const googleRateVal = document.getElementById(
    "google-rate-val",
  ) as HTMLSpanElement;

  let toastTimeout: number | null = null;

  // Show status update toast
  const triggerSaveToast = () => {
    toastStatus.classList.add("show");
    if (toastTimeout !== null) {
      clearTimeout(toastTimeout);
    }
    toastTimeout = window.setTimeout(() => {
      toastStatus.classList.remove("show");
    }, 1000);
  };

  // Broadcast settings changes to the active tabs content script
  const notifyContentScript = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        SendChromeMessage(tabs[0].id, { action: "settingsChanged" })
          .catch(() => { });
      }
    });
  };

  // Populate voice dropdown based on active language category
  const populateVoices = (category: string, selectedVoiceId: string = "") => {
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

  // Save active voice and corresponding filename prefix
  const saveVoicePreference = () => {
    const category = languageCategory.value;
    const voiceId = piperVoice.value;
    const voices = VOICES_MAP[category] || [];
    const matchedVoice = voices.find((v) => v.id === voiceId) || voices[0];

    if (matchedVoice) {
      chrome.storage.sync.set(
        {
          piperLanguageCategory: category,
          piperVoice: matchedVoice.id,
          piperVoiceFile: matchedVoice.file,
        },
        () => {
          triggerSaveToast();
          notifyContentScript();
        },
      );
    }
  };

  // Load preferences from storage
  chrome.storage.sync.get(
    {
      piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory,
      piperVoice: DEFAULT_SETTINGS.piperVoice,
      piperSpeed: DEFAULT_SETTINGS.piperSpeed,
      piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
      piperNoiseW: DEFAULT_SETTINGS.piperNoiseW,
      googleLanguage: DEFAULT_SETTINGS.googleLanguage,
      googleTranslateTargetLanguage: DEFAULT_SETTINGS.googleTranslateTargetLanguage,
      googleRate: DEFAULT_SETTINGS.googleRate,
      lookupMethod: DEFAULT_SETTINGS.lookupMethod,
    },
    (items) => {
      languageCategory.value = items.piperLanguageCategory;
      populateVoices(items.piperLanguageCategory, items.piperVoice);
      lookupMethod.value = items.lookupMethod || DEFAULT_SETTINGS.lookupMethod;
      //set speed settings
      piperSpeed.value = items.piperSpeed.toString();
      piperNoiseScale.value = items.piperNoiseScale.toString();
      piperNoiseW.value = items.piperNoiseW.toString();
      googleLanguage.value = items.googleLanguage;
      if (googleTranslateTargetLanguage) {
        googleTranslateTargetLanguage.value = items.googleTranslateTargetLanguage || DEFAULT_SETTINGS.googleTranslateTargetLanguage;
      }
      googleRate.value = items.googleRate.toString();

      // Set label text
      piperSpeedVal.textContent = `${parseFloat(items.piperSpeed).toFixed(1)}x`;
      piperNoiseScaleVal.textContent = parseFloat(
        items.piperNoiseScale,
      ).toFixed(2);
      piperNoiseWVal.textContent = parseFloat(items.piperNoiseW).toFixed(2);
      googleRateVal.textContent = `${parseFloat(items.googleRate).toFixed(1)}x`;
    },
  );

  // Event Listeners
  languageCategory.addEventListener("change", () => {
    populateVoices(languageCategory.value);
    saveVoicePreference();
  });

  piperVoice.addEventListener("change", () => {
    saveVoicePreference();
  });

  piperSpeed.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    piperSpeedVal.textContent = `${val.toFixed(1)}x`;
    chrome.storage.sync.set({ piperSpeed: val }, triggerSaveToast);
  });

  piperNoiseScale.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    piperNoiseScaleVal.textContent = val.toFixed(2);
    chrome.storage.sync.set({ piperNoiseScale: val }, triggerSaveToast);
  });

  piperNoiseW.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    piperNoiseWVal.textContent = val.toFixed(2);
    chrome.storage.sync.set({ piperNoiseW: val }, triggerSaveToast);
  });

  googleLanguage.addEventListener("change", () => {
    chrome.storage.sync.set(
      { googleLanguage: googleLanguage.value },
      triggerSaveToast,
    );
  });

  if (googleTranslateTargetLanguage) {
    googleTranslateTargetLanguage.addEventListener("change", () => {
      chrome.storage.sync.set(
        { googleTranslateTargetLanguage: googleTranslateTargetLanguage.value },
        triggerSaveToast,
      );
    });
  }

  googleRate.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const val = parseFloat(target.value);
    googleRateVal.textContent = `${val.toFixed(1)}x`;
    chrome.storage.sync.set({ googleRate: val }, triggerSaveToast);
  });

  lookupMethod.addEventListener("change", () => {
    chrome.storage.sync.set({ lookupMethod: lookupMethod.value }, () => {
      triggerSaveToast();
      notifyContentScript();
    });
  });

  const exportCsvBtn = document.getElementById(
    "export-csv-btn",
  ) as HTMLButtonElement | null;
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener("click", async () => {
      const dbModel = new DatabaseModel();
      const records = await dbModel.getAllVocabulary();
      if (!records || records.length === 0) {
        alert("No vocabulary words saved yet.");
        return;
      }

      // Deduplicate records by normalized word + language key
      const seen = new Set<string>();
      const uniqueRecords: typeof records = [];

      for (const r of records) {
        const key = `${r.word.trim().toLowerCase()}_${r.language.trim().toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueRecords.push(r);
        }
      }

      if (uniqueRecords.length === 0) {
        alert("No vocabulary words saved yet.");
        return;
      }

      // Anki import metadata directives & column headers
      const ankiHeaderDirectives = [
        "#separator:tab",
        "#html:true",
        "#tags column:5",
        "Word\tDefinition\tAudio\tWiktionary URL\tTags",
      ];

      const translatorModel = new GoogleTranslatorModel();
      const rowPromises = uniqueRecords.map(async (r) => {
        const cleanWord = r.word.trim();
        const langCategory = (r.language || "english").toLowerCase();
        const langCode = (LANGUAGE_CODES as Record<string, string>)[langCategory] || "en";
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanWord)}&tl=${langCode}&client=tw-ob`;
        const audioTag = `[audio:${audioUrl}]`;
        const tag = `LLT_Vocabulary LLT_${langCategory}`;
        let definition = (r.definition || "").replace(/\t/g, " ").replace(/\n/g, "<br>");
        if (!definition || definition === "Saved from context menu" || definition === "Not found") {
          try {
            definition = await translatorModel.Translate(cleanWord, langCode);
          } catch { }
        } else if (!definition.includes("Google Translation")) {
          try {
            const translation = await translatorModel.Translate(cleanWord, langCode);
            if (translation && !definition.includes(translation)) {
              definition = `${definition}<br>Google Translation: ${translation}`;
            }
          } catch { }
        }
        const pageUrl = r.pageUrl || "";

        return `${cleanWord}\t${definition}\t${audioTag}\t${pageUrl}\t${tag}`;
      });

      const rows = await Promise.all(rowPromises);

      const csvContent = [...ankiHeaderDirectives, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/tab-separated-values;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `LLT_Anki_Vocabulary_${new Date().toISOString().split("T")[0]}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  const exportApkgBtn = document.getElementById(
    "export-apkg-btn",
  ) as HTMLButtonElement | null;
  if (exportApkgBtn) {
    exportApkgBtn.addEventListener("click", async () => {
      const dbModel = new DatabaseModel();
      const records = await dbModel.getAllVocabulary();
      if (!records || records.length === 0) {
        alert("No vocabulary words saved yet.");
        return;
      }

      // Deduplicate records by normalized word + language key
      const seen = new Set<string>();
      const uniqueRecords: typeof records = [];

      for (const r of records) {
        const key = `${r.word.trim().toLowerCase()}_${r.language.trim().toLowerCase()}`;
        if (!seen.has(key)) {
          seen.add(key);
          uniqueRecords.push(r);
        }
      }

      if (uniqueRecords.length === 0) {
        alert("No vocabulary words saved yet.");
        return;
      }

      try {
        if (toastStatus) {
          toastStatus.textContent = "GENERATING DECK...";
          toastStatus.classList.add("show");
        }

        // Initialize sql.js with local WASM binary from extension dist
        const wasmUrl = chrome.runtime.getURL("dist/sql-wasm.wasm");
        const SQL = await initSqlJs({
          locateFile: () => wasmUrl,
        });

        const notetype = Notetype.basic({
          name: "LLT Vocabulary Note",
          css: ankiCss,
        });

        const deck = new Deck({
          name: "LLT_exported_deck_" + Date.now().toString(),
          id: Date.now(),
          description: "Saved vocabulary deck exported from LLT extension",
        });

        const pkg = new Package();
        const translatorModel = new GoogleTranslatorModel();

        for (const r of uniqueRecords) {
          const cleanWord = r.word.trim();
          const langCategory = (r.language || "english").toLowerCase();
          const langCode = (LANGUAGE_CODES as Record<string, string>)[langCategory] || "en";

          let definition = (r.definition || "").replace(/\n/g, "<br>");
          //if word is not found on freedictapi then use google translate to get a defintiion, 
          // not perfect but better than nothing
          if (!definition || definition === "Saved from context menu" || definition === "Not found") {
            try {
              definition = await translatorModel.Translate(cleanWord, langCode);
            } catch { }
          } else if (!definition.includes("Google Translation")) {
            try {
              const translation = await translatorModel.Translate(cleanWord, langCode);
              if (translation && !definition.includes(translation)) {
                definition = `${definition}<br>Google Translation: ${translation}`;
              }
            } catch { }
          }

          const pageUrl = r.pageUrl || "";
          let soundTag = "";

          try {
            const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanWord)}&tl=${langCode}&client=tw-ob`;
            const audioRes = await fetch(audioUrl);
            if (audioRes.ok) {
              const audioBuffer = await audioRes.arrayBuffer();
              const audioBytes = new Uint8Array(audioBuffer);
              const safeAudioName = `llt_${langCode}_${encodeURIComponent(cleanWord.toLowerCase()).replace(/%/g, "_")}.mp3`;
              pkg.addMedia(safeAudioName, audioBytes);
              soundTag = `[sound:${safeAudioName}]`;
            }
          } catch (audioErr) {
            console.warn(`Could not fetch Anki audio for ${cleanWord}:`, audioErr);
          }

          const frontHtml = `<div class="front-word">${cleanWord}</div>`;
          const backHtml = `
            <div class="back-word">${definition}</div>
            ${soundTag ? `<div class="anki-sound">${soundTag}</div>` : ""}
            ${pageUrl ? `<div class="wiktionary-link"><a href="${pageUrl}">View Wiktionary</a></div>` : ""}
          `;

          // Generate stable deterministic GUID per word + language (URL-encoded to prevent non-ASCII collision)
          const safeGuid = `llt_${encodeURIComponent(cleanWord.toLowerCase()).replace(/%/g, "_")}_${langCategory}`.slice(0, 255);

          deck.addNote(
            new Note({
              guid: safeGuid,
              notetype,
              fields: [frontHtml, backHtml],
              tags: ["LLT", `LLT_${langCategory}`],
            })
          );
        }

        pkg.addDeck(deck);

        const bytes = await pkg.toUint8Array(SQL);
        const blob = new Blob([bytes.buffer as ArrayBuffer], { type: "application/apkg" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `LLT_Vocabulary_${new Date().toISOString().split("T")[0]}.apkg`;
        a.click();
        URL.revokeObjectURL(url);

        if (toastStatus) {
          toastStatus.textContent = "SAVED";
          triggerSaveToast();
        }
      } catch (err: any) {
        console.error("Failed to generate Anki .apkg deck:", err);
        alert(`Could not generate .apkg deck: ${err?.message || err}`);
        if (toastStatus) {
          toastStatus.classList.remove("show");
        }
      }
    });
  }

  const clearAudioCacheBtn = document.getElementById(
    "clear-audio-cache-btn",
  ) as HTMLButtonElement | null;
  if (clearAudioCacheBtn) {
    clearAudioCacheBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to clear the cached audio recordings? This cannot be undone.")) {
        const dbModel = new DatabaseModel();
        await dbModel.clearAudioCache();
        triggerSaveToast();
      }
    });
  }

  const clearVocabBtn = document.getElementById(
    "clear-vocab-btn",
  ) as HTMLButtonElement | null;
  if (clearVocabBtn) {
    clearVocabBtn.addEventListener("click", async () => {
      if (confirm("Are you sure you want to delete all saved vocabulary records? This cannot be undone.")) {
        const dbModel = new DatabaseModel();
        await dbModel.clearAllVocabulary();
        triggerSaveToast();
      }
    });
  }
});
