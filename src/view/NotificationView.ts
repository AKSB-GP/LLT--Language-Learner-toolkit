export class NotificationView {
  private container: HTMLDivElement | null = null;
  private activeToast: HTMLDivElement | null = null;
  private lastSelectionRect: { top: number; left: number; width: number; height: number; scrollY: number; scrollX: number } | null = null;

  constructor() {
    this.createContainer();
    this.setupSelectionTracker();
  }

  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'tts-notifications-container';
    document.body.appendChild(this.container);
  }

  private setupSelectionTracker(): void {
    document.addEventListener('selectionchange', () => {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          this.lastSelectionRect = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            scrollY: window.scrollY,
            scrollX: window.scrollX
          };
        }
      }
    });
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
      let top = 100;
      let left = 100;
      let height = 0;
      let width = 0;

      let rect = this.lastSelectionRect;

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const liveRect = range.getBoundingClientRect();
        if (liveRect.width > 0 && liveRect.height > 0) {
          rect = {
            top: liveRect.top,
            left: liveRect.left,
            width: liveRect.width,
            height: liveRect.height,
            scrollY: window.scrollY,
            scrollX: window.scrollX
          };
        }
      }

      if (rect) {
        top = rect.top + rect.scrollY;
        left = rect.left + rect.scrollX;
        width = rect.width;
        height = rect.height;
      }

      const toast = document.createElement('div');
      toast.className = 'tts-selection-toast';
      toast.style.position = 'absolute';

      const content = document.createElement('div');
      content.className = 'tts-sel-toast-content';

      const label = document.createElement('span');
      label.className = 'tts-sel-toast-label';
      label.textContent = 'Lang:';
      content.appendChild(label);

      const btnSwedish = document.createElement('button');
      btnSwedish.className = 'tts-sel-toast-btn tts-btn-sv';
      btnSwedish.textContent = 'Swedish';
      btnSwedish.addEventListener('click', (e) => {
        e.stopPropagation();
        cleanup('swedish');
      });
      content.appendChild(btnSwedish);

      const btnEnglish = document.createElement('button');
      btnEnglish.className = 'tts-sel-toast-btn tts-btn-en';
      btnEnglish.textContent = 'English';
      btnEnglish.addEventListener('click', (e) => {
        e.stopPropagation();
        cleanup('english');
      });
      content.appendChild(btnEnglish);

      const btnClose = document.createElement('button');
      btnClose.className = 'tts-sel-toast-close';
      btnClose.innerHTML = '&times;';
      btnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        cleanup(null);
      });
      content.appendChild(btnClose);

      toast.appendChild(content);
      document.body.appendChild(toast);

      const toastWidth = toast.offsetWidth || 205;
      const toastHeight = toast.offsetHeight || 31;

      toast.style.top = `${top - toastHeight - 8}px`;
      toast.style.left = `${left + width / 2 - toastWidth / 2}px`;

      if (parseFloat(toast.style.top) < 0) {
        toast.style.top = `${top + height + 8}px`;
      }
      if (parseFloat(toast.style.left) < 0) {
        toast.style.left = '8px';
      }

      requestAnimationFrame(() => {
        toast.classList.add('tts-sel-toast-visible');
      });

      const clickOutsideHandler = (e: MouseEvent) => {
        if (!toast.contains(e.target as Node)) {
          cleanup(null);
        }
      };
      document.addEventListener('mousedown', clickOutsideHandler);

      const cleanup = (choice: 'english' | 'swedish' | null) => {
        document.removeEventListener('mousedown', clickOutsideHandler);
        toast.classList.remove('tts-sel-toast-visible');
        setTimeout(() => {
          toast.remove();
          resolve(choice);
        }, 150);
      };
    });
  }
}
