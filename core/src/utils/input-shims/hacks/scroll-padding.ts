import { findClosestIonContent } from '../../content';

const PADDING_TIMER_KEY = '$ionPaddingTimer';

export const enableScrollPadding = (keyboardHeight: number) => {
  const doc = document;

  const onFocusin = (ev: any) => {
    setScrollPadding(ev.target, keyboardHeight);
  };
  const onFocusout = (ev: any) => {
    setScrollPadding(ev.target, 0);
  };

  doc.addEventListener('focusin', onFocusin);
  doc.addEventListener('focusout', onFocusout);

  return () => {
    doc.removeEventListener('focusin', onFocusin);
    doc.removeEventListener('focusout', onFocusout);
  };
};

const setScrollPadding = (input: HTMLElement, keyboardHeight: number) => {
  // 3. add logic to determine if padding should be added via getResizeMode

  if (input.tagName !== 'INPUT' && input.tagName !== 'TEXTAREA') {
    return;
  }
  if (input.parentElement?.parentElement?.tagName === 'ION-SEARCHBAR') {
    return;
  }

  const el = findClosestIonContent(input);
  if (el === null) {
    return;
  }
  const timer = (el as any)[PADDING_TIMER_KEY];
  if (timer) {
    clearTimeout(timer);
  }

  if (keyboardHeight > 0) {
    el.style.setProperty('--keyboard-offset', `${keyboardHeight}px`);
  } else {
    (el as any)[PADDING_TIMER_KEY] = setTimeout(() => {
      el.style.setProperty('--keyboard-offset', '0px');
    }, 120);
  }
};
