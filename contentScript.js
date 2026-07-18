// contentScript.js – Multi-language Word Highlighter & Local-only ONNX/Piper TTS Player (MVC Architecture)

// Regex mapping for each supported language category
const REGEX_MAP = {
  russian: /\b[А-ЯЁа-яё\-]+\b/g,
  english: /\b[A-Za-z\-]+\b/g,
  swedish: /\b[A-Za-zåäöÅÄÖ\-]+\b/g
};

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
 *  VIEW: HighlighterView
 *  Manages document node tree walking and 
 *  safe wrapping (no innerHTML/regexp replacements).
 *  ========================================== */
class HighlighterView {
  constructor() {
    this.languageCategory = 'russian';
  }

  setLanguageCategory(category) {
    this.languageCategory = category;
  }

  highlightText(node) {
    if (!node) return;

    const childNodes = Array.from(node.childNodes);
    const regex = REGEX_MAP[this.languageCategory] || REGEX_MAP.russian;

    for (const child of childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.nodeValue;

        // Reset regex state before test
        regex.lastIndex = 0;
        if (regex.test(text) && child.parentElement) {
          const parentTag = child.parentElement.tagName.toLowerCase();
          if (['script', 'style', 'textarea', 'pre', 'code', 'input', 'noscript'].includes(parentTag)) {
            continue;
          }

          if (child.parentElement.classList.contains('ru-highlight')) {
            continue;
          }

          this.safeHighlightNode(child, regex);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.classList.contains('ru-highlight')) {
          continue;
        }
        this.highlightText(child);
      }
    }
  }

  // Parses the text node, wrapping matches safely with standard DOM APIs
  safeHighlightNode(textNode, regex) {
    const text = textNode.nodeValue;
    regex.lastIndex = 0;
    let match;
    let lastIndex = 0;
    const fragment = document.createDocumentFragment();

    while ((match = regex.exec(text)) !== null) {
      // Append preceding plain text
      if (match.index > lastIndex) {
        fragment.appendChild(document.createTextNode(text.substring(lastIndex, match.index)));
      }

      // Create secure span highlight element
      const span = document.createElement('span');
      span.className = 'ru-highlight';
      span.dataset.word = match[0];
      span.textContent = match[0];
      fragment.appendChild(span);

      lastIndex = regex.lastIndex;
    }

    // Append remaining plain text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    textNode.replaceWith(fragment);
  }

  // Removes all active highlights safely
  clearAllHighlights() {
    const highlights = document.querySelectorAll('.ru-highlight');
    highlights.forEach(span => {
      const parent = span.parentNode;
      if (parent) {
        span.replaceWith(document.createTextNode(span.textContent));
      }
    });
    document.body.normalize();
  }
}

/** ==========================================
 *  CONTROLLER: TTSController
 *  Wires user actions, observers, model state,
 *  and maps views.
 *  ========================================== */
class TTSController {
  constructor(model, highlighterView) {
    this.model = model;
    this.highlighterView = highlighterView;
    this.observer = null;
  }

  async init() {
    // 1. Fetch configured language category
    const settings = await new Promise(resolve => {
      chrome.storage.sync.get({
        piperLanguageCategory: 'russian'
      }, resolve);
    });

    this.highlighterView.setLanguageCategory(settings.piperLanguageCategory);
    this.highlighterView.highlightText(document.body);
    this.model.loadEngine();
    this.setupListeners();
    this.setupObserver();
  }

  setupListeners() {
    // 1. Highlight element clicks
    document.body.addEventListener('click', async (e) => {
      const target = e.target;
      if (target.classList && target.classList.contains('ru-highlight')) {
        const word = target.dataset.word;
        if (word) {
          target.classList.add('highlight-active');
          setTimeout(() => target.classList.remove('highlight-active'), 600);
          await this.speak(word);
        }
      }
    });

    // 2. Relay selected text from right-click context menus & settings changes
    chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
      if (message.action === "speakSelection" && message.text) {
        this.speak(message.text);
      } else if (message.action === "settingsChanged") {
        // Redo highlights with new settings
        if (this.observer) {
          this.observer.disconnect();
        }
        this.highlighterView.clearAllHighlights();

        const settings = await new Promise(resolve => {
          chrome.storage.sync.get({
            piperLanguageCategory: 'russian'
          }, resolve);
        });

        this.highlighterView.setLanguageCategory(settings.piperLanguageCategory);
        this.highlighterView.highlightText(document.body);
        this.setupObserver();
      }
    });
  }

  setupObserver() {
    let mutationTimeout;
    this.observer = new MutationObserver(() => {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        if (this.observer) {
          this.observer.disconnect();
        }
        this.highlighterView.highlightText(document.body);
        if (this.observer) {
          this.observer.observe(document.body, { childList: true, subtree: true });
        }
      }, 500);
    });

    this.observer.observe(document.body, { childList: true, subtree: true });
  }

  async speak(text) {
    try {
      const wavBuffer = await this.model.synthesize(text);
      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      await audio.play();
    } catch (error) {
      console.error("Speech synthesis failed:", error);
    }
  }
}

// 4. Instantiation & Start
const startApplication = () => {
  const model = new TTSModel();
  const highlighterView = new HighlighterView();
  const controller = new TTSController(model, highlighterView);
  controller.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApplication);
} else {
  startApplication();
}
