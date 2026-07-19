import { TTSModel } from '../model/TTSModel';
import { NotificationView } from '../view/NotificationView';

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
      }
    });
  }

  async speak(text: string): Promise<void> {
    try {
      const settings = await new Promise<{ piperVoice?: string }>(resolve => {
        chrome.storage.sync.get({ piperVoice: 'irina' }, (items) => {
          resolve(items as { piperVoice?: string });
        });
      });
      const voice = settings.piperVoice || 'irina';
      const voiceName = voice.charAt(0).toUpperCase() + voice.slice(1);

      // 1. Show model loading alert if session is uninitialized
      if (!this.model.session) {
        this.notificationView.show('loading', `Loading voice model (${voiceName})...`);
      } else {
        this.notificationView.show('synthesizing', `Synthesizing "${text}"...`);
      }

      // Explicitly await the loadEngine inside the controller to manage the toast transitions
      await this.model.loadEngine();

      // 2. Transition toast to processing/synthesizing state
      this.notificationView.show('synthesizing', `Synthesizing "${text}"...`);

      const wavBuffer = await this.model.synthesize(text);

      // 3. Transition toast to playing state
      this.notificationView.show('playing', `Playing speech for "${text}"...`);

      const blob = new Blob([wavBuffer], { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);

      audio.addEventListener('ended', () => {
        this.notificationView.dismiss();
      });

      await audio.play();
    } catch (error: any) {
      console.error("Speech synthesis failed:", error);
      this.notificationView.show('error', `Synthesis failed: ${error.message || error}`, 3000);
    }
  }
}
