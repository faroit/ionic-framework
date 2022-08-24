import { findClosestIonContent } from '../../content';

const PADDING_TIMER_KEY = '$ionPaddingTimer';

/**
 * Scroll padding adds additional padding to the bottom
 * of ion-content so that there is enough scroll space
 * for an input to be scrolled above the keyboard. This
 * is needed in environments where the webview does not
 * resize when the keyboard opens.
 *
 * Example: If an input at the bottom of ion-content is
 * focused, there is no additional scrolling space below
 * it, so the input cannot be scrolled above the keyboard.
 * Scroll padding fixes this by adding padding equal to the
 * height of the keyboard to the bottom of the content.
 *
 * Common environments where this is needed:
 * - Mobile Safari: The keyboard overlays the content
 * - Capacitor/Cordova on iOS: The keyboard overlays the content
 * when the KeyboardResize mode is set to 'none'.
 */
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
  // optional: enhance scroll padding to only add the space necessary (instead of the keyboard height)

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

  if (!needsScrollPadding(input, keyboardHeight)) {
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

/**
 * Determines whether or not an app needs
 * additional padding on the bottom of the content
 * for an input to be scrolled above the on-screen keyboard.
 * This is done by a) looking at the input position relative
 * to the keyboard and b) looking at the webview resize mode (if known).
 */
const needsScrollPadding = (input: HTMLElement, keyboardHeight: number) => {
  // check if input is above the keyboard.
  // If it is, then scroll assist will not fire and we return false.
  // otherwise check if we know the capacitor resize mode via Keyboard
  // If we do not, then return true
  // If we do, check the resize mode
  // If 'none' then return true
  // Otherwise return 'false'


  return true;
}
