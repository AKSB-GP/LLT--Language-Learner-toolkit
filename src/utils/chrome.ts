import { DEFAULT_SETTINGS, LANGUAGE_CODES } from "../const";
/**
 * Creates context menu items registered in `listOfContextMenus`.
 */
export function SendChromeMessage(tabId: number, message: object, catchError?: boolean, errorMessage?: string) {
    if (catchError) {
        return chrome.tabs.sendMessage(tabId, message).catch((err) => {
            console.warn(
                errorMessage || "",
                err,
            );
        });
    }
    return chrome.tabs.sendMessage(tabId, message);
}

export function CreateChromeTabMessage(Message: object) {
    return chrome.tabs.create(Message);
}

export function SetChromeStorageSync(data: object) {
    return chrome.storage.sync.set(data);
}


export function QueryChromeTab(queryInfo: chrome.tabs.QueryInfo): Promise<chrome.tabs.Tab[]> {
    return chrome.tabs.query(queryInfo);
}
/*
  googleLanguage: "ru-RU",
  googleRate: 1.0,
*/
//Flytta speecksynth till annan funktion 
export function GoogleTTS(
    text: string,
    settings?: { googleLanguage?: string; googleRate?: number },
    tabId?: number,
) {
    if (typeof chrome !== "undefined" && chrome.tts && typeof chrome.tts.speak === "function") {
        chrome.tts.speak(text, {
            lang: settings?.googleLanguage || DEFAULT_SETTINGS.googleLanguage,
            rate: settings?.googleRate ?? DEFAULT_SETTINGS.googleRate,
        });
    } else if (typeof speechSynthesis !== "undefined" && typeof SpeechSynthesisUtterance !== "undefined") {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = settings?.googleLanguage || DEFAULT_SETTINGS.googleLanguage;
        utterance.rate = settings?.googleRate ?? DEFAULT_SETTINGS.googleRate;
        speechSynthesis.speak(utterance);
    } else if (tabId) {
        SendChromeMessage(tabId, {
            action: "speakWebSpeech",
            text: text,
            lang: settings?.googleLanguage || DEFAULT_SETTINGS.googleLanguage,
            rate: settings?.googleRate ?? DEFAULT_SETTINGS.googleRate,
        }, true);
    }
}

export function ChromeONClickedContextMenu(callback: (info: chrome.contextMenus.OnClickData, tab?: chrome.tabs.Tab) => void) {
    return chrome.contextMenus.onClicked.addListener(callback);
}


export function ChromeAddListenerForOnInstall(callback: (details: chrome.runtime.InstalledDetails) => void) {
    return chrome.runtime.onInstalled.addListener(callback);
}


/*
chrome.runtime.onInstalled.addListener(() => {
  CreateContextMenus();
});
*/
//chrome.contextMenus.onClicked
//chrome.runtime.onInstalled.addListener(() => {
//CreateContextMenus();
//});