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

  public showDefinitionToast(word: string, definition: string | string[], pageUrl?: string, language?: string): void {
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
    toast.style.maxWidth = '360px';

    const content = document.createElement('div');
    content.className = 'tts-sel-toast-content';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'flex-start';
    content.style.gap = '4px';
    content.style.padding = '8px 12px';

    // Header row
    const headerRow = document.createElement('div');
    headerRow.style.display = 'flex';
    headerRow.style.alignItems = 'center';
    headerRow.style.justifyContent = 'space-between';
    headerRow.style.width = '100%';

    const titleContainer = document.createElement('div');
    titleContainer.style.display = 'flex';
    titleContainer.style.alignItems = 'center';
    titleContainer.style.gap = '6px';

    const wordElem = document.createElement('strong');
    wordElem.textContent = word;
    titleContainer.appendChild(wordElem);

    if (language) {
      const langBadge = document.createElement('span');
      langBadge.className = 'tts-sel-toast-label';
      langBadge.textContent = `(${language})`;
      langBadge.style.fontSize = '10px';
      titleContainer.appendChild(langBadge);
    }
    headerRow.appendChild(titleContainer);

    const btnClose = document.createElement('button');
    btnClose.className = 'tts-sel-toast-close';
    btnClose.textContent = '✕';
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      cleanup();
    });
    headerRow.appendChild(btnClose);
    content.appendChild(headerRow);

    // Definition text
    const defElem = document.createElement('div');
    defElem.style.fontSize = '11px';
    defElem.style.lineHeight = '1.4';
    defElem.style.color = '#e0e0e0';
    defElem.style.maxHeight = '140px';
    defElem.style.overflowY = 'auto';
    defElem.style.whiteSpace = 'pre-wrap';
    defElem.textContent = Array.isArray(definition) ? definition.join('\n') : definition;
    content.appendChild(defElem);

    // Read more link
    if (pageUrl) {
      const linkElem = document.createElement('a');
      linkElem.href = pageUrl;
      linkElem.target = '_blank';
      linkElem.rel = 'noopener noreferrer';
      linkElem.textContent = 'Read on Wiktionary →';
      linkElem.style.color = '#4a90e2';
      linkElem.style.fontSize = '11px';
      linkElem.style.marginTop = '2px';
      linkElem.style.textDecoration = 'none';
      linkElem.addEventListener('mouseover', () => linkElem.style.textDecoration = 'underline');
      linkElem.addEventListener('mouseout', () => linkElem.style.textDecoration = 'none');
      content.appendChild(linkElem);
    }

    toast.appendChild(content);
    document.body.appendChild(toast);

    const toastWidth = toast.offsetWidth || 300;
    const toastHeight = toast.offsetHeight || 80;

    toast.style.top = `${top - toastHeight - 8}px`;
    toast.style.left = `${Math.max(8, left + width / 2 - toastWidth / 2)}px`;

    if (parseFloat(toast.style.top) < 0) {
      toast.style.top = `${top + height + 8}px`;
    }

    requestAnimationFrame(() => {
      toast.classList.add('tts-sel-toast-visible');
    });

    const clickOutsideHandler = (e: MouseEvent) => {
      if (!toast.contains(e.target as Node)) {
        cleanup();
      }
    };
    setTimeout(() => {
      document.addEventListener('mousedown', clickOutsideHandler);
    }, 100);

    const cleanup = () => {
      document.removeEventListener('mousedown', clickOutsideHandler);
      toast.classList.remove('tts-sel-toast-visible');
      setTimeout(() => {
        toast.remove();
      }, 150);
    };
  }
}
