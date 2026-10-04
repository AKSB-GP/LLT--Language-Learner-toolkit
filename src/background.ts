import {
  ContextMenu,
  RussianWordAPIResponse,
  WordAPIResponse,
  WordAPIResponseFailed,
} from "./interfaces";
import {
  listOfContextMenus,
  LANGUAGE_CODES,
  DEFAULT_SETTINGS,
  RUSSIAN_GENDER_LIST,
  RUSSIAN_ANIMACY_LIST,
  RUSSIAN_CASE_LIST,
  RUSSIAN_NUMBER_LIST,
} from "./const";
import { eld } from "eld/extrasmall";
import { DatabaseModel } from "./model/DatabaseModel";
import { GoogleTranslatorModel } from "./model/GoogleTranslatorModel";
import { SendChromeMessage, CreateChromeTabMessage, ChromeAddListenerForOnInstall, ChromeONClickedContextMenu } from "./utils/chrome";
import { CreateContextMenus, handleAction, getSelectedTextFromTab } from "./utils/lltFunctions";

const dbModel = new DatabaseModel();
const googleTranslatorModel = new GoogleTranslatorModel();
// set eld subsets as to avoid as most languages wont be used
//eld is an word classifier
eld.setLanguageSubset(["en", "sv"]);
/**
 * Listener to register context menus on installation.
 */

ChromeAddListenerForOnInstall(() => {
  CreateContextMenus(listOfContextMenus);
});

/**
 * Listener to route context menu click actions to their corresponding handlers.
 */
ChromeONClickedContextMenu((info, tab) => {
  if (info.selectionText) {
    handleAction(info.menuItemId as string, info.selectionText, tab);
  }
});



/**
 * Listener for keyboard commands defined in manifest.json.
 */
chrome.commands.onCommand.addListener(async (command, tab) => {
  console.log(`Command "${command}" triggered`);
  if (tab?.id) {
    const selectionText = await getSelectedTextFromTab(tab.id);
    if (selectionText) {
      handleAction(command, selectionText, tab);
    }
  }
});
