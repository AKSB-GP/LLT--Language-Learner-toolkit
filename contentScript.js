// contentScript.js – Multi-language Word Highlighter & Local-only ONNX/Piper TTS Player with Notifications (MVC Architecture)

/** ==========================================
 *  VIEW: NotificationView
 *  Handles rendering and dismissals of glassmorphic
 *  floating notifications to track TTS progress.
 *  ========================================== */
class NotificationView {
  constructor() {
    this.container = null;
    this.activeToast = null;
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement('div');
    this.container.id = 'tts-notifications-container';
    document.body.appendChild(this.container);
  }

  show(type, message, duration = null) {
    if (this.activeToast) {
      this.activeToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `tts-toast tts-toast-${type}`;

    // Icon block
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tts-toast-icon';
    if (type === 'loading' || type === 'synthesizing') {
      iconContainer.appendChild(this.createSpinnerSVG());
    } else if (type === 'playing') {
      iconContainer.appendChild(this.createWaveSVG());
    } else if (type === 'error') {
      iconContainer.appendChild(this.createWarningSVG());
    }
    toast.appendChild(iconContainer);

    // Text block
    const textContainer = document.createElement('div');
    textContainer.className = 'tts-toast-text';
    textContainer.textContent = message;
    toast.appendChild(textContainer);

    this.container.appendChild(toast);
    this.activeToast = toast;

    // Trigger visual entry transition
    requestAnimationFrame(() => {
      toast.classList.add('tts-toast-visible');
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
      target.classList.remove('tts-toast-visible');
      target.classList.add('tts-toast-fadeout');
      setTimeout(() => {
        target.remove();
        if (this.activeToast === target) {
          this.activeToast = null;
        }
      }, 300);
    }
  }

  createSpinnerSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 50 50');
    svg.setAttribute('class', 'tts-spinner');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '25');
    circle.setAttribute('cy', '25');
    circle.setAttribute('r', '20');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', '5');

    svg.appendChild(circle);
    return svg;
  }

  createWaveSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'tts-audio-waves');

    for (let i = 1; i <= 3; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(i * 5 + 1));
      rect.setAttribute('y', '6');
      rect.setAttribute('width', '3');
      rect.setAttribute('height', '12');
      rect.setAttribute('class', `tts-bar tts-bar-${i}`);
      svg.appendChild(rect);
    }
    return svg;
  }

  createWarningSVG() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'tts-alert-icon');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z');

    svg.appendChild(path);
    return svg;
  }
}

/** ==========================================
 *  MODEL: TTSModel
 *  Manages TTS configuration, ONNX runtime,
 *  phonemization, and audio wave compilation.
 *  ========================================== */
class TTSModel {
  constructor() {
    this.session = null;
    this.voiceConfig = null;
    this.engineLoading = false;
    this.loadedVoiceFile = null;
  }

