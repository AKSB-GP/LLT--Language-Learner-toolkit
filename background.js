// background.js – Context menu relay worker (thin background wrapper)

const listOfContextMenus = [
  {id: "pronounce-russian-piper", title: "Pronounce in Russian (Piper)", contexts: ["selection"]},
  {id: "pronounce-russian-google-tts", title: "Pronounce in Russian (Google TTS)", contexts: ["selection"]},
  {id: "lookUp-russian-word", title: "Look up meaning", contexts: ["selection"]},
];

function CreateContextMenus(){
  for(let i = 0; i < listOfContextMenus.length; i++){
    chrome.contextMenus.create(listOfContextMenus[i]);
  }
}

// 1. Create context menus on installation
chrome.runtime.onInstalled.addListener(() => {
  CreateContextMenus();
});

// 2. Routing clicked menu items
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "pronounce-russian-piper") {
    AddPiperTTSr(info, tab);
  } else if (info.menuItemId === "pronounce-russian-google-tts") {
    AddGoogleTTS(info, tab);
  } else if (info.menuItemId === "lookUp-russian-word") {
  }
});

function AddGoogleTTS(info, tab) {
  if (info.selectionText) {
    chrome.tts.speak(info.selectionText, {
      lang: 'ru-RU',
      rate: 1.0
    });
  }
}

function AddPiperTTSr(info, tab){
  if (info.selectionText && tab?.id) {
    chrome.tabs.sendMessage(tab.id, {
      action: "speakSelection",
      text: info.selectionText
    }).catch(err => {
      console.warn("Could not send message to tab. Content script might not be loaded yet.", err);
    });
  }
}
