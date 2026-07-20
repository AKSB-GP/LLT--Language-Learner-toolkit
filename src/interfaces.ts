export interface ContextMenu {
  id: string;
  title: string;
  contexts: chrome.contextMenus.ContextType[];
}

export interface VoiceOption {
  id: string;
  name: string;
  file: string;
}

export interface PiperSettings {
  piperLanguageCategory: string;
  piperVoice: string;
  piperVoiceFile: string;
  piperSpeed: number;
  piperNoiseScale: number;
  piperNoiseW: number;
}

export interface WikiSummaryPayload {
  word: string;
  definition: string;
  pageUrl: string;
  language: "russian" | "english" | "swedish";
}

export interface DefinitionPayload {
  word: string;
  definition: string | string[];
  pageUrl?: string;
  language?: string;
}

export interface RussianWordAPIResponse {
  url: string;
  definition: string;
  wordtype: string;
  gender: string;
  animate: string;
  case?: string;
}

export interface WordAPIResponse {
  url: string;
  definition: string;
  wordtype: string;
}

export interface WordAPIResponseFailed {
  url?: string;
  definition: string;
  wordtype: string;
  error?: string;
}

export interface FreeDictionaryResult {
  definitionText: string[];
  pageUrl: string;
  gender?: string | null;
  case?: string | null;
}

export interface GoogleSettings {
  googleLanguage: string;
  googleRate: number;
}

export interface GeneralSettings {
  lookupMethod: 'manual' | 'classifier';
}

export type ExtensionSettings = PiperSettings & GoogleSettings & GeneralSettings;
