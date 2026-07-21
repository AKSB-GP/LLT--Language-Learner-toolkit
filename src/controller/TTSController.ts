import { TTSModel } from '../model/TTSModel';
import { NotificationView } from '../view/NotificationView';
import { DEFAULT_SETTINGS } from '../const';

export class TTSController {
  private model: TTSModel;
  private notificationView: NotificationView;

  constructor(model: TTSModel, notificationView: NotificationView) {
    this.model = model;
    this.notificationView = notificationView;
  }

  async init(): Promise<void> {
    // Pre-warm the model engine in background asynchronously
    this.model.loadEngine().catch(err => console.warn("TTS Pre-warming failed:", err));

    this.setupListeners();
  }

  setupListeners(): void {
    // Relay selected text from right-click context menus
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      if (message.action === "speakSelection" && message.text) {
        this.speak(message.text);
      } else if (message.action === "promptLanguageSelection" && message.word) {
        this.notificationView.promptLanguage(message.word).then((choice) => {
          sendResponse({ language: choice });
        });
        return true; // Keep message channel open for async response
      } else if (message.action === "showDefinition" && message.word && message.definition) {
        this.notificationView.showDefinitionToast(message.word, message.definition, message.pageUrl, message.language);
      } else if (message.action === "showNotification" && message.text) {
        this.notificationView.show(message.toastType || 'playing', message.text, message.duration || 4000);
      }
    });
  }

  async speak(text: string): Promise<void> {
    try {
      const settings = await new Promise<{ piperVoice?: string }>(resolve => {
        chrome.storage.sync.get({ piperVoice: DEFAULT_SETTINGS.piperVoice }, (items) => {
          resolve(items as { piperVoice?: string });
        });
      });
      const voice = settings.piperVoice || DEFAULT_SETTINGS.piperVoice;
      const voiceName = voice.charAt(0).toUpperCase() + voice.slice(1);

      //   Show model loading alert if session is uninitialized
      if (!this.model.session) {
        this.notificationView.show('LOADING', `LOADING VOICE MODEL (${voiceName})...`);
      } else {
        this.notificationView.show('SYNTHESIZING', `SYNTHESIZING "${text}"...`);
      }

      // Explicitly await the loadEngine inside the controller to manage the toast transitions
      await this.model.loadEngine();

      //  Transition toast to processing/synthesizing state
      this.notificationView.show('SYNTHESIZING', `SYNTHESIZING "${text}"...`);

      const wavBuffer = await this.model.synthesize(text);

      //  Transition toast to playing state
      this.notificationView.show('PLAYING', `PLAYING SPEECH FOR "${text}"...`);

      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.addEventListener('ended', () => {
        this.notificationView.dismiss();
      });

      await audio.play();
    } catch (error: any) {
      console.error("SPEECH SYNTHESIS FAILED:", error);
      this.notificationView.show('ERROR', `SYNTHESIS FAILED: ${error.message || error}`, 3000);
    }
  }
}
