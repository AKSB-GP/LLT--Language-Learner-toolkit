import { listOfContextMenus } from "./const";
import { eld } from "eld/extrasmall";
import { ChromeAddListenerForOnInstall, ChromeONClickedContextMenu } from "./utils/chrome";
import { CreateContextMenus, handleAction, getSelectedTextFromTab } from "./utils/lltFunctions";
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
