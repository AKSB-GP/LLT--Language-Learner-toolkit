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

export interface GoogleSettings {
  googleLanguage: string;
  googleRate: number;
}

export interface GeneralSettings {
  lookupMethod: 'manual' | 'classifier';
}

export type ExtensionSettings = PiperSettings & GoogleSettings & GeneralSettings;
