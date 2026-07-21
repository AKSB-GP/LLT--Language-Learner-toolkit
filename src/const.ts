import { VoiceOption, ContextMenu, ExtensionSettings } from "./interfaces";

/* PIPER TTS VOICE MODEL SETTINGS */
export const VOICES_MAP: Record<string, VoiceOption[]> = {
  russian: [
    { id: "irina", name: "Irina (Medium, Smooth)", file: "ru_RU-irina-medium" },
    {
      id: "denis",
      name: "Denis (Medium, Energetic)",
      file: "ru_RU-denis-medium",
    },
    {
      id: "dmitri",
      name: "Dmitri (Medium, Natural)",
      file: "ru_RU-dmitri-medium",
    },
    {
      id: "ruslan",
      name: "Ruslan (Medium, Warm)",
      file: "ru_RU-ruslan-medium",
    },
  ],
  english: [
    { id: "alan", name: "Alan (Medium, GB)", file: "en_GB-alan-medium" },
    { id: "alba", name: "Alba (Medium, GB)", file: "en_GB-alba-medium" },
    { id: "bryce", name: "Bryce (Medium, US)", file: "en_US-bryce-medium" },
    {
      id: "hfc_female",
      name: "HFC Female (Medium, US)",
      file: "en_US-hfc_female-medium",
    },
    {
      id: "hfc_male",
      name: "HFC Male (Medium, US)",
      file: "en_US-hfc_male-medium",
    },
  ],
  swedish: [
    { id: "alma", name: "Alma (Medium, Soft)", file: "sv_SE-alma-medium" },
    { id: "lisa", name: "Lisa (Medium, Standard)", file: "sv_SE-lisa-medium" },
    { id: "nst", name: "NST (Medium, Standard)", file: "sv_SE-nst-medium" },
  ],
};
/* context menu  */
export const listOfContextMenus: ContextMenu[] = [
  {
    id: "pronounce-with-piper-tts",
    title: "PRONOUNCE WITH PIPER TTS",
    contexts: ["selection"],
  },
  {
    id: "pronounce-with-google-tts",
    title: "PRONOUNCE WITH GOOGLE TTS",
    contexts: ["selection"],
  },
  {
    id: "open-wikitionary-of-word",
    title: "OPEN WIKITIONARY OF WORD",
    contexts: ["selection"],
  },
  {
    id: "get-definition-of-word",
    title: "GET DEFINITION OF WORD",
    contexts: ["selection"],
  },
];
/* language codes */
export const LANGUAGE_CODES: Record<string, string> = {
  russian: "ru",
  english: "en",
  swedish: "sv",
};

export const DEFAULT_SETTINGS: ExtensionSettings = {
  piperLanguageCategory: "russian",
  piperVoice: "irina",
  piperVoiceFile: "ru_RU-irina-medium",
  piperSpeed: 1.0,
  piperNoiseScale: 0.667,
  piperNoiseW: 0.8,
  googleLanguage: "ru-RU",
  googleRate: 1.0,
  lookupMethod: "manual",
};
/* lists used to help with grammer identify of russian words */
export const RUSSIAN_GENDER_LIST = ["masculine", "feminine", "neuter"] as const;
export const RUSSIAN_ANIMACY_LIST = ["animate", "inanimate"] as const;
export const RUSSIAN_CASE_LIST = [
  "nominative",
  "genitive",
  "dative",
  "accusative",
  "instrumental",
  "prepositional",
  "locative",
] as const;
export const RUSSIAN_NUMBER_LIST = ["singular", "plural"] as const;
