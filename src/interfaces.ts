
export interface ContextMenu {
  id: string;
  title: string;
  contexts: chrome.contextMenus.ContextType[];
}
/*piper */
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


/*api response interface for russian word from freedictionary */
export interface RussianWordAPIResponse {
  url: string;
  definition: string;
  wordtype: string;
  gender: string;
  animate: string;
  case?: string;
}
/*api response interface for enlish and swedish word from freedictionary */

export interface WordAPIResponse {
  url: string;
  definition: string;
  wordtype: string;
}
/* api response interface if the request fails */
export interface WordAPIResponseFailed {
  url?: string;
  definition: string;
  wordtype: string;
  error?: string;
}
/* google tts interface */
export interface GoogleSettings {
  googleLanguage: string;
  googleRate: number;
}
export interface GeneralSettings {
  lookupMethod: 'manual' | 'classifier';
}
//types for settings, must have all three settings
export type ExtensionSettings = PiperSettings & GoogleSettings & GeneralSettings;
