export class NotificationView {
  private activeToast: HTMLDivElement | null = null;
  private activeToastType: string | null = null;
  private lastSelectionRect: { top: number; left: number; width: number; height: number; scrollY: number; scrollX: number } | null = null;

  constructor() {
    this.setupSelectionTracker();
  }

  private setupSelectionTracker(): void {
    const updateRect = () => {
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
    };

    document.addEventListener('selectionchange', updateRect);
    document.addEventListener('mouseup', updateRect);
    document.addEventListener('contextmenu', updateRect);
  }

  /** Resolve the latest selection position, preferring live selection. */
  private getSelectionPosition(): { top: number; left: number; width: number; height: number } {
    let top = 100, left = 100, width = 0, height = 0;
    let found = false;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const liveRect = range.getBoundingClientRect();
      if (liveRect.width > 0 && liveRect.height > 0) {
        top = liveRect.top + window.scrollY;
        left = liveRect.left + window.scrollX;
        width = liveRect.width;
        height = liveRect.height;
        found = true;
      }
    }

    if (!found && this.lastSelectionRect) {
      top = this.lastSelectionRect.top + this.lastSelectionRect.scrollY;
      left = this.lastSelectionRect.left + this.lastSelectionRect.scrollX;
      width = this.lastSelectionRect.width;
      height = this.lastSelectionRect.height;
      found = true;
    }

