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
    async loadEngine() {
      const settings = await new Promise((resolve) => {
        chrome.storage.sync.get({
          piperVoiceFile: DEFAULT_SETTINGS.piperVoiceFile
        }, (items) => {
          resolve(items);
        });
      });
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
        ort.env.wasm.numThreads = 1;
        ort.env.wasm.wasmPaths = {
          "ort-wasm.wasm": chrome.runtime.getURL("lib/ort-wasm.wasm"),
          "ort-wasm-simd.wasm": chrome.runtime.getURL("lib/ort-wasm-simd.wasm"),
          "ort-wasm-threaded.wasm": chrome.runtime.getURL("lib/ort-wasm.wasm"),
          "ort-wasm-simd-threaded.wasm": chrome.runtime.getURL("lib/ort-wasm.wasm")
        };
        this.session = await ort.InferenceSession.create(modelBuffer, { executionProviders: ["wasm"] });
        this.loadedVoiceFile = voiceFile;
      } catch (error) {
        console.error("Failed to load Piper TTS engine from local path:", error);
        throw error;
      } finally {
        this.engineLoading = false;
      }
    }
    async synthesize(text) {
      await this.loadEngine();
      const settings = await new Promise((resolve) => {
        chrome.storage.sync.get({
          piperSpeed: DEFAULT_SETTINGS.piperSpeed,
          piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
          piperNoiseW: DEFAULT_SETTINGS.piperNoiseW
        }, (items) => {
          resolve(items);
        });
      });
      const voiceName = this.voiceConfig.espeak?.voice || "ru";
      const phonemeIds = await new Promise(async (resolve, reject) => {
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
      });
      if (!phonemeIds || phonemeIds.length === 0) {
        throw new Error("Could not extract phonemes from text.");
      }
      const baseLengthScale = this.voiceConfig.inference?.length_scale ?? 1;
      const speed = settings.piperSpeed ?? DEFAULT_SETTINGS.piperSpeed;
      const lengthScale = baseLengthScale / speed;
      const noiseScale = settings.piperNoiseScale ?? DEFAULT_SETTINGS.piperNoiseScale;
      const noiseW = settings.piperNoiseW ?? DEFAULT_SETTINGS.piperNoiseW;
      const feed = {
        input: new ort.Tensor("int64", BigInt64Array.from(phonemeIds.map(BigInt)), [1, phonemeIds.length]),
        input_lengths: new ort.Tensor("int64", BigInt64Array.from([BigInt(phonemeIds.length)])),
        scales: new ort.Tensor("float32", Float32Array.from([noiseScale, lengthScale, noiseW]))
      };
      if (this.voiceConfig.speaker_id_map && Object.keys(this.voiceConfig.speaker_id_map).length > 0) {
        feed.sid = new ort.Tensor("int64", BigInt64Array.from([0n]));
      }
      const output = await this.session.run(feed);
      const rawAudio = output.output.data;
      const sampleRate = this.voiceConfig.audio?.sample_rate || 22050;
      return this.buildWavHeader(rawAudio, 1, sampleRate);
    }
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
    container = null;
    activeToast = null;
    lastSelectionRect = null;
    constructor() {
      this.createContainer();
      this.setupSelectionTracker();
    }
    createContainer() {
      this.container = document.createElement("div");
      this.container.id = "tts-notifications-container";
      document.body.appendChild(this.container);
    }
    setupSelectionTracker() {
      document.addEventListener("selectionchange", () => {
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
      });
    }
    show(type, message, duration = null) {
      if (this.activeToast) {
        this.activeToast.remove();
      }
      const toast = document.createElement("div");
      toast.className = `tts-toast tts-toast-${type}`;
      const textContainer = document.createElement("div");
      textContainer.className = "tts-toast-text";
      textContainer.textContent = message;
      toast.appendChild(textContainer);
      if (this.container) {
        this.container.appendChild(toast);
      }
      this.activeToast = toast;
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
          }
        }, 300);
      }
    }
    promptLanguage(word) {
      return new Promise((resolve) => {
        let top = 100;
        let left = 100;
        let height = 0;
        let width = 0;
        let rect = this.lastSelectionRect;
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const liveRect = range.getBoundingClientRect();
          if (liveRect.width > 0 && liveRect.height > 0) {
            rect = {
              top: liveRect.top,
              left: liveRect.left,
              width: liveRect.width,
              height: liveRect.height,
              scrollY: window.scrollY,
              scrollX: window.scrollX
            };
          }
        }
        if (rect) {
          top = rect.top + rect.scrollY;
          left = rect.left + rect.scrollX;
          width = rect.width;
          height = rect.height;
        }
        const toast = document.createElement("div");
        toast.className = "tts-selection-toast";
        toast.style.position = "absolute";
        const content = document.createElement("div");
        content.className = "tts-sel-toast-content";
        const label = document.createElement("span");
        label.className = "tts-sel-toast-label";
        label.textContent = "Lang:";
        content.appendChild(label);
        const btnSwedish = document.createElement("button");
        btnSwedish.className = "tts-sel-toast-btn tts-btn-sv";
        btnSwedish.textContent = "Swedish";
        btnSwedish.addEventListener("click", (e) => {
          e.stopPropagation();
          cleanup("swedish");
        });
        content.appendChild(btnSwedish);
        const btnEnglish = document.createElement("button");
        btnEnglish.className = "tts-sel-toast-btn tts-btn-en";
        btnEnglish.textContent = "English";
        btnEnglish.addEventListener("click", (e) => {
          e.stopPropagation();
          cleanup("english");
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
        const toastWidth = toast.offsetWidth || 205;
        const toastHeight = toast.offsetHeight || 31;
        toast.style.top = `${top - toastHeight - 8}px`;
        toast.style.left = `${left + width / 2 - toastWidth / 2}px`;
        if (parseFloat(toast.style.top) < 0) {
          toast.style.top = `${top + height + 8}px`;
        }
        if (parseFloat(toast.style.left) < 0) {
          toast.style.left = "8px";
        }
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
    showDefinitionToast(word, definition, pageUrl, language) {
      let top = 100;
      let left = 100;
      let height = 0;
      let width = 0;
      let rect = this.lastSelectionRect;
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const liveRect = range.getBoundingClientRect();
        if (liveRect.width > 0 && liveRect.height > 0) {
          rect = {
            top: liveRect.top,
            left: liveRect.left,
            width: liveRect.width,
            height: liveRect.height,
            scrollY: window.scrollY,
            scrollX: window.scrollX
          };
        }
      }
      if (rect) {
        top = rect.top + rect.scrollY;
        left = rect.left + rect.scrollX;
        width = rect.width;
        height = rect.height;
      }
      const toast = document.createElement("div");
      toast.className = "tts-selection-toast";
      toast.style.position = "absolute";
      toast.style.maxWidth = "360px";
      const content = document.createElement("div");
      content.className = "tts-sel-toast-content";
      content.style.flexDirection = "column";
      content.style.alignItems = "flex-start";
      content.style.gap = "4px";
      content.style.padding = "8px 12px";
      const headerRow = document.createElement("div");
      headerRow.style.display = "flex";
      headerRow.style.alignItems = "center";
      headerRow.style.justifyContent = "space-between";
      headerRow.style.width = "100%";
      const titleContainer = document.createElement("div");
      titleContainer.style.display = "flex";
      titleContainer.style.alignItems = "center";
      titleContainer.style.gap = "6px";
      const wordElem = document.createElement("strong");
      wordElem.textContent = word;
      titleContainer.appendChild(wordElem);
      if (language) {
        const langBadge = document.createElement("span");
        langBadge.className = "tts-sel-toast-label";
        langBadge.textContent = `(${language})`;
        langBadge.style.fontSize = "10px";
        titleContainer.appendChild(langBadge);
      }
      headerRow.appendChild(titleContainer);
      const btnClose = document.createElement("button");
      btnClose.className = "tts-sel-toast-close";
      btnClose.textContent = "\u2715";
      btnClose.addEventListener("click", (e) => {
        e.stopPropagation();
        cleanup();
      });
      headerRow.appendChild(btnClose);
      content.appendChild(headerRow);
      const defElem = document.createElement("div");
      defElem.style.fontSize = "11px";
      defElem.style.lineHeight = "1.4";
      defElem.style.color = "#e0e0e0";
      defElem.style.maxHeight = "140px";
      defElem.style.overflowY = "auto";
      defElem.style.whiteSpace = "pre-wrap";
      defElem.textContent = Array.isArray(definition) ? definition.join("\n") : definition;
      content.appendChild(defElem);
      if (pageUrl) {
        const linkElem = document.createElement("a");
        linkElem.href = pageUrl;
        linkElem.target = "_blank";
        linkElem.rel = "noopener noreferrer";
        linkElem.textContent = "Read on Wiktionary \u2192";
        linkElem.style.color = "#4a90e2";
        linkElem.style.fontSize = "11px";
        linkElem.style.marginTop = "2px";
        linkElem.style.textDecoration = "none";
        linkElem.addEventListener("mouseover", () => linkElem.style.textDecoration = "underline");
        linkElem.addEventListener("mouseout", () => linkElem.style.textDecoration = "none");
        content.appendChild(linkElem);
      }
      toast.appendChild(content);
      document.body.appendChild(toast);
      const toastWidth = toast.offsetWidth || 300;
      const toastHeight = toast.offsetHeight || 80;
      toast.style.top = `${top - toastHeight - 8}px`;
      toast.style.left = `${Math.max(8, left + width / 2 - toastWidth / 2)}px`;
      if (parseFloat(toast.style.top) < 0) {
        toast.style.top = `${top + height + 8}px`;
      }
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
        }, 150);
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
          this.notificationView.showDefinitionToast(message.word, message.definition, message.pageUrl, message.language);
        } else if (message.action === "showNotification" && message.text) {
          this.notificationView.show(message.toastType || "playing", message.text, message.duration || 4e3);
        }
      });
    }
    async speak(text) {
      try {
        const settings = await new Promise((resolve) => {
          chrome.storage.sync.get({ piperVoice: DEFAULT_SETTINGS.piperVoice }, (items) => {
            resolve(items);
          });
        });
        const voice = settings.piperVoice || DEFAULT_SETTINGS.piperVoice;
        const voiceName = voice.charAt(0).toUpperCase() + voice.slice(1);
        if (!this.model.session) {
          this.notificationView.show("loading", `Loading voice model (${voiceName})...`);
        } else {
          this.notificationView.show("synthesizing", `Synthesizing "${text}"...`);
        }
        await this.model.loadEngine();
        this.notificationView.show("synthesizing", `Synthesizing "${text}"...`);
        const wavBuffer = await this.model.synthesize(text);
        this.notificationView.show("playing", `Playing speech for "${text}"...`);
        const blob = new Blob([wavBuffer], { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.addEventListener("ended", () => {
          this.notificationView.dismiss();
        });
        await audio.play();
      } catch (error) {
        console.error("Speech synthesis failed:", error);
        this.notificationView.show("error", `Synthesis failed: ${error.message || error}`, 3e3);
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
