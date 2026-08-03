# LLT - Language Learner Toolkit

> A Chrome Extension written in TypeScript for language learning featuring offline neural Text-to-Speech (TTS), grammatical metadata analysis, Wiktionary lookup, definition fetching, and vocabulary export.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Usage Guide](#usage-guide)
- [Provided Voice Models](#provided-voice-models)
- [Architecture](#architecture)
  - [MVP Architecture Pattern](#mvp-architecture-pattern)
  - [System Flow Diagram](#system-flow-diagram)
  - [Tech Stack](#tech-stack)
- [Language Identification System](#language-identification-system)
- [Storage and Audio Caching](#storage-and-audio-caching)
- [Comprehensive Parameters Guide](#comprehensive-parameters-guide)
  - [Piper Neural TTS Parameters](#piper-neural-tts-parameters)
  - [Google Native Speech API Parameters](#google-native-speech-api-parameters)
  - [General & Lookup Parameters](#general--lookup-parameters)
- [Project Structure](#project-structure)
- [Installation & Developer Guide](#installation--developer-guide)
  - [Prerequisites](#prerequisites)
  - [Developer Installation](#developer-installation)
  - [Build Scripts](#build-scripts)
- [License](#license)

---

## Overview

**LLT (Language Learner Toolkit)** is a Chrome extension designed to streamline the workflow of language learners studying Russian, English, and Swedish. Operating primarily through browser context menus and floating text overlays, LLT enables users to hear accurate offline pronunciations, inspect word definitions and grammatical inflections, look up entries on Wiktionary, save vocabulary records, and export compiled lists to CSV for flashcard creation.

---

## Key Features

- **In-Page Sentence Translation (`anylang`)**: Integrates `anylang` translation primitives and batching schedulers (`GoogleTranslator`). Enables full-sentence or phrase translation directly in floating toast popups with automatic source script identification (handled by anylang). Target langauge can be set in the options panel ("EN", "SV", "RU" ). Also handles cases when source and target languages are the same (user is prompted to choose target language). Finally copy text to clipboard is also featured.

- **Offline Neural Text-to-Speech (Piper ONNX)**: Runs local machine learning inference inside the browser using ONNX Runtime Web and eSpeak-NG WASM phonemization. Supports 12 local voice models across Russian, English, and Swedish without relying on external cloud APIs.
- **Google Native TTS Fallback**: Integrates with Chrome's native Speech Synthesis API for quick pronunciation fallback with adjustable speech rate.
- **Grammatical Metadata Analysis (Russian)**: Automatically extracts grammatical attributes for Russian words from Free Dictionary API, including gender (_masculine_, _feminine_, _neuter_), animacy (_animate_, _inanimate_), case inflections (_nominative_, _genitive_, _dative_, _accusative_, _instrumental_, _prepositional_, _locative_), and number (_singular_, _plural_).
- **In-Page Definition Cards**: Displays non-intrusive floating toasts positioned directly above highlighted text in active browser tabs, presenting definitions, parts of speech, and direct Wiktionary reference links.
- **Hybrid Language Identification**: Automatically routes selected text based on script analysis (Cyrillic for Russian) and either machine learning n-gram classification (ELD) or an interactive in-page prompt modal for Latin-script text (English vs. Swedish).
- **Vocabulary Storage & CSV Export**: Saves vocabulary entries into IndexedDB with deduplication, creation timestamps, and definition metadata. Exports clean CSV files formatted for Anki or flashcard applications.
- **IndexedDB Audio Caching**: Caches synthesized WAV audio buffers in local browser storage to provide instant playback for repeated words with automatic Least Recently Used (LRU) cache eviction.

---

## Usage Guide

1. **Translate Text (Google Translate)**:
   - Highlight any sentence, phrase, or word on a web page.
   - Right-click and select **TRANSLATE WITH GOOGLE**.
   - A floating toast overlay displays the source language badge, original text preview, and translated result.
   - If the highlighted text's source language matches your configured target language preference (e.g. English text selected while target setting is set to English), an in-page prompt modal allows choosing an alternative target language (`RUSSIAN` or `SWEDISH`) for that translation.
   - Click **COPY** to copy the translated text to your clipboard.

2. **Pronounce Word (Piper Offline TTS)**:
   - Highlight any word or sentence on a web page.
   - Right-click and select **PRONOUNCE WITH PIPER TTS**.
   - The extension will load the configured local ONNX voice model and play neural audio output.

3. **Pronounce Word (Google Native TTS)**:
   - Highlight text, right-click, and select **PRONOUNCE WITH GOOGLE TTS**.

4. **Get Definition & Grammatical Details**:
   - Highlight a word, right-click, and select **GET DEFINITION OF WORD**.
   - An in-page floating toast will display the definition, part of speech, and Russian grammatical attributes (gender, animacy, case inflection).
   - Click **SAVE TO VOCABULARY LIST** to save the entry into local storage.

5. **Open Wiktionary Page**:
   - Highlight a word, right-click, and select **OPEN WIKTIONARY OF WORD**.

6. **Hear pronunciation examples on Youglish**:
   - Highlight a word, right-click, and select **OPEN YOUGLISH OF WORD**.

7. **Save Word Directly**:
   - Highlight a word, right-click, and select **SAVE WORD TO VOCABULARY**.

8. **Manage Settings & Export Vocabulary**:
   - Click the LLT extension icon in the Chrome toolbar to open the options panel.
   - Configure Piper voice models, speech rate (`0.5x` - `2.0x`), noise scale parameters, translation target language (`en`, `sv`, `ru`), and language lookup mode.
   - Click **Export Vocabulary (CSV)** to download all saved words as a `.csv` file.
   - Use **Clear Audio Cache** or **Clear Saved Vocabulary** buttons to manage stored data.

---

## Provided Voice Models

The extension includes **12 pre-packaged Piper neural text-to-speech models** in ONNX format stored in the `models/` directory:

| Language         | Model Name | Gender       | Quality | Description                           | Filename Prefix           |
| :--------------- | :--------- | :----------- | :------ | :------------------------------------ | :------------------------ |
| **Russian**      | Irina      | Female       | Medium  | Smooth, natural Russian pronunciation | `ru_RU-irina-medium`      |
| **Russian**      | Denis      | Male         | Medium  | Energetic Russian pronunciation       | `ru_RU-denis-medium`      |
| **Russian**      | Dmitri     | Male         | Medium  | Natural Russian pronunciation         | `ru_RU-dmitri-medium`     |
| **Russian**      | Ruslan     | Male         | Medium  | Warm Russian pronunciation            | `ru_RU-ruslan-medium`     |
| **English (GB)** | Alan       | Male         | Medium  | Standard British English accent       | `en_GB-alan-medium`       |
| **English (GB)** | Alba       | Female       | Medium  | Standard British English accent       | `en_GB-alba-medium`       |
| **English (GB)** | Cori       | Female       | High    | High-fidelity British English accent  | `en_GB-cori-high`         |
| **English (US)** | Bryce      | Male         | Medium  | Standard American English accent      | `en_US-bryce-medium`      |
| **English (US)** | HFC Female | Female       | Medium  | Clear American English accent         | `en_US-hfc_female-medium` |
| **English (US)** | HFC Male   | Male         | Medium  | Clear American English accent         | `en_US-hfc_male-medium`   |
| **Swedish**      | Alma       | Female       | Medium  | Soft Swedish pronunciation            | `sv_SE-alma-medium`       |
| **Swedish**      | Lisa       | Female       | Medium  | Standard Swedish pronunciation        | `sv_SE-lisa-medium`       |
| **Swedish**      | NST        | Male/Neutral | Medium  | Standard Nordic Swedish voice model   | `sv_SE-nst-medium`        |

---

## Architecture

### MVP Architecture Pattern

The codebase adheres to a decoupled **MVP (Model-View-Presenter)** architecture:

```text
[ Browser Context Menu / Storage ]
              │
              ▼
    ┌──────────────────┐
    │  background.ts   │  (Service Worker & Route Dispatcher)
    └─────────┬────────┘
              │ chrome.runtime messages
              ▼
    ┌──────────────────┐
    │  TTSController   │  (Presenter Layer)
    └────┬────────┬────┘
         │        │
         │        └────────────────────────┐
         ▼                                 ▼
┌──────────────────┐             ┌────────────────────┐
│    TTSModel      │             │  NotificationView  │
│  DatabaseModel   │             │  (Floating Toasts) │
│  (Model Layer)   │             │   (View Layer)     │
└──────────────────┘             └────────────────────┘
```

1. **Model Layer**:
   - `src/model/DatabaseModel.ts`: Manages IndexedDB connection (`LLT_Database`), object stores (`vocabulary` and `audio_cache`), indexes, transaction handling, and LRU cache eviction.
   - `src/model/TTSModel.ts`: Handles loading local ONNX voice models, executing eSpeak-NG phonemization (`piper_phonemize.wasm`), running ONNX inference sessions, and building raw PCM WAV headers.
   - `src/model/GoogleTranslatorModel.ts`: Wraps `anylang` (`GoogleTranslator` and `Scheduler`) for batching and executing source-to-target language translations.

2. **View Layer**:
   - `src/view/NotificationView.ts`: Renders floating UI elements directly into web page DOMs, including selection tracking, speech progress toasts, language selection prompts, translation cards, and definition overlay cards.

3. **Presenter Layer**:
   - `src/controller/TTSController.ts`: Listens for runtime messages from background scripts, manages state transitions between loading, synthesis, and playback, and coordinates data flow between models and views.

4. **Service Worker Layer**:
   - `src/background.ts`: Registers Chrome context menu items, routes context menu actions, executes external dictionary API requests, performs Russian grammatical tag extraction, and handles language identification logic.

---

### Tech Stack

| Layer                   | Technology                               | Description                                                                        |
| :---------------------- | :--------------------------------------- | :--------------------------------------------------------------------------------- |
| **Extension Platform**  | Chrome Manifest V3                       | Background Service Worker, Content Scripts, Options Panel                          |
| **Language & Runtime**  | TypeScript, Node.js                      | Strongly-typed architecture compiled to JavaScript                                 |
| **Translation Engine**  | `anylang` (`GoogleTranslator`)           | Modular translation primitives and batching scheduler for Google Translate API     |
| **ML Inference Engine** | ONNX Runtime Web (`ort-wasm.wasm`)       | WebAssembly ONNX inference engine running locally in-browser                       |
| **Phonemizer Engine**   | Piper Phonemize (`piper_phonemize.wasm`) | eSpeak-NG WebAssembly phonemization engine for text-to-phoneme conversion          |
| **Language Classifier** | ELD (Efficient Language Detector)        | Fast n-gram classifier for Latin-script text identification (`oldlang_model.json`) |
| **Local Storage**       | IndexedDB API                            | Persistent storage for saved vocabulary records and synthesized audio cache        |
| **External APIs**       | Free Dictionary API, Wiktionary          | Dictionary entry fetching and full morphological reference links                   |

---

## Language Identification setup

LLTs pipeline to identify word language prior to dictionary lookups or Wiktionary routing is the following:

```text
               [ Selected Word ]
                       │
                       ▼
            Is Cyrillic Regex Match?
                 /          \
              YES            NO
              /                \
      [ Language: Russian ]     Check User Preference `lookupMethod`
                                    /                       \
                            mode == "classifier"        mode == "manual"
                                  /                            \
                     Run ELD Classifier               Contains [åäöÅÄÖ]?
                       /         \                     /            \
                Language: sv   Language: en        YES                NO
                /                 \                /                    \
         [ Swedish ]          [ English ]    [ Swedish ]        Display In-Page Dialog
                                                                (Prompt English vs Swedish)
```

---

## Storage and Audio Caching

LLT uses browser **IndexedDB** (`LLT_Database` v2) with two primary object stores:

1. **`vocabulary` Store**:
   - **Key Path**: `id` (Auto-incrementing integer)
   - **Indexes**: `word`, `language`, `createdAt`, composite `word_language`
   - **Purpose**: Stores saved vocabulary words, definitions, Wiktionary URLs, creation dates, notes, and tags. Deduplicates words based on `word + language`.

2. **`audio_cache` Store**:
   - **Key Path**: `cacheKey` (Composite string: `${voice}_${speed}_${scale}_${noiseW}_${cleanText}`)
   - **Indexes**: `lastAccessed`
   - **Purpose**: Caches synthesized WAV `ArrayBuffer` objects for instantaneous playback.
   - **LRU Pruning & Quota Handling**: Automatically deletes entries older than 30 days or trims entries exceeding 200 items when browser quota limits (`QuotaExceededError`) are encountered.

---

## Comprehensive Parameters Guide

Below is a complete description of every parameter used across model inference, speech engines, and extension settings:

### Piper Neural TTS Parameters

| Parameter                     | Type         | Default Value                       | Description                                                                                                                                                                                                              |
| :---------------------------- | :----------- | :---------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `piperLanguageCategory`       | `string`     | `"russian"`                         | Active target language category (`"russian"`, `"english"`, or `"swedish"`). Selects the voice pool.                                                                                                                      |
| `piperVoice`                  | `string`     | `"irina"`                           | Identifier of the selected voice model within the active language category (e.g., `"irina"`, `"alan"`, `"alma"`).                                                                                                        |
| `piperVoiceFile`              | `string`     | `"ru_RU-irina-medium"`              | Relative filename prefix of the `.onnx` model binary and `.onnx.json` configuration file inside `models/`.                                                                                                               |
| `piperSpeed`                  | `number`     | `1.0`                               | Controls speech rate / tempo multiplier (Range: `0.5`x to `2.0`x). Used in model inference to compute `lengthScale = baseLengthScale / piperSpeed`. Lower values slow down speech rate; higher values accelerate speech. |
| `piperNoiseScale`             | `number`     | `0.667`                             | Phoneme duration variability parameter. Controls the amount of stochastic noise added to phoneme durations during synthesis. Higher values increase expressiveness; lower values produce uniform, monotone timing.       |
| `piperNoiseW`                 | `number`     | `0.80`                              | Noise Width parameter. Controls acoustic generator noise and pitch fluctuation / vocal timbre. Higher values add pitch variation; lower values produce smoother pitch output.                                            |
| `scales` (ONNX Tensor)        | `ort.Tensor` | `[noiseScale, lengthScale, noiseW]` | Float32 Tensor `[1, 3]` sent directly to ONNX InferenceSession controlling synthesis timing, speed, and pitch parameters.                                                                                                |
| `input` (ONNX Tensor)         | `ort.Tensor` | Phoneme IDs                         | BigInt64 Tensor `[1, N]` containing numerical phoneme sequence IDs generated by eSpeak-NG phonemizer.                                                                                                                    |
| `input_lengths` (ONNX Tensor) | `ort.Tensor` | `[N]`                               | BigInt64 Tensor `[1]` specifying total length of the phoneme ID sequence.                                                                                                                                                |
| `sid` (ONNX Tensor)           | `ort.Tensor` | `[0]`                               | Optional BigInt64 Tensor `[1]` specifying speaker ID index for multi-speaker models.                                                                                                                                     |

### Google Native Speech API Parameters

| Parameter        | Type     | Default Value | Description                                                                                      |
| :--------------- | :------- | :------------ | :----------------------------------------------------------------------------------------------- |
| `googleLanguage` | `string` | `"ru-RU"`     | BCP-47 language locale tag passed to `chrome.tts.speak` (e.g., `"ru-RU"`, `"en-US"`, `"sv-SE"`). |
| `googleRate`     | `number` | `1.0`         | Speech rate multiplier for Chrome's native Speech Synthesis API (Range: `0.5`x to `2.0`x).       |

### General & Lookup Parameters

| Parameter                       | Type     | Default Value | Description                                                                                                                                                                                                        |
| :------------------------------ | :------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lookupMethod`                  | `string` | `"manual"`    | Strategy for resolving Latin-script words: `"manual"` prompts the user with an in-page UI dialog to select Swedish vs English; `"classifier"` uses ELD machine learning to select automatically.                   |
| `googleTranslateTargetLanguage` | `string` | `"en"`        | Target language ISO code for Google Translate feature (`"en"`, `"sv"`, `"ru"`). Configurable via extension options panel. If source language matches target setting, prompts user to select an alternative target. |

---

## Project Structure

```text
LLT--Language-Learner-toolkit/
├── manifest.json              # Chrome Extension Manifest V3 configuration
├── package.json               # Node.js dependencies, build scripts, and TypeScript settings
├── tsconfig.json              # TypeScript compiler options
├── popup.html                 # Extension popup options panel HTML layout
├── popup.css                  # Extension popup stylesheet
├── styles.css                 # Content script floating overlay styles
├── background.js              # Service Worker entry point wrapper
├── models/                    # Pre-packaged ONNX models and configuration files
│   ├── ru_RU-irina-medium.onnx
│   ├── ru_RU-irina-medium.onnx.json
│   ├── ru_RU-denis-medium.onnx
│   ├── ru_RU-dmitri-medium.onnx
│   ├── ru_RU-ruslan-medium.onnx
│   ├── en_GB-alan-medium.onnx
│   ├── en_GB-alba-medium.onnx
│   ├── en_GB-cori-high.onnx
│   ├── en_US-bryce-medium.onnx
│   ├── en_US-hfc_female-medium.onnx
│   ├── en_US-hfc_male-medium.onnx
│   ├── sv_SE-alma-medium.onnx
│   ├── sv_SE-lisa-medium.onnx
│   ├── sv_SE-nst-medium.onnx
│   └── oldlang_model.json
├── lib/                       # WebAssembly runtime libraries
│   ├── ort.min.js             # ONNX Runtime Web JS wrapper
│   ├── ort.wasm               # ONNX Runtime WebAssembly binary
│   ├── piper_phonemize.min.js # Piper eSpeak-NG phonemizer JS interface
│   ├── piper_phonemize.wasm   # Piper eSpeak-NG phonemizer WebAssembly binary
│   └── piper_phonemize.data   # eSpeak-NG voice data dictionary
├── src/                       # TypeScript source codebase
│   ├── background.ts          # Background service worker, context menu, dictionary API
│   ├── contentScript.ts       # Content script entry point, initializes MVP Controller
│   ├── popup.ts               # Extension popup UI event handlers and storage synchronization
│   ├── const.ts               # Configuration defaults, voice maps, context menu items
│   ├── interfaces.ts          # TypeScript interfaces and type definitions
│   ├── controller/
│   │   └── TTSController.ts  # Presenter layer: coordinates speech flow and view updates
│   ├── model/
│   │   ├── DatabaseModel.ts         # Model layer: IndexedDB operations and audio cache manager
│   │   ├── GoogleTranslatorModel.ts # Model layer: anylang GoogleTranslator & Scheduler
│   │   └── TTSModel.ts              # Model layer: ONNX inference and WAV buffer generator
│   └── view/
│       └── NotificationView.ts # View layer: DOM text position tracking and toast UI rendering
└── dist/                      # Compiled JavaScript output directory
```

---

## Installation & Developer Guide

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18.0.0 or higher recommended): [Download Node.js](https://nodejs.org/)
- **npm** (v9.0.0 or higher)
- **Git with Git LFS**: Required to clone large ONNX binary model files (`git lfs pull`).
- **Google Chrome** (or Chromium-based browser such as Brave, Edge).

---

### Developer Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/AKSB-GP/LLT--Language-Learner-toolkit.git
   cd LLT--Language-Learner-toolkit
   git lfs pull
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Compile Source Code**

   ```bash
   npm run build
   ```

4. **Load Unpacked Extension into Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Toggle **Developer mode** on in the top-right corner.
   - Click **Load unpacked**.
   - Select the repository root folder `LLT--Language-Learner-toolkit`.

---

### Build Scripts

| Command           | Description                                                                       |
| :---------------- | :-------------------------------------------------------------------------------- |
| `npm run build`   | Compiles TypeScript files into JavaScript in `dist/` and root output files.       |
| `npm run compile` | Runs `tsc` compiler to verify TypeScript types without emitting files.            |
| `npm run watch`   | Runs TypeScript compiler in watch mode for auto-recompilation during development. |

---

## License

This project is licensed under the MIT License.
