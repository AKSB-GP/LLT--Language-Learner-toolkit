"use strict";
(() => {
  // src/const.ts
  var VOICES_MAP = {
    russian: [
      { id: "irina", name: "Irina (Medium, Smooth)", file: "ru_RU-irina-medium" },
      {
        id: "denis",
        name: "Denis (Medium, Energetic)",
        file: "ru_RU-denis-medium"
      },
      {
        id: "dmitri",
        name: "Dmitri (Medium, Natural)",
        file: "ru_RU-dmitri-medium"
      },
      {
        id: "ruslan",
        name: "Ruslan (Medium, Warm)",
        file: "ru_RU-ruslan-medium"
      }
    ],
    english: [
      { id: "alan", name: "Alan (Medium, GB)", file: "en_GB-alan-medium" },
      { id: "alba", name: "Alba (Medium, GB)", file: "en_GB-alba-medium" },
      { id: "bryce", name: "Bryce (Medium, US)", file: "en_US-bryce-medium" },
      {
        id: "hfc_female",
        name: "HFC Female (Medium, US)",
        file: "en_US-hfc_female-medium"
      },
      {
        id: "hfc_male",
        name: "HFC Male (Medium, US)",
        file: "en_US-hfc_male-medium"
      }
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
    googleRate: 1,
    lookupMethod: "manual"
  };

  // src/model/DatabaseModel.ts
  var DatabaseModel = class {
    dbName = "LLT_Database";
    version = 2;
    db = null;
    /**
     * Opens connection to IndexedDB database with schema versioning and lifecycle handlers.
     */
    async open() {
      if (this.db)
        return this.db;
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, this.version);
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          const transaction = event.target.transaction;
          let audioStore;
          if (!db.objectStoreNames.contains("audio_cache")) {
            audioStore = db.createObjectStore("audio_cache", { keyPath: "cacheKey" });
          } else {
            audioStore = transaction.objectStore("audio_cache");
          }
          if (!audioStore.indexNames.contains("lastAccessed")) {
            audioStore.createIndex("lastAccessed", "lastAccessed", { unique: false });
          }
          let vocabStore;
          if (!db.objectStoreNames.contains("vocabulary")) {
            vocabStore = db.createObjectStore("vocabulary", {
              keyPath: "id",
              autoIncrement: true
            });
          } else {
            vocabStore = transaction.objectStore("vocabulary");
          }
          if (!vocabStore.indexNames.contains("word")) {
            vocabStore.createIndex("word", "word", { unique: false });
          }
          if (!vocabStore.indexNames.contains("language")) {
            vocabStore.createIndex("language", "language", { unique: false });
          }
          if (!vocabStore.indexNames.contains("createdAt")) {
            vocabStore.createIndex("createdAt", "createdAt", { unique: false });
          }
          if (!vocabStore.indexNames.contains("word_language")) {
            vocabStore.createIndex("word_language", ["word", "language"], { unique: false });
          }
        };
        request.onsuccess = () => {
          const db = request.result;
          this.db = db;
          db.onversionchange = () => {
            db.close();
            this.db = null;
          };
          resolve(db);
        };
        request.onblocked = () => {
          console.warn("IndexedDB open request blocked. Please close other open tabs using LLT.");
        };
        request.onerror = () => reject(request.error);
      });
    }
    /**
     * Closes active database connection.
     */
    close() {
      if (this.db) {
        this.db.close();
        this.db = null;
      }
    }
    // ─── Audio Cache ──────────────────────────────────────────────────────────
    /**
     * Retrieves cached audio buffer by cacheKey and asynchronously updates its lastAccessed timestamp.
     */
    async getCachedAudio(cacheKey) {
      try {
        const db = await this.open();
        return new Promise((resolve) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const store = tx.objectStore("audio_cache");
          const req = store.get(cacheKey);
          req.onsuccess = () => {
            const record = req.result;
            if (record && record.audioBuffer) {
              record.lastAccessed = Date.now();
              store.put(record);
              resolve(record.audioBuffer);
            } else {
              resolve(null);
            }
          };
          req.onerror = () => resolve(null);
        });
      } catch {
        return null;
      }
    }
    /**
     * Stores TTS audio buffer in cache with QuotaExceeded auto-pruning fallback.
     */
    async setCachedAudio(cacheKey, audioBuffer) {
      try {
        const db = await this.open();
        const now = Date.now();
        const record = {
          cacheKey,
          audioBuffer,
          createdAt: now,
          lastAccessed: now
        };
        return new Promise((resolve, reject) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const store = tx.objectStore("audio_cache");
          store.put(record);
          tx.oncomplete = () => resolve();
          tx.onerror = async (e) => {
            const error = tx.error || e.target?.error;
            if (error && error.name === "QuotaExceededError") {
              console.warn("QuotaExceededError encountered. Pruning audio cache...");
              await this.pruneAudioCache(50, 7 * 24 * 60 * 60 * 1e3);
              try {
                await this.setCachedAudio(cacheKey, audioBuffer);
                resolve();
                return;
              } catch (retryErr) {
                reject(retryErr);
                return;
              }
            }
            reject(error);
          };
        });
      } catch (err) {
        console.warn("Failed to cache audio in IndexedDB:", err);
      }
    }
    /**
     * Prunes old or excessive audio cache entries.
     */
    async pruneAudioCache(maxEntries = 200, maxAgeMs = 30 * 24 * 60 * 60 * 1e3) {
      try {
        const db = await this.open();
        const now = Date.now();
        return new Promise((resolve) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const store = tx.objectStore("audio_cache");
          const req = store.getAll();
          req.onsuccess = () => {
            const records = req.result || [];
            let deletedCount = 0;
            const remaining = [];
            for (const rec of records) {
              const age = now - (rec.lastAccessed || rec.createdAt);
              if (age > maxAgeMs) {
                store.delete(rec.cacheKey);
                deletedCount++;
              } else {
                remaining.push(rec);
              }
            }
            if (remaining.length > maxEntries) {
              remaining.sort(
                (a, b) => (a.lastAccessed || a.createdAt) - (b.lastAccessed || b.createdAt)
              );
              const toRemove = remaining.slice(0, remaining.length - maxEntries);
              for (const rec of toRemove) {
                store.delete(rec.cacheKey);
                deletedCount++;
              }
            }
            resolve(deletedCount);
          };
          req.onerror = () => resolve(0);
        });
      } catch {
        return 0;
      }
    }
    /**
     * Clears all items in the audio_cache store.
     */
    async clearAudioCache() {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("audio_cache", "readwrite");
          const req = tx.objectStore("audio_cache").clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch (err) {
        console.warn("Failed to clear audio cache:", err);
      }
    }
    // ─── Vocabulary History & Management ─────────────────────────────────────
    /**
     * Looks up a vocabulary record by word and language to prevent duplicates.
     */
    async getVocabularyByWord(word, language) {
      try {
        const db = await this.open();
        return new Promise((resolve) => {
          const tx = db.transaction("vocabulary", "readonly");
          const store = tx.objectStore("vocabulary");
          const targetWord = word.toLowerCase().trim();
          if (store.indexNames.contains("word_language")) {
            const index = store.index("word_language");
            const req = index.get([targetWord, language]);
            req.onsuccess = () => resolve(req.result || null);
            req.onerror = () => resolve(null);
          } else {
            const req = store.getAll();
            req.onsuccess = () => {
              const list = req.result || [];
              const match = list.find(
                (r) => r.word.toLowerCase().trim() === targetWord && r.language === language
              );
              resolve(match || null);
            };
            req.onerror = () => resolve(null);
          }
        });
      } catch {
        return null;
      }
    }
    /**
     * Saves a vocabulary record with deduplication. Updates existing record if word+language exists.
     */
    async saveVocabulary(record) {
      try {
        const existing = await this.getVocabularyByWord(record.word, record.language);
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          const now = Date.now();
          let fullRecord;
          if (existing && existing.id !== void 0) {
            fullRecord = {
              ...existing,
              ...record,
              updatedAt: now
            };
            const req = store.put(fullRecord);
            req.onsuccess = () => resolve(fullRecord);
            req.onerror = () => reject(req.error);
          } else {
            fullRecord = {
              ...record,
              createdAt: now
            };
            const req = store.add(fullRecord);
            req.onsuccess = (e) => {
              fullRecord.id = e.target.result;
              resolve(fullRecord);
            };
            req.onerror = () => reject(req.error);
          }
        });
      } catch (err) {
        console.warn("Failed to save vocabulary in IndexedDB:", err);
      }
    }
    /**
     * Batch inserts multiple vocabulary records efficiently in a single transaction.
     */
    async saveVocabularyBatch(records) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          const now = Date.now();
          let inserted = 0;
          for (const record of records) {
            const fullRecord = {
              ...record,
              createdAt: now
            };
            store.add(fullRecord);
            inserted++;
          }
          tx.oncomplete = () => resolve(inserted);
          tx.onerror = () => reject(tx.error);
        });
      } catch (err) {
        console.warn("Batch save vocabulary failed:", err);
        return 0;
      }
    }
    /**
     * Updates fields of an existing vocabulary record by ID.
     */
    async updateVocabulary(id, updates) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          const getReq = store.get(id);
          getReq.onsuccess = () => {
            if (!getReq.result) {
              resolve(false);
              return;
            }
            const updatedRecord = {
              ...getReq.result,
              ...updates,
              updatedAt: Date.now()
            };
            const putReq = store.put(updatedRecord);
            putReq.onsuccess = () => resolve(true);
            putReq.onerror = () => reject(putReq.error);
          };
          getReq.onerror = () => reject(getReq.error);
        });
      } catch {
        return false;
      }
    }
    /**
     * Deletes a single vocabulary record by ID.
     */
    async deleteVocabulary(id) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const req = tx.objectStore("vocabulary").delete(id);
          req.onsuccess = () => resolve(true);
          req.onerror = () => reject(req.error);
        });
      } catch {
        return false;
      }
    }
    /**
     * Deletes multiple vocabulary records by IDs in a single transaction.
     */
    async deleteVocabularyBatch(ids) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const store = tx.objectStore("vocabulary");
          let deleted = 0;
          for (const id of ids) {
            store.delete(id);
            deleted++;
          }
          tx.oncomplete = () => resolve(deleted);
          tx.onerror = () => reject(tx.error);
        });
      } catch {
        return 0;
      }
    }
    /**
     * Retrieves all vocabulary records sorted by createdAt descending.
     */
    async getAllVocabulary() {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readonly");
          const store = tx.objectStore("vocabulary");
          const req = store.getAll();
          req.onsuccess = () => {
            const list = req.result || [];
            list.sort((a, b) => b.createdAt - a.createdAt);
            resolve(list);
          };
          req.onerror = () => reject(req.error);
        });
      } catch {
        return [];
      }
    }
    /**
     * Fetches vocabulary records with cursor-based pagination and optional language filter.
     */
    async getVocabularyPaginated(offset = 0, limit = 50, language) {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readonly");
          const store = tx.objectStore("vocabulary");
          const items = [];
          let total = 0;
          let skipped = 0;
          const req = store.openCursor(null, "prev");
          req.onsuccess = (e) => {
            const cursor = e.target.result;
            if (!cursor) {
              resolve({ items, total });
              return;
            }
            const record = cursor.value;
            const matchesLang = !language || record.language === language;
            if (matchesLang) {
              total++;
              if (skipped < offset) {
                skipped++;
              } else if (items.length < limit) {
                items.push(record);
              }
            }
            cursor.continue();
          };
          req.onerror = () => reject(req.error);
        });
      } catch {
        return { items: [], total: 0 };
      }
    }
    /**
     * Clears all items in the vocabulary store.
     */
    async clearAllVocabulary() {
      try {
        const db = await this.open();
        return new Promise((resolve, reject) => {
          const tx = db.transaction("vocabulary", "readwrite");
          const req = tx.objectStore("vocabulary").clear();
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch (err) {
        console.warn("Failed to clear vocabulary:", err);
      }
    }
    /**
     * Deletes the entire IndexedDB database safely, closing active connections first.
     */
    async deleteDatabase() {
      this.close();
      return new Promise((resolve) => {
        const req = indexedDB.deleteDatabase(this.dbName);
        req.onsuccess = () => resolve(true);
        req.onerror = () => resolve(false);
        req.onblocked = () => {
          console.warn("Database deletion blocked by open connection.");
          resolve(false);
        };
      });
    }
  };

  // src/popup.ts
  document.addEventListener("DOMContentLoaded", () => {
    const languageCategory = document.getElementById(
      "language-category"
    );
    const piperVoice = document.getElementById(
      "piper-voice"
    );
    const piperSpeed = document.getElementById("piper-speed");
    const piperNoiseScale = document.getElementById(
      "piper-noise-scale"
    );
    const piperNoiseW = document.getElementById(
      "piper-noise-w"
    );
    const googleLanguage = document.getElementById(
      "google-language"
    );
    const googleRate = document.getElementById("google-rate");
    const lookupMethod = document.getElementById(
      "lookup-method"
    );
    const toastStatus = document.getElementById("status");
    const piperSpeedVal = document.getElementById(
      "piper-speed-val"
    );
    const piperNoiseScaleVal = document.getElementById(
      "piper-noise-scale-val"
    );
    const piperNoiseWVal = document.getElementById(
      "piper-noise-w-val"
    );
    const googleRateVal = document.getElementById(
      "google-rate-val"
    );
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
        chrome.storage.sync.set(
          {
            piperLanguageCategory: category,
            piperVoice: matchedVoice.id,
            piperVoiceFile: matchedVoice.file
          },
          () => {
            triggerSaveToast();
            notifyContentScript();
          }
        );
      }
    };
    chrome.storage.sync.get(
      {
        piperLanguageCategory: DEFAULT_SETTINGS.piperLanguageCategory,
        piperVoice: DEFAULT_SETTINGS.piperVoice,
        piperSpeed: DEFAULT_SETTINGS.piperSpeed,
        piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
        piperNoiseW: DEFAULT_SETTINGS.piperNoiseW,
        googleLanguage: DEFAULT_SETTINGS.googleLanguage,
        googleRate: DEFAULT_SETTINGS.googleRate,
        lookupMethod: DEFAULT_SETTINGS.lookupMethod
      },
      (items) => {
        languageCategory.value = items.piperLanguageCategory;
        populateVoices(items.piperLanguageCategory, items.piperVoice);
        lookupMethod.value = items.lookupMethod || DEFAULT_SETTINGS.lookupMethod;
        piperSpeed.value = items.piperSpeed.toString();
        piperNoiseScale.value = items.piperNoiseScale.toString();
        piperNoiseW.value = items.piperNoiseW.toString();
        googleLanguage.value = items.googleLanguage;
        googleRate.value = items.googleRate.toString();
        piperSpeedVal.textContent = `${parseFloat(items.piperSpeed).toFixed(1)}x`;
        piperNoiseScaleVal.textContent = parseFloat(
          items.piperNoiseScale
        ).toFixed(2);
        piperNoiseWVal.textContent = parseFloat(items.piperNoiseW).toFixed(2);
        googleRateVal.textContent = `${parseFloat(items.googleRate).toFixed(1)}x`;
      }
    );
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
      chrome.storage.sync.set(
        { googleLanguage: googleLanguage.value },
        triggerSaveToast
      );
    });
    googleRate.addEventListener("input", (e) => {
      const target = e.target;
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
      "export-csv-btn"
    );
    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", async () => {
        const dbModel = new DatabaseModel();
        const records = await dbModel.getAllVocabulary();
        if (!records || records.length === 0) {
          alert("No vocabulary words saved yet.");
          return;
        }
        const seen = /* @__PURE__ */ new Set();
        const uniqueRecords = [];
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
        const headers = [
          "Word",
          "Language",
          "Definition",
          "Wiktionary URL",
          "Date Saved"
        ];
        const rows = uniqueRecords.map((r) => [
          `"${r.word.replace(/"/g, '""')}"`,
          `"${r.language}"`,
          `"${r.definition.replace(/"/g, '""')}"`,
          `"${r.pageUrl || ""}"`,
          `"${new Date(r.createdAt).toISOString().split("T")[0]}"`
        ]);
        const csvContent = [
          headers.join(","),
          ...rows.map((row) => row.join(","))
        ].join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `LLT_Vocabulary_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }
    const clearAudioCacheBtn = document.getElementById(
      "clear-audio-cache-btn"
    );
    if (clearAudioCacheBtn) {
      clearAudioCacheBtn.addEventListener("click", async () => {
        if (confirm("Are you sure you want to clear the cached audio recordings?")) {
          const dbModel = new DatabaseModel();
          await dbModel.clearAudioCache();
          triggerSaveToast();
        }
      });
    }
    const clearVocabBtn = document.getElementById(
      "clear-vocab-btn"
    );
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
})();
//# sourceMappingURL=popup.js.map
