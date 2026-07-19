export class NotificationView {
  private container: HTMLDivElement | null = null;
  private activeToast: HTMLDivElement | null = null;

  constructor() {
    this.createContainer();
  }

  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'tts-notifications-container';
    document.body.appendChild(this.container);
  }

  public show(type: 'loading' | 'synthesizing' | 'playing' | 'error', message: string, duration: number | null = null): void {
    if (this.activeToast) {
      this.activeToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `tts-toast tts-toast-${type}`;

    // Icon block
    const iconContainer = document.createElement('div');
    iconContainer.className = 'tts-toast-icon';
    if (type === 'loading' || type === 'synthesizing') {
      iconContainer.appendChild(this.createSpinnerSVG());
    } else if (type === 'playing') {
      iconContainer.appendChild(this.createWaveSVG());
    } else if (type === 'error') {
      iconContainer.appendChild(this.createWarningSVG());
    }
    toast.appendChild(iconContainer);

    // Text block
    const textContainer = document.createElement('div');
    textContainer.className = 'tts-toast-text';
    textContainer.textContent = message;
    toast.appendChild(textContainer);

    if (this.container) {
      this.container.appendChild(toast);
    }
    this.activeToast = toast;

    // Trigger visual entry transition
    requestAnimationFrame(() => {
      toast.classList.add('tts-toast-visible');
    });

    if (duration) {
      setTimeout(() => {
        this.dismiss(toast);
      }, duration);
    }
  }

  public dismiss(toast: HTMLDivElement | null = null): void {
    const target = toast || this.activeToast;
    if (target) {
      target.classList.remove('tts-toast-visible');
      target.classList.add('tts-toast-fadeout');
      setTimeout(() => {
        target.remove();
        if (this.activeToast === target) {
          this.activeToast = null;
        }
      }, 300);
    }
  }

  private createSpinnerSVG(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 50 50');
    svg.setAttribute('class', 'tts-spinner');

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', '25');
    circle.setAttribute('cy', '25');
    circle.setAttribute('r', '20');
    circle.setAttribute('fill', 'none');
    circle.setAttribute('stroke-width', '5');

    svg.appendChild(circle);
    return svg;
  }

  private createWaveSVG(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'tts-audio-waves');

    for (let i = 1; i <= 3; i++) {
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', String(i * 5 + 1));
      rect.setAttribute('y', '6');
      rect.setAttribute('width', '3');
      rect.setAttribute('height', '12');
      rect.setAttribute('class', `tts-bar tts-bar-${i}`);
      svg.appendChild(rect);
    }
    return svg;
  }

  private createWarningSVG(): SVGSVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('class', 'tts-alert-icon');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z');

    svg.appendChild(path);
    return svg;
  }

  public promptLanguage(word: string): Promise<'english' | 'swedish' | null> {
    return new Promise((resolve) => {
      const overlay = document.createElement('div');
      overlay.className = 'tts-modal-overlay';

      const modal = document.createElement('div');
      modal.className = 'tts-modal-content';

      const title = document.createElement('h3');
      title.className = 'tts-modal-title';
      title.textContent = 'Identify Language';
      modal.appendChild(title);

      const message = document.createElement('p');
      message.className = 'tts-modal-message';
      message.innerHTML = `Is the word <strong class="tts-highlight-word">"${word}"</strong> Swedish or English?`;
      modal.appendChild(message);

      const btnContainer = document.createElement('div');
      btnContainer.className = 'tts-modal-buttons';

      const btnSwedish = document.createElement('button');
      btnSwedish.className = 'tts-modal-btn tts-btn-swedish';
      btnSwedish.textContent = 'Swedish';
      btnSwedish.addEventListener('click', () => {
        cleanup('swedish');
      });

      const btnEnglish = document.createElement('button');
      btnEnglish.className = 'tts-modal-btn tts-btn-english';
      btnEnglish.textContent = 'English';
      btnEnglish.addEventListener('click', () => {
        cleanup('english');
      });

      const btnCancel = document.createElement('button');
      btnCancel.className = 'tts-modal-btn tts-btn-cancel';
      btnCancel.textContent = 'Cancel';
      btnCancel.addEventListener('click', () => {
        cleanup(null);
      });

      btnContainer.appendChild(btnSwedish);
      btnContainer.appendChild(btnEnglish);
      btnContainer.appendChild(btnCancel);
      modal.appendChild(btnContainer);

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      requestAnimationFrame(() => {
        overlay.classList.add('tts-modal-visible');
        modal.classList.add('tts-modal-visible');
      });

      const cleanup = (choice: 'english' | 'swedish' | null) => {
        overlay.classList.remove('tts-modal-visible');
        modal.classList.remove('tts-modal-visible');
        setTimeout(() => {
          overlay.remove();
          resolve(choice);
        }, 300);
      };
    });
  }
}
