import { TTSModel } from './model/TTSModel';
import { NotificationView } from './view/NotificationView';
import { TTSController } from './controller/TTSController';

// Load model, view and contrller
const startApplication = () => {
  const model = new TTSModel();
  const notificationView = new NotificationView();
  const controller = new TTSController(model, notificationView);
  controller.init();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startApplication);
} else {
  startApplication();
}
