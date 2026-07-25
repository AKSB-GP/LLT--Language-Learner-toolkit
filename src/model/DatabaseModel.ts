import { VocabularyRecord, AudioCacheRecord } from "../interfaces";
export class DatabaseModel {
  private dbName = "LLT_Database";
  private version = 2;
  private db: IDBDatabase | null = null;

  /**
   * Opens connection to IndexedDB database with schema versioning and lifecycle handlers.
   */
  async open(): Promise<IDBDatabase> {
    //check if database is existing already
    if (this.db) return this.db;
    // request to open database otherwise
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);
      //onupgradeneeded for first time creation
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        const transaction = (event.target as IDBOpenDBRequest).transaction;

        //  create Audio Cache Object Store
        let audioStore: IDBObjectStore;
        if (!db.objectStoreNames.contains("audio_cache")) {
          audioStore = db.createObjectStore("audio_cache", { keyPath: "cacheKey" });
        } else {
          audioStore = transaction!.objectStore("audio_cache");
        }
        if (!audioStore.indexNames.contains("lastAccessed")) {
          audioStore.createIndex("lastAccessed", "lastAccessed", { unique: false });
        }

        //  create Vocabulary Object Store
        let vocabStore: IDBObjectStore;
        //if word is existing already, skip it 
        if (!db.objectStoreNames.contains("vocabulary")) {
          vocabStore = db.createObjectStore("vocabulary", {
            keyPath: "id",
            autoIncrement: true,
          });
          //create the word and the related tags
        } else {
          vocabStore = transaction!.objectStore("vocabulary");
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
        // Composite index for fast word+language deduplication
        if (!vocabStore.indexNames.contains("word_language")) {
          vocabStore.createIndex("word_language", ["word", "language"], { unique: false });
        }
      };
      //cache the result 
      request.onsuccess = () => {
        const db = request.result;
        this.db = db;

        // Graceful version change and connection loss handling
        db.onversionchange = () => {
          db.close();
          this.db = null;
        };

        resolve(db);
      };
      //handle blocked request§
      request.onblocked = () => {
        console.warn("IndexedDB open request blocked. Please close other open tabs using LLT.");
      };
      //handle error
      request.onerror = () => reject(request.error);
    });
  }

  /**
   * Closes active database connection.
   */
  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  // ─── Audio Cache ──────────────────────────────────────────────────────────

  /**
   * Retrieves cached audio buffer by cacheKey and asynchronously updates its lastAccessed timestamp.
   */
  async getCachedAudio(cacheKey: string): Promise<ArrayBuffer | null> {
    try {
      const db = await this.open();
      return new Promise((resolve) => {
        //request, store key
        const tx = db.transaction("audio_cache", "readwrite");
        const store = tx.objectStore("audio_cache");
        const req = store.get(cacheKey);

        req.onsuccess = () => {
          const record: AudioCacheRecord | undefined = req.result;
          if (record && record.audioBuffer) {
            // Update lastAccessed timestamp for LRU eviction
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
  async setCachedAudio(cacheKey: string, audioBuffer: ArrayBuffer): Promise<void> {
    try {
      const db = await this.open();
      const now = Date.now();
      const record: AudioCacheRecord = {
        cacheKey,
        audioBuffer,
        createdAt: now,
        lastAccessed: now,
      };

      return new Promise((resolve, reject) => {
        //in indexxeddb read/writes must be done in an transaction
        const tx = db.transaction("audio_cache", "readwrite");
        const store = tx.objectStore("audio_cache");
        store.put(record);

        tx.oncomplete = () => resolve();
        tx.onerror = async (e) => {
          const error = tx.error || (e.target as IDBRequest)?.error;
          //if space is full, removed old entries 
          if (error && error.name === "QuotaExceededError") {
            console.warn("QuotaExceededError encountered. Pruning audio cache...");
            await this.pruneAudioCache(50, 7 * 24 * 60 * 60 * 1000); // Aggressive prune
            try {
              await this.setCachedAudio(cacheKey, audioBuffer); // Retry after prune
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
  async pruneAudioCache(
    maxEntries: number = 200,
    maxAgeMs: number = 30 * 24 * 60 * 60 * 1000,
  ): Promise<number> {
    try {
      const db = await this.open();
      const now = Date.now();

      return new Promise((resolve) => {
        const tx = db.transaction("audio_cache", "readwrite");
        const store = tx.objectStore("audio_cache");
        const req = store.getAll();

        req.onsuccess = () => {
          const records: AudioCacheRecord[] = req.result || [];
          let deletedCount = 0;

          //  Delete records older than maxAgeMs
          const remaining: AudioCacheRecord[] = [];
          for (const rec of records) {
            const age = now - (rec.lastAccessed || rec.createdAt);
            if (age > maxAgeMs) {
              store.delete(rec.cacheKey);
              deletedCount++;
            } else {
              remaining.push(rec);
            }
          }

          //  If count exceeds maxEntries, delete least recently accessed
          if (remaining.length > maxEntries) {
            remaining.sort(
              (a, b) => (a.lastAccessed || a.createdAt) - (b.lastAccessed || b.createdAt),
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
  async clearAudioCache(): Promise<void> {
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
  async getVocabularyByWord(word: string, language: string): Promise<VocabularyRecord | null> {
    try {
      const db = await this.open();
      //open and do a request 
      return new Promise((resolve) => {
        const tx = db.transaction("vocabulary", "readonly");
        const store = tx.objectStore("vocabulary");
        const targetWord = word.toLowerCase().trim();
        //if index/word is found 
        if (store.indexNames.contains("word_language")) {
          const index = store.index("word_language");
          const req = index.get([targetWord, language]);
          req.onsuccess = () => resolve(req.result || null);
          req.onerror = () => resolve(null);
        } else {
          //
          const req = store.getAll();
          req.onsuccess = () => {
            const list: VocabularyRecord[] = req.result || [];
            const match = list.find(
              (r) => r.word.toLowerCase().trim() === targetWord && r.language === language,
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
  async saveVocabulary(
    record: Omit<VocabularyRecord, "id" | "createdAt">,
  ): Promise<VocabularyRecord | void> {
    try {
      //check if word/language is already in db 
      const existing = await this.getVocabularyByWord(record.word, record.language);
      const db = await this.open();

      return new Promise((resolve, reject) => {
        const tx = db.transaction("vocabulary", "readwrite");
        const store = tx.objectStore("vocabulary");
        const now = Date.now();

        let fullRecord: VocabularyRecord;
        //if existing record and update 
        if (existing && existing.id !== undefined) {
          fullRecord = {
            ...existing,
            ...record,
            updatedAt: now,
          };
          const req = store.put(fullRecord);
          req.onsuccess = () => resolve(fullRecord);
          req.onerror = () => reject(req.error);
        }
        //otherwise save a new record in db
        else {
          fullRecord = {
            ...record,
            createdAt: now,
          };
          const req = store.add(fullRecord);
          req.onsuccess = (e) => {
            fullRecord.id = (e.target as IDBRequest).result as number;
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
  async saveVocabularyBatch(
    records: Omit<VocabularyRecord, "id" | "createdAt">[],
  ): Promise<number> {
    try {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("vocabulary", "readwrite");
        const store = tx.objectStore("vocabulary");
        const now = Date.now();
        let inserted = 0;
        //iterate through records and add them to db
        for (const record of records) {
          const fullRecord: VocabularyRecord = {
            ...record,
            createdAt: now,
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
  async updateVocabulary(id: number, updates: Partial<VocabularyRecord>): Promise<boolean> {
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
          //update record 
          const updatedRecord: VocabularyRecord = {
            ...getReq.result,
            ...updates,
            updatedAt: Date.now(),
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
  async deleteVocabulary(id: number): Promise<boolean> {
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
  async deleteVocabularyBatch(ids: number[]): Promise<number> {
    try {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("vocabulary", "readwrite");
        const store = tx.objectStore("vocabulary");
        let deleted = 0;
        //delete records by id
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
  async getAllVocabulary(): Promise<VocabularyRecord[]> {
    try {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("vocabulary", "readonly");
        const store = tx.objectStore("vocabulary");
        const req = store.getAll();
        //sort all records by date descending
        req.onsuccess = () => {
          const list: VocabularyRecord[] = req.result || [];
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
  async getVocabularyPaginated(
    offset: number = 0,
    limit: number = 50,
    language?: string,
  ): Promise<{ items: VocabularyRecord[]; total: number }> {
    try {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction("vocabulary", "readonly");
        const store = tx.objectStore("vocabulary");
        const items: VocabularyRecord[] = [];
        let total = 0;
        let skipped = 0;

        const req = store.openCursor(null, "prev"); // Newest first

        req.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
          if (!cursor) {
            resolve({ items, total });
            return;
          }

          const record: VocabularyRecord = cursor.value;
          const matchesLang = !language || record.language === language;
          //if language matches 
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
  async clearAllVocabulary(): Promise<void> {
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
  async deleteDatabase(): Promise<boolean> {
    this.close();
    //request a database deletion and handle the result
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
}
