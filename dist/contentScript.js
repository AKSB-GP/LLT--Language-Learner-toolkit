"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/model/DatabaseModel.ts
  var DatabaseModel_exports = {};
  __export(DatabaseModel_exports, {
    DatabaseModel: () => DatabaseModel
  });
  var DatabaseModel;
  var init_DatabaseModel = __esm({
    "src/model/DatabaseModel.ts"() {
      "use strict";
      DatabaseModel = class {
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
    }
  });

  // src/const.ts
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

  // src/model/TTSModel.ts
  init_DatabaseModel();
  var TTSModel = class {
    session = null;
    voiceConfig = null;
    engineLoading = false;
    loadedVoiceFile = null;
    dbModel;
    constructor(dbModel) {
      this.dbModel = dbModel || new DatabaseModel();
    }
    /**
     * Generates a unique cache key based on voice model, speech settings, and input text.
     */
    async getCacheKey(text) {
      const settings = await new Promise((resolve) => {
        chrome.storage.sync.get(
          {
            piperVoiceFile: DEFAULT_SETTINGS.piperVoiceFile,
            piperVoice: DEFAULT_SETTINGS.piperVoice,
            piperSpeed: DEFAULT_SETTINGS.piperSpeed,
            piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
            piperNoiseW: DEFAULT_SETTINGS.piperNoiseW
          },
          (items) => resolve(items)
        );
      });
      const voice = settings.piperVoiceFile || settings.piperVoice || DEFAULT_SETTINGS.piperVoiceFile;
      const speed = parseFloat(
        String(settings.piperSpeed ?? DEFAULT_SETTINGS.piperSpeed)
      ).toFixed(2);
      const scale = parseFloat(
        String(settings.piperNoiseScale ?? DEFAULT_SETTINGS.piperNoiseScale)
      ).toFixed(2);
      const noiseW = parseFloat(
        String(settings.piperNoiseW ?? DEFAULT_SETTINGS.piperNoiseW)
      ).toFixed(2);
      const cleanText = text.trim().toLowerCase();
      return `${voice}_${speed}_${scale}_${noiseW}_${cleanText}`;
    }
    /**
     * Retrieves pre-synthesized audio buffer from IndexedDB cache if available.
     */
    async getCachedAudioForText(text) {
      try {
        const cacheKey = await this.getCacheKey(text);
        return await this.dbModel.getCachedAudio(cacheKey);
      } catch {
        return null;
      }
    }
    //load engine in background
    async loadEngine() {
      const settings = await new Promise(
        (resolve) => {
          chrome.storage.sync.get(
            {
              piperVoiceFile: DEFAULT_SETTINGS.piperVoiceFile
            },
            (items) => {
              resolve(items);
            }
          );
        }
      );
      const voiceFile = settings.piperVoiceFile || DEFAULT_SETTINGS.piperVoiceFile;
      if (this.session && this.voiceConfig && this.loadedVoiceFile === voiceFile)
        return;
      if (this.engineLoading) {
        while (this.engineLoading) {
          await new Promise((r) => setTimeout(r, 100));
        }
        if (this.session && this.loadedVoiceFile === voiceFile)
          return;
      }
      this.engineLoading = true;
      try {
        const configUrl = chrome.runtime.getURL(`models/${voiceFile}.onnx.json`);
        const configResponse = await fetch(configUrl);
        this.voiceConfig = await configResponse.json();
        const modelUrl = chrome.runtime.getURL(`models/${voiceFile}.onnx`);
        const modelResponse = await fetch(modelUrl);
        const modelBuffer = await modelResponse.arrayBuffer();
        ort.env.allowLocalModels = false;
        ort.env.wasm.simd = false;
        ort.env.wasm.numThreads = 1;
        ort.env.wasm.wasmPaths = chrome.runtime.getURL("lib/");
        this.session = await ort.InferenceSession.create(modelBuffer, {
          executionProviders: ["wasm"]
        });
        this.loadedVoiceFile = voiceFile;
      } catch (error) {
        console.error("Failed to load Piper TTS engine from local path:", error);
        throw error;
      } finally {
        this.engineLoading = false;
      }
    }
    // speech synthezize for piper tts with IndexedDB audio caching
    async synthesize(text) {
      const cacheKey = await this.getCacheKey(text);
      const cachedBuffer = await this.dbModel.getCachedAudio(cacheKey);
      if (cachedBuffer) {
        return cachedBuffer;
      }
      await this.loadEngine();
      const settings = await new Promise((resolve) => {
        chrome.storage.sync.get(
          {
            piperSpeed: DEFAULT_SETTINGS.piperSpeed,
            piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
            piperNoiseW: DEFAULT_SETTINGS.piperNoiseW
          },
          (items) => {
            resolve(items);
          }
        );
      });
      const voiceName = this.voiceConfig.espeak?.voice || "ru";
      const phonemeIds = await new Promise(
        async (resolve, reject) => {
          try {
            const phonemizer = await createPiperPhonemize({
              print: (l) => {
                try {
                  const parsed = JSON.parse(l);
                  if (parsed && parsed.phoneme_ids) {
                    resolve(parsed.phoneme_ids);
                  } else if (parsed && parsed[0] && parsed[0].phoneme_ids) {
                    resolve(parsed[0].phoneme_ids);
                  } else {
                    resolve(null);
                  }
                } catch (e) {
                  reject(e);
                }
              },
              printErr: (msg) => {
                console.warn("Phonemizer warning:", msg);
              },
              //fetch phonemaiztion files for piper
              locateFile: (file) => {
                if (file.endsWith(".wasm")) {
                  return chrome.runtime.getURL("lib/piper_phonemize.wasm");
                }
                if (file.endsWith(".data")) {
                  return chrome.runtime.getURL("lib/piper_phonemize.data");
                }
                return file;
              }
            });
            const inputJSON = JSON.stringify([{ text: text.trim() }]);
            phonemizer.callMain([
              "-l",
              voiceName,
              "--input",
              inputJSON,
              "--espeak_data",
              "/espeak-ng-data"
            ]);
          } catch (err) {
            reject(err);
          }
        }
      );
      if (!phonemeIds || phonemeIds.length === 0) {
        throw new Error("Could not extract phonemes from text.");
      }
      const baseLengthScale = this.voiceConfig.inference?.length_scale ?? 1;
      const speed = settings.piperSpeed ?? DEFAULT_SETTINGS.piperSpeed;
      const lengthScale = baseLengthScale / speed;
      const noiseScale = settings.piperNoiseScale ?? DEFAULT_SETTINGS.piperNoiseScale;
      const noiseW = settings.piperNoiseW ?? DEFAULT_SETTINGS.piperNoiseW;
      const feed = {
        input: new ort.Tensor(
          "int64",
          BigInt64Array.from(phonemeIds.map(BigInt)),
          [1, phonemeIds.length]
        ),
        input_lengths: new ort.Tensor(
          "int64",
          BigInt64Array.from([BigInt(phonemeIds.length)])
        ),
        scales: new ort.Tensor(
          "float32",
          Float32Array.from([noiseScale, lengthScale, noiseW])
        )
      };
      if (this.voiceConfig.speaker_id_map && Object.keys(this.voiceConfig.speaker_id_map).length > 0) {
        feed.sid = new ort.Tensor("int64", BigInt64Array.from([0n]));
      }
      const output = await this.session.run(feed);
      const rawAudio = output.output.data;
      const sampleRate = this.voiceConfig.audio?.sample_rate || 22050;
      const wavBuffer = this.buildWavHeader(rawAudio, 1, sampleRate);
      await this.dbModel.setCachedAudio(cacheKey, wavBuffer);
      return wavBuffer;
    }
    //build wav header
    buildWavHeader(samples, numChannels, sampleRate) {
      const numSamples = samples.length;
      const headerSize = 44;
      const buffer = new ArrayBuffer(numSamples * 2 + headerSize);
      const view = new DataView(buffer);
      view.setUint32(0, 1179011410, true);
      view.setUint32(4, buffer.byteLength - 8, true);
      view.setUint32(8, 1163280727, true);
      view.setUint32(12, 544501094, true);
      view.setUint32(16, 16, true);
      view.setUint16(20, 1, true);
      view.setUint16(22, numChannels, true);
      view.setUint32(24, sampleRate, true);
      view.setUint32(28, sampleRate * numChannels * 2, true);
      view.setUint16(32, numChannels * 2, true);
      view.setUint16(34, 16, true);
      view.setUint32(36, 1635017060, true);
      view.setUint32(40, numSamples * 2, true);
      let offset = headerSize;
      for (let i = 0; i < numSamples; i++) {
        const s = samples[i];
        const intSample = s >= 1 ? 32767 : s <= -1 ? -32768 : s * 32768 | 0;
        view.setInt16(offset, intSample, true);
        offset += 2;
      }
      return buffer;
    }
  };

  // src/view/NotificationView.ts
  var NotificationView = class {
    activeToast = null;
    activeToastType = null;
    lastSelectionRect = null;
    constructor() {
      this.setupSelectionTracker();
    }
    setupSelectionTracker() {
      const updateRect = () => {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            this.lastSelectionRect = {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height,
              scrollY: window.scrollY,
              scrollX: window.scrollX
            };
          }
        }
      };
      document.addEventListener("selectionchange", updateRect);
      document.addEventListener("mouseup", updateRect);
      document.addEventListener("contextmenu", updateRect);
    }
    /** Resolve the latest selection position, preferring live selection. */
    getSelectionPosition() {
      let top = 100, left = 100, width = 0, height = 0;
      let found = false;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const liveRect = range.getBoundingClientRect();
        if (liveRect.width > 0 && liveRect.height > 0) {
          top = liveRect.top + window.scrollY;
          left = liveRect.left + window.scrollX;
          width = liveRect.width;
          height = liveRect.height;
          found = true;
        }
      }
      if (!found && this.lastSelectionRect) {
        top = this.lastSelectionRect.top + this.lastSelectionRect.scrollY;
        left = this.lastSelectionRect.left + this.lastSelectionRect.scrollX;
        width = this.lastSelectionRect.width;
        height = this.lastSelectionRect.height;
        found = true;
      }
      return { top, left, width, height };
    }
    /** Position toast above selection (flips below if near top of screen). */
    positionToast(toast, toastWidth, toastHeight, pos) {
      const { top, left, width, height } = pos;
      let toastTop = top - toastHeight - 8;
      let toastLeft = left + width / 2 - toastWidth / 2;
      if (toastTop < window.scrollY + 4) {
        toastTop = top + height + 8;
      }
      toastLeft = Math.max(window.scrollX + 8, toastLeft);
      const maxLeft = window.scrollX + window.innerWidth - toastWidth - 8;
      if (toastLeft > maxLeft)
        toastLeft = maxLeft;
      toast.style.top = `${toastTop}px`;
      toast.style.left = `${toastLeft}px`;
    }
    // ─── Status / Audio Progress Toast ───────────────────────────────────────
    show(type, message, duration = null) {
      if (this.activeToast && this.activeToast.parentNode && this.activeToastType) {
        this.activeToast.className = `tts-toast tts-toast-${type} tts-toast-visible`;
        this.activeToastType = type;
        const textElem = this.activeToast.querySelector(".tts-toast-text");
        if (textElem)
          textElem.textContent = message;
        if (duration) {
          setTimeout(() => this.dismiss(this.activeToast), duration);
        }
        return;
      }
      if (this.activeToast) {
        this.activeToast.remove();
      }
      const toast = document.createElement("div");
      toast.className = `tts-toast tts-toast-${type}`;
      toast.style.position = "absolute";
      const body = document.createElement("div");
      body.className = "tts-toast-body";
      const text = document.createElement("span");
      text.className = "tts-toast-text";
      text.textContent = message;
      body.appendChild(text);
      toast.appendChild(body);
      document.body.appendChild(toast);
      this.activeToast = toast;
      this.activeToastType = type;
      const pos = this.getSelectionPosition();
      const toastWidth = toast.offsetWidth || 180;
      const toastHeight = toast.offsetHeight || 36;
      this.positionToast(toast, toastWidth, toastHeight, pos);
      requestAnimationFrame(() => {
        toast.classList.add("tts-toast-visible");
      });
      if (duration) {
        setTimeout(() => {
          this.dismiss(toast);
        }, duration);
      }
    }
    dismiss(toast = null) {
      const target = toast || this.activeToast;
      if (target) {
        target.classList.remove("tts-toast-visible");
        target.classList.add("tts-toast-fadeout");
        setTimeout(() => {
          target.remove();
          if (this.activeToast === target) {
            this.activeToast = null;
            this.activeToastType = null;
          }
        }, 300);
      }
    }
    // ─── Language Picker Toast ────────────────────────────────────────────────
    promptLanguage(word) {
      return new Promise((resolve) => {
        const pos = this.getSelectionPosition();
        const toast = document.createElement("div");
        toast.className = "tts-selection-toast";
        toast.style.position = "absolute";
        const content = document.createElement("div");
        content.className = "tts-sel-toast-content";
        const label = document.createElement("span");
        label.className = "tts-sel-toast-label";
        label.textContent = "LANG:";
        content.appendChild(label);
        const btnSwedish = document.createElement("button");
        btnSwedish.className = "tts-sel-toast-btn tts-btn-sv";
        btnSwedish.textContent = "SWEDISH";
        btnSwedish.addEventListener("click", (e) => {
          e.stopPropagation();
          cleanup("SWEDISH");
        });
        content.appendChild(btnSwedish);
        const btnEnglish = document.createElement("button");
        btnEnglish.className = "tts-sel-toast-btn tts-btn-en";
        btnEnglish.textContent = "ENGLISH";
        btnEnglish.addEventListener("click", (e) => {
          e.stopPropagation();
          cleanup("ENGLISH");
        });
        content.appendChild(btnEnglish);
        const btnClose = document.createElement("button");
        btnClose.className = "tts-sel-toast-close";
        btnClose.innerHTML = "&times;";
        btnClose.addEventListener("click", (e) => {
          e.stopPropagation();
          cleanup(null);
        });
        content.appendChild(btnClose);
        toast.appendChild(content);
        document.body.appendChild(toast);
        const toastWidth = toast.offsetWidth || 210;
        const toastHeight = toast.offsetHeight || 36;
        this.positionToast(toast, toastWidth, toastHeight, pos);
        requestAnimationFrame(() => {
          toast.classList.add("tts-sel-toast-visible");
        });
        const clickOutsideHandler = (e) => {
          if (!toast.contains(e.target)) {
            cleanup(null);
          }
        };
        document.addEventListener("mousedown", clickOutsideHandler);
        const cleanup = (choice) => {
          document.removeEventListener("mousedown", clickOutsideHandler);
          toast.classList.remove("tts-sel-toast-visible");
          setTimeout(() => {
            toast.remove();
            resolve(choice);
          }, 150);
        };
      });
    }
    // ─── Definition Card Toast ────────────────────────────────────────────────
    showDefinitionToast(word, definition, pageUrl, language) {
      const pos = this.getSelectionPosition();
      const toast = document.createElement("div");
      toast.className = "tts-selection-toast";
      toast.style.position = "absolute";
      toast.style.maxWidth = "360px";
      const content = document.createElement("div");
      content.className = "tts-sel-toast-content";
      content.style.flexDirection = "column";
      content.style.alignItems = "flex-start";
      content.style.gap = "6px";
      content.style.padding = "10px 14px";
      const headerRow = document.createElement("div");
      headerRow.style.cssText = "display:flex;align-items:baseline;justify-content:space-between;width:100%";
      const titleContainer = document.createElement("div");
      titleContainer.style.cssText = "display:flex;align-items:baseline;gap:6px";
      const prefixElem = document.createElement("span");
      prefixElem.textContent = "/";
      prefixElem.style.cssText = "font-size:13px;font-weight:400;color:#999999";
      titleContainer.appendChild(prefixElem);
      const wordElem = document.createElement("strong");
      wordElem.textContent = word;
      wordElem.style.cssText = "font-size:14px;font-weight:700;letter-spacing:-0.02em;color:#111111";
      titleContainer.appendChild(wordElem);
      if (language) {
        const langBadge = document.createElement("span");
        langBadge.className = "tts-sel-toast-label";
        langBadge.textContent = `/ ${language}`;
        titleContainer.appendChild(langBadge);
      }
      headerRow.appendChild(titleContainer);
      const btnClose = document.createElement("button");
      btnClose.className = "tts-sel-toast-close";
      btnClose.textContent = "\xD7";
      btnClose.addEventListener("click", (e) => {
        e.stopPropagation();
        cleanup();
      });
      headerRow.appendChild(btnClose);
      content.appendChild(headerRow);
      const divider = document.createElement("div");
      divider.style.cssText = "width:100%;height:1px;background:#111111;margin:2px 0";
      content.appendChild(divider);
      const defElem = document.createElement("div");
      defElem.style.cssText = "font-size:12px;line-height:1.45;color:#111111;max-height:140px;overflow-y:auto;white-space:pre-wrap;width:100%";
      defElem.textContent = Array.isArray(definition) ? definition.join("\n") : definition;
      content.appendChild(defElem);
      const actionRow = document.createElement("div");
      actionRow.style.cssText = "display:flex;align-items:center;justify-content:space-between;width:100%;margin-top:6px;gap:8px";
      if (pageUrl) {
        const linkElem = document.createElement("a");
        linkElem.href = pageUrl;
        linkElem.target = "_blank";
        linkElem.rel = "noopener noreferrer";
        linkElem.textContent = "READ ON WIKTIONARY \u2197";
        linkElem.style.cssText = "color:#111111;font-size:11px;font-weight:600;text-decoration:underline;text-underline-offset:2px;cursor:pointer";
        linkElem.addEventListener(
          "mouseover",
          () => linkElem.style.color = "#555555"
        );
        linkElem.addEventListener(
          "mouseout",
          () => linkElem.style.color = "#111111"
        );
        actionRow.appendChild(linkElem);
      }
      const saveBtn = document.createElement("button");
      saveBtn.textContent = "SAVE TO VOCABULARY +";
      saveBtn.className = "tts-sel-toast-btn tts-btn-sv";
      saveBtn.style.cssText = "font-size:10px;padding:3px 8px;margin-left:auto;cursor:pointer";
      saveBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const { DatabaseModel: DatabaseModel2 } = await Promise.resolve().then(() => (init_DatabaseModel(), DatabaseModel_exports));
        const dbModel = new DatabaseModel2();
        await dbModel.saveVocabulary({
          word,
          language: language || "unknown",
          definition: Array.isArray(definition) ? definition.join("\n") : definition,
          pageUrl: pageUrl || ""
        });
        saveBtn.textContent = "\u2713 SAVED";
        saveBtn.style.background = "#28a745";
      });
      actionRow.appendChild(saveBtn);
      content.appendChild(actionRow);
      toast.appendChild(content);
      document.body.appendChild(toast);
      const toastWidth = toast.offsetWidth || 300;
      const toastHeight = toast.offsetHeight || 90;
      this.positionToast(toast, toastWidth, toastHeight, pos);
      requestAnimationFrame(() => {
        toast.classList.add("tts-sel-toast-visible");
      });
      const clickOutsideHandler = (e) => {
        if (!toast.contains(e.target)) {
          cleanup();
        }
      };
      setTimeout(() => {
        document.addEventListener("mousedown", clickOutsideHandler);
      }, 100);
      const cleanup = () => {
        document.removeEventListener("mousedown", clickOutsideHandler);
        toast.classList.remove("tts-sel-toast-visible");
        setTimeout(() => {
          toast.remove();
        }, 200);
      };
    }
  };

  // src/controller/TTSController.ts
  var TTSController = class {
    model;
    notificationView;
    constructor(model, notificationView) {
      this.model = model;
      this.notificationView = notificationView;
    }
    // Pre-warm the model engine in background asynchronously
    async init() {
      this.model.loadEngine().catch((err) => console.warn("TTS Pre-warming failed:", err));
      this.setupListeners();
    }
    setupListeners() {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.action === "speakSelection" && message.text) {
          this.speak(message.text);
        } else if (message.action === "promptLanguageSelection" && message.word) {
          this.notificationView.promptLanguage(message.word).then((choice) => {
            sendResponse({ language: choice });
          });
          return true;
        } else if (message.action === "showDefinition" && message.word && message.definition) {
          this.notificationView.showDefinitionToast(
            message.word,
            message.definition,
            message.pageUrl,
            message.language
          );
        } else if (message.action === "showNotification" && message.text) {
          this.notificationView.show(
            message.toastType || "playing",
            message.text,
            message.duration || 4e3
          );
        }
      });
    }
    async speak(text) {
      try {
        const cachedBuffer = await this.model.getCachedAudioForText(text);
        let wavBuffer;
        if (cachedBuffer) {
          this.notificationView.show("PLAYING", `PLAYING SPEECH FOR "${text}"...`);
          wavBuffer = cachedBuffer;
        } else {
          const settings = await new Promise((resolve) => {
            chrome.storage.sync.get(
              { piperVoice: DEFAULT_SETTINGS.piperVoice },
              (items) => {
                resolve(items);
              }
            );
          });
          const voice = settings.piperVoice || DEFAULT_SETTINGS.piperVoice;
          const voiceName = voice.charAt(0).toUpperCase() + voice.slice(1);
          if (!this.model.session) {
            this.notificationView.show(
              "LOADING",
              `LOADING VOICE MODEL (${voiceName})...`
            );
          } else {
            this.notificationView.show("SYNTHESIZING", `SYNTHESIZING "${text}"...`);
          }
          await this.model.loadEngine();
          this.notificationView.show("SYNTHESIZING", `SYNTHESIZING "${text}"...`);
          wavBuffer = await this.model.synthesize(text);
          this.notificationView.show("PLAYING", `PLAYING SPEECH FOR "${text}"...`);
        }
        const blob = new Blob([wavBuffer], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.addEventListener("ended", () => {
          this.notificationView.dismiss();
        });
        await audio.play();
      } catch (error) {
        console.error("SPEECH SYNTHESIS FAILED:", error);
        this.notificationView.show(
          "ERROR",
          `SYNTHESIS FAILED: ${error.message || error}`,
          3e3
        );
      }
    }
  };

  // src/contentScript.ts
  var startApplication = () => {
    const model = new TTSModel();
    const notificationView = new NotificationView();
    const controller = new TTSController(model, notificationView);
    controller.init();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startApplication);
  } else {
    startApplication();
  }
})();
//# sourceMappingURL=contentScript.js.map
