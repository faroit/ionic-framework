import { expect } from '@playwright/test';
import { test } from '@utils/test/playwright';

test.describe('scroll-padding', () => {
  test.beforeEach(async ({ page, skip }) => {
    skip.rtl();
    skip.mode('md', 'Scroll padding is only needed for iOS');
    skip.browser((browserName: string) => browserName !== 'webkit', 'Scroll padding is only needed for iOS');

    await page.goto('/src/utils/input-shims/hacks/test/scroll-padding');
  });
  test.describe('scroll-padding: ion-input', () => {
    test('should not add scroll padding for ion-input above keyboard', async ({ page }) => {
      const input = page.locator('#input-above-keyboard');
      const content = page.locator('ion-content');
      await input.click();

      await expect(input.locator('input')).toBeFocused();

      await expect(content).toHaveCSS('--keyboard-offset', '0px');
    });

    test('should add scroll padding for ion-input below keyboard', async ({ page }) => {
      const input = page.locator('#input-below-keyboard');
      const content = page.locator('ion-content');
      await input.click();

      await expect(input.locator('input')).toBeFocused();

      await expect(content).toHaveCSS('--keyboard-offset', '290px');
    });

    test('should add scroll padding for ion-input outside viewport', async ({ page }) => {
      const input = page.locator('#input-outside-viewport');
      const content = page.locator('ion-content');
      await input.click();

      await expect(input.locator('input')).toBeFocused();

      await expect(content).toHaveCSS('--keyboard-offset', '290px');
    });
  });
  test.describe('scroll-padding: ion-textarea', () => {
    test('should not add scroll padding for ion-textarea above keyboard', async ({ page }) => {
      const input = page.locator('#textarea-above-keyboard');
      const content = page.locator('ion-content');
      await input.click();

      await expect(input.locator('textarea')).toBeFocused();

      await expect(content).toHaveCSS('--keyboard-offset', '0px');
    });

    test('should add scroll padding for ion-textarea below keyboard', async ({ page }) => {
      const input = page.locator('#textarea-below-keyboard');
      const content = page.locator('ion-content');
      await input.click();

      await expect(input.locator('textarea')).toBeFocused();

      await expect(content).toHaveCSS('--keyboard-offset', '290px');
    });

    test('should add scroll padding for ion-textarea outside viewport', async ({ page }) => {
      const input = page.locator('#textarea-outside-viewport');
      const content = page.locator('ion-content');
      await input.click();

      await expect(input.locator('textarea')).toBeFocused();

      await expect(content).toHaveCSS('--keyboard-offset', '290px');
    });
  });
});
