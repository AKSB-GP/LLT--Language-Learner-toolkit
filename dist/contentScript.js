"use strict";
(() => {
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
  var TTSModel = class {
    session = null;
    voiceConfig = null;
    engineLoading = false;
    loadedVoiceFile = null;
    constructor() {
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
    // speech synthezize for piper tts
    async synthesize(text) {
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
      return this.buildWavHeader(rawAudio, 1, sampleRate);
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
      if (pageUrl) {
        const linkElem = document.createElement("a");
        linkElem.href = pageUrl;
        linkElem.target = "_blank";
        linkElem.rel = "noopener noreferrer";
        linkElem.textContent = "READ ON WIKTIONARY \u2197";
        linkElem.style.cssText = "color:#111111;font-size:11px;font-weight:600;margin-top:4px;text-decoration:underline;text-underline-offset:2px";
        linkElem.addEventListener(
          "mouseover",
          () => linkElem.style.color = "#555555"
        );
        linkElem.addEventListener(
          "mouseout",
          () => linkElem.style.color = "#111111"
        );
        content.appendChild(linkElem);
      }
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
        const wavBuffer = await this.model.synthesize(text);
        this.notificationView.show("PLAYING", `PLAYING SPEECH FOR "${text}"...`);
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