  async loadEngine() {
    // 1. Fetch preferences from sync storage
    const settings = await new Promise(resolve => {
      chrome.storage.sync.get({
        piperVoiceFile: 'ru_RU-irina-medium'
      }, resolve);
    });

    const voiceFile = settings.piperVoiceFile || 'ru_RU-irina-medium';

    // 2. Check if we need to load or swap the model session
    if (this.session && this.voiceConfig && this.loadedVoiceFile === voiceFile) return;

    if (this.engineLoading) {
      while (this.engineLoading) {
        await new Promise(r => setTimeout(r, 100));
      }
      if (this.session && this.loadedVoiceFile === voiceFile) return;
    }

    this.engineLoading = true;

    try {
      // 3. Fetch config JSON and model binary directly from local extension folder
      const configUrl = chrome.runtime.getURL(`models/${voiceFile}.onnx.json`);
      const configResponse = await fetch(configUrl);
      this.voiceConfig = await configResponse.json();

      const modelUrl = chrome.runtime.getURL(`models/${voiceFile}.onnx`);
      const modelResponse = await fetch(modelUrl);
      const modelBuffer = await modelResponse.arrayBuffer();

      // 4. Configure ONNX Runtime WASM paths
      ort.env.allowLocalModels = false;
      ort.env.wasm.numThreads = navigator.hardwareConcurrency || 4;
      ort.env.wasm.wasmPaths = chrome.runtime.getURL('lib/');

      // 5. Load ONNX Session
      this.session = await ort.InferenceSession.create(modelBuffer, { executionProviders: ['wasm'] });
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

    // Fetch current settings for inference configurations
    const settings = await new Promise(resolve => {
      chrome.storage.sync.get({
        piperSpeed: 1.0,
        piperNoiseScale: 0.667,
        piperNoiseW: 0.8
      }, resolve);
    });

    const voiceName = this.voiceConfig.espeak?.voice || "ru";

    // Phonemization
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
          "-l", voiceName,
          "--input", inputJSON,
          "--espeak_data", "/espeak-ng-data"
        ]);
      } catch (err) {
        reject(err);
      }
    });

    if (!phonemeIds || phonemeIds.length === 0) {
      throw new Error("Could not extract phonemes from text.");
    }

    // ONNX Model Inference
    const baseLengthScale = this.voiceConfig.inference?.length_scale ?? 1.0;
    const lengthScale = baseLengthScale / settings.piperSpeed;
    const noiseScale = settings.piperNoiseScale;
    const noiseW = settings.piperNoiseW;

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

    // Convert raw PCM to WAV container
    const sampleRate = this.voiceConfig.audio?.sample_rate || 22050;
    return this.buildWavHeader(rawAudio, 1, sampleRate);
  }

  buildWavHeader(samples, numChannels, sampleRate) {
    const numSamples = samples.length;
    const headerSize = 44;
    const buffer = new ArrayBuffer(numSamples * 2 + headerSize);
    const view = new DataView(buffer);

    view.setUint32(0, 0x46464952, true); // "RIFF"
    view.setUint32(4, buffer.byteLength - 8, true);
    view.setUint32(8, 0x45564157, true); // "WAVE"
    view.setUint32(12, 0x20746d66, true); // "fmt "
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true); // Raw PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true); // 16-bit
    view.setUint32(36, 0x61746164, true); // "data"
    view.setUint32(40, numSamples * 2, true);

    let offset = headerSize;
    for (let i = 0; i < numSamples; i++) {
      const s = samples[i];
      const intSample = s >= 1.0 ? 32767 : s <= -1.0 ? -32768 : (s * 32768) | 0;
      view.setInt16(offset, intSample, true);
      offset += 2;
    }

    return buffer;
  }
}

/** ==========================================
 *  CONTROLLER: TTSController
 *  Wires context menu triggers, model state,
 *  and maps views.
 *  ========================================== */
class TTSController {
  constructor(model, notificationView) {
    this.model = model;
    this.notificationView = notificationView;
  }

  async init() {
    // Pre-warm the model engine in background asynchronously
    this.model.loadEngine().catch(err => console.warn("TTS Pre-warming failed:", err));
    
    this.setupListeners();
  }

  setupListeners() {
    // Relay selected text from right-click context menus
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.action === "speakSelection" && message.text) {
        this.speak(message.text);
      }
    });
  }

  async speak(text) {
    try {
      const settings = await new Promise(resolve => {
        chrome.storage.sync.get({ piperVoice: 'irina' }, resolve);
      });
      const voiceName = settings.piperVoice.charAt(0).toUpperCase() + settings.piperVoice.slice(1);

      // 1. Show model loading alert if session is uninitialized
      if (!this.model.session) {
        this.notificationView.show('loading', `Loading voice model (${voiceName})...`);
      } else {
        this.notificationView.show('synthesizing', `Synthesizing "${text}"...`);
      }

      // Explicitly await the loadEngine inside the controller to manage the toast transitions
      await this.model.loadEngine();

      // 2. Transition toast to processing/synthesizing state
      this.notificationView.show('synthesizing', `Synthesizing "${text}"...`);

      const wavBuffer = await this.model.synthesize(text);

      // 3. Transition toast to playing state
      this.notificationView.show('playing', `Playing speech for "${text}"...`);

      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.addEventListener('ended', () => {
        this.notificationView.dismiss();
      });

      await audio.play();
    } catch (error) {
      console.error("Speech synthesis failed:", error);
      this.notificationView.show('error', `Synthesis failed: ${error.message || error}`, 3000);
    }
  }
}

// Instantiation & Start
const startApplication = () => {
  const model = new TTSModel();
  const notificationView = new NotificationView();
  const controller = new TTSController(model, notificationView);
  controller.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApplication);
} else {
  startApplication();
}
