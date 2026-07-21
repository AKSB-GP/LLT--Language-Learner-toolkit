import { DEFAULT_SETTINGS } from "../const";
import { PiperSettings } from "../interfaces";

declare const ort: any;
declare const createPiperPhonemize: any;

export class TTSModel {
  public session: any = null;
  public voiceConfig: any = null;
  public engineLoading: boolean = false;
  public loadedVoiceFile: string | null = null;

  constructor() {}

  //load engine in background
  async loadEngine(): Promise<void> {
    //  Fetch preferences from sync storage
    const settings = await new Promise<{ piperVoiceFile?: string }>(
      (resolve) => {
        chrome.storage.sync.get(
          {
            piperVoiceFile: DEFAULT_SETTINGS.piperVoiceFile,
          },
          (items) => {
            resolve(items as { piperVoiceFile?: string });
          },
        );
      },
    );
    const voiceFile =
      settings.piperVoiceFile || DEFAULT_SETTINGS.piperVoiceFile;
    // Check if we need to load or swap the model session
    if (this.session && this.voiceConfig && this.loadedVoiceFile === voiceFile)
      return;

    if (this.engineLoading) {
      while (this.engineLoading) {
        await new Promise((r) => setTimeout(r, 100));
      }
      if (this.session && this.loadedVoiceFile === voiceFile) return;
    }

    this.engineLoading = true;

    try {
      //  Fetch config JSON and model binary directly from local extension folder
      const configUrl = chrome.runtime.getURL(`models/${voiceFile}.onnx.json`);
      const configResponse = await fetch(configUrl);
      this.voiceConfig = await configResponse.json();

      const modelUrl = chrome.runtime.getURL(`models/${voiceFile}.onnx`);
      const modelResponse = await fetch(modelUrl);
      const modelBuffer = await modelResponse.arrayBuffer();

      //  Configure ONNX Runtime WASM paths
      //   simd=false + numThreads=1 => "ort-wasm.wasm" (non-SIMD, non-threaded)
      // wasmPaths as a string prefix is how v1.14.0 resolves filenames (locateFile).
      ort.env.allowLocalModels = false;
      ort.env.wasm.simd = false;
      ort.env.wasm.numThreads = 1;
      ort.env.wasm.wasmPaths = chrome.runtime.getURL("lib/");

      //  Load ONNX Session
      this.session = await ort.InferenceSession.create(modelBuffer, {
        executionProviders: ["wasm"],
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
  async synthesize(text: string): Promise<ArrayBuffer> {
    await this.loadEngine();

    // Fetch current settings
    const settings = await new Promise<Partial<PiperSettings>>((resolve) => {
      chrome.storage.sync.get(
        {
          piperSpeed: DEFAULT_SETTINGS.piperSpeed,
          piperNoiseScale: DEFAULT_SETTINGS.piperNoiseScale,
          piperNoiseW: DEFAULT_SETTINGS.piperNoiseW,
        },
        (items) => {
          resolve(items as Partial<PiperSettings>);
        },
      );
    });
    //fallback to russian
    const voiceName = this.voiceConfig.espeak?.voice || "ru";

    // Phonemization, i.e text to phonetic represetation using espeak-ng
    const phonemeIds = await new Promise<number[] | null>(
      async (resolve, reject) => {
        try {
          const phonemizer = await createPiperPhonemize({
            print: (l: string) => {
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
            printErr: (msg: string) => {
              console.warn("Phonemizer warning:", msg);
            },
            //fetch phonemaiztion files for piper
            locateFile: (file: string) => {
              if (file.endsWith(".wasm")) {
                return chrome.runtime.getURL("lib/piper_phonemize.wasm");
              }
              if (file.endsWith(".data")) {
                return chrome.runtime.getURL("lib/piper_phonemize.data");
              }
              return file;
            },
          });
          //create payload and invoke with arguments
          const inputJSON = JSON.stringify([{ text: text.trim() }]);
          phonemizer.callMain([
            "-l",
            voiceName,
            "--input",
            inputJSON,
            "--espeak_data",
            "/espeak-ng-data",
          ]);
        } catch (err) {
          reject(err);
        }
      },
    );

    if (!phonemeIds || phonemeIds.length === 0) {
      throw new Error("Could not extract phonemes from text.");
    }

    // syntheziez the audio for piper tts using onnx runtime
    const baseLengthScale = this.voiceConfig.inference?.length_scale ?? 1.0;
    const speed = settings.piperSpeed ?? DEFAULT_SETTINGS.piperSpeed;
    const lengthScale = baseLengthScale / speed;
    const noiseScale =
      settings.piperNoiseScale ?? DEFAULT_SETTINGS.piperNoiseScale;
    const noiseW = settings.piperNoiseW ?? DEFAULT_SETTINGS.piperNoiseW;

    //create feed and run onnx inference
    const feed: Record<string, any> = {
      input: new ort.Tensor(
        "int64",
        BigInt64Array.from(phonemeIds.map(BigInt)),
        [1, phonemeIds.length],
      ),
      input_lengths: new ort.Tensor(
        "int64",
        BigInt64Array.from([BigInt(phonemeIds.length)]),
      ),
      scales: new ort.Tensor(
        "float32",
        Float32Array.from([noiseScale, lengthScale, noiseW]),
      ),
    };
    //add speaker id if needed
    if (
      this.voiceConfig.speaker_id_map &&
      Object.keys(this.voiceConfig.speaker_id_map).length > 0
    ) {
      feed.sid = new ort.Tensor("int64", BigInt64Array.from([0n]));
    }
    //run onnx inference
    const output = await this.session.run(feed);
    const rawAudio = output.output.data;

    // Convert raw PCM to WAV container
    const sampleRate = this.voiceConfig.audio?.sample_rate || 22050;
    return this.buildWavHeader(rawAudio, 1, sampleRate);
  }
  //build wav header
  buildWavHeader(
    samples: Float32Array,
    numChannels: number,
    sampleRate: number,
  ): ArrayBuffer {
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
