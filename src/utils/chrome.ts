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
export function TTS(text: string, settings: any) {
    chrome.tts.speak(text, {
        lang: DEFAULT_SETTINGS.googleLanguage,
        rate: DEFAULT_SETTINGS.googleRate,
    });
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