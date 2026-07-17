// contentScript.js – Russian Word Highlighter & ONNX/Piper TTS Player (MVC Architecture)

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
  }

  async loadEngine() {
    if (this.session && this.voiceConfig) return;

    if (this.engineLoading) {
      while (this.engineLoading) {
        await new Promise(r => setTimeout(r, 100));
      }
      return;
    }

    this.engineLoading = true;

    try {
      // 1. Fetch config JSON
      const configUrl = chrome.runtime.getURL("models/ru_RU-irina-medium.onnx.json");
      const configResponse = await fetch(configUrl);
      this.voiceConfig = await configResponse.json();

      // 2. Configure ONNX Runtime WASM paths
      ort.env.allowLocalModels = false;
      ort.env.wasm.numThreads = navigator.hardwareConcurrency || 4;
      ort.env.wasm.wasmPaths = chrome.runtime.getURL('lib/');

      // 3. Load ONNX Session
      const modelUrl = chrome.runtime.getURL("models/ru_RU-irina-medium.onnx");
      const modelResponse = await fetch(modelUrl);
      const modelBuffer = await modelResponse.arrayBuffer();

      this.session = await ort.InferenceSession.create(modelBuffer, { executionProviders: ['wasm'] });
    } catch (error) {
      console.error("Failed to load Piper TTS engine:", error);
      throw error;
    } finally {
      this.engineLoading = false;
    }
  }

  async synthesize(text) {
    await this.loadEngine();

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
    const noiseScale = this.voiceConfig.inference?.noise_scale ?? 0.667;
    const lengthScale = this.voiceConfig.inference?.length_scale ?? 1.35;
    const noiseW = this.voiceConfig.inference?.noise_w ?? 0.8;

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
  highlightRussianText(node) {
    if (!node) return;

    const childNodes = Array.from(node.childNodes);
    const russianRegex = /\b[А-ЯЁа-яё\-]+\b/gi;

    for (const child of childNodes) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.nodeValue;
        if (russianRegex.test(text) && child.parentElement) {
          const parentTag = child.parentElement.tagName.toLowerCase();
          if (['script', 'style', 'textarea', 'pre', 'code', 'input', 'noscript'].includes(parentTag)) {
            continue;
          }

          if (child.parentElement.classList.contains('ru-highlight')) {
            continue;
          }

          this.safeHighlightNode(child);
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.classList.contains('ru-highlight')) {
          continue;
        }
        this.highlightRussianText(child);
      }
    }
  }

  // Parses the text node, wrapping matches safely with standard DOM APIs
  safeHighlightNode(textNode) {
    const text = textNode.nodeValue;
    const regex = /\b([А-ЯЁа-яё\-]+)\b/g;
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
      span.dataset.word = match[1];
      span.textContent = match[1];
      fragment.appendChild(span);

      lastIndex = regex.lastIndex;
    }

    // Append remaining plain text
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    textNode.replaceWith(fragment);
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
  }

  init() {
    this.highlighterView.highlightRussianText(document.body);
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

    // 2. Relay selected text from right-click context menus
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "speakSelection" && message.text) {
        this.speak(message.text);
      }
    });
  }

  setupObserver() {
    let mutationTimeout;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        observer.disconnect();
        this.highlighterView.highlightRussianText(document.body);
        observer.observe(document.body, { childList: true, subtree: true });
      }, 500);
    });

    observer.observe(document.body, { childList: true, subtree: true });
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