    return { top, left, width, height };
  }

  /** Position toast above selection (flips below if near top of screen). */
  private positionToast(
    toast: HTMLElement,
    toastWidth: number,
    toastHeight: number,
    pos: { top: number; left: number; width: number; height: number }
  ): void {
    const { top, left, width, height } = pos;

    let toastTop = top - toastHeight - 8;
    let toastLeft = left + width / 2 - toastWidth / 2;

    if (toastTop < window.scrollY + 4) {
      toastTop = top + height + 8;
    }
    toastLeft = Math.max(window.scrollX + 8, toastLeft);
    const maxLeft = window.scrollX + window.innerWidth - toastWidth - 8;
    if (toastLeft > maxLeft) toastLeft = maxLeft;

    toast.style.top = `${toastTop}px`;
    toast.style.left = `${toastLeft}px`;
  }

  // ─── Status / Audio Progress Toast ───────────────────────────────────────
  public show(type: 'LOADING' | 'SYNTHESIZING' | 'PLAYING' | 'ERROR', message: string, duration: number | null = null): void {
    // If progress toast is already active, update in-place to avoid position jump
    if (this.activeToast && this.activeToast.parentNode && this.activeToastType) {
      this.activeToast.className = `tts-toast tts-toast-${type} tts-toast-visible`;
      this.activeToastType = type;

      const textElem = this.activeToast.querySelector('.tts-toast-text');
      if (textElem) textElem.textContent = message;

      if (duration) {
        setTimeout(() => this.dismiss(this.activeToast), duration);
      }
      return;
    }

    if (this.activeToast) {
      this.activeToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `tts-toast tts-toast-${type}`;
    toast.style.position = 'absolute';

    const body = document.createElement('div');
    body.className = 'tts-toast-body';



    const text = document.createElement('span');
    text.className = 'tts-toast-text';
    text.textContent = message;
    body.appendChild(text);

    toast.appendChild(body);
    document.body.appendChild(toast);
    this.activeToast = toast;
    this.activeToastType = type;

    // Anchor exactly at the word selection position
    const pos = this.getSelectionPosition();
    const toastWidth = toast.offsetWidth || 180;
    const toastHeight = toast.offsetHeight || 36;
    this.positionToast(toast, toastWidth, toastHeight, pos);

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
          this.activeToastType = null;
        }
      }, 300);
    }
  }

  // ─── Language Picker Toast ────────────────────────────────────────────────

  public promptLanguage(word: string): Promise<'ENGLISH' | 'SWEDISH' | null> {
    return new Promise((resolve) => {
      const pos = this.getSelectionPosition();

      const toast = document.createElement('div');
      toast.className = 'tts-selection-toast';
      toast.style.position = 'absolute';

      const content = document.createElement('div');
      content.className = 'tts-sel-toast-content';

      const label = document.createElement('span');
      label.className = 'tts-sel-toast-label';
      label.textContent = 'LANG:';
      content.appendChild(label);

      const btnSwedish = document.createElement('button');
      btnSwedish.className = 'tts-sel-toast-btn tts-btn-sv';
      btnSwedish.textContent = 'SWEDISH';
      btnSwedish.addEventListener('click', (e) => {
        e.stopPropagation();
        cleanup('SWEDISH');
      });
      content.appendChild(btnSwedish);

      const btnEnglish = document.createElement('button');
      btnEnglish.className = 'tts-sel-toast-btn tts-btn-en';
      btnEnglish.textContent = 'ENGLISH';
      btnEnglish.addEventListener('click', (e) => {
        e.stopPropagation();
        cleanup('ENGLISH');
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

      const toastWidth = toast.offsetWidth || 210;
      const toastHeight = toast.offsetHeight || 36;
      this.positionToast(toast, toastWidth, toastHeight, pos);

      requestAnimationFrame(() => {
        toast.classList.add('tts-sel-toast-visible');
      });

      const clickOutsideHandler = (e: MouseEvent) => {
        if (!toast.contains(e.target as Node)) {
          cleanup(null);
        }
      };
      document.addEventListener('mousedown', clickOutsideHandler);

      const cleanup = (choice: 'ENGLISH' | 'SWEDISH' | null) => {
        document.removeEventListener('mousedown', clickOutsideHandler);
        toast.classList.remove('tts-sel-toast-visible');
        setTimeout(() => {
          toast.remove();
          resolve(choice);
        }, 150);
      };
    });
  }

  // ─── Definition Card Toast ────────────────────────────────────────────────

  public showDefinitionToast(word: string, definition: string | string[], pageUrl?: string, language?: string): void {
    const pos = this.getSelectionPosition();

    const toast = document.createElement('div');
    toast.className = 'tts-selection-toast';
    toast.style.position = 'absolute';
    toast.style.maxWidth = '360px';

    const content = document.createElement('div');
    content.className = 'tts-sel-toast-content';
    content.style.flexDirection = 'column';
    content.style.alignItems = 'flex-start';
    content.style.gap = '6px';
    content.style.padding = '10px 14px';

    // Header row
    const headerRow = document.createElement('div');
    headerRow.style.cssText = 'display:flex;align-items:baseline;justify-content:space-between;width:100%';

    const titleContainer = document.createElement('div');
    titleContainer.style.cssText = 'display:flex;align-items:baseline;gap:6px';

    const prefixElem = document.createElement('span');
    prefixElem.textContent = '/';
    prefixElem.style.cssText = 'font-size:13px;font-weight:400;color:#999999';
    titleContainer.appendChild(prefixElem);

    const wordElem = document.createElement('strong');
    wordElem.textContent = word;
    wordElem.style.cssText = 'font-size:14px;font-weight:700;letter-spacing:-0.02em;color:#111111';
    titleContainer.appendChild(wordElem);

    if (language) {
      const langBadge = document.createElement('span');
      langBadge.className = 'tts-sel-toast-label';
      langBadge.textContent = `/ ${language}`;
      titleContainer.appendChild(langBadge);
    }
    headerRow.appendChild(titleContainer);

    const btnClose = document.createElement('button');
    btnClose.className = 'tts-sel-toast-close';
    btnClose.textContent = '×';
    btnClose.addEventListener('click', (e) => {
      e.stopPropagation();
      cleanup();
    });
    headerRow.appendChild(btnClose);
    content.appendChild(headerRow);

    // Divider
    const divider = document.createElement('div');
    divider.style.cssText = 'width:100%;height:1px;background:#111111;margin:2px 0';
    content.appendChild(divider);

    // Definition text
    const defElem = document.createElement('div');
    defElem.style.cssText = 'font-size:12px;line-height:1.45;color:#111111;max-height:140px;overflow-y:auto;white-space:pre-wrap;width:100%';
    defElem.textContent = Array.isArray(definition) ? definition.join('\n') : definition;
    content.appendChild(defElem);

    // Read more link
    if (pageUrl) {
      const linkElem = document.createElement('a');
      linkElem.href = pageUrl;
      linkElem.target = '_blank';
      linkElem.rel = 'noopener noreferrer';
      linkElem.textContent = 'READ ON WIKTIONARY ↗';
      linkElem.style.cssText = 'color:#111111;font-size:11px;font-weight:600;margin-top:4px;text-decoration:underline;text-underline-offset:2px';
      linkElem.addEventListener('mouseover', () => linkElem.style.color = '#555555');
      linkElem.addEventListener('mouseout', () => linkElem.style.color = '#111111');
      content.appendChild(linkElem);
    }

    toast.appendChild(content);
    document.body.appendChild(toast);

    const toastWidth = toast.offsetWidth || 300;
    const toastHeight = toast.offsetHeight || 90;
    this.positionToast(toast, toastWidth, toastHeight, pos);

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
      }, 200);
    };
  }
}
