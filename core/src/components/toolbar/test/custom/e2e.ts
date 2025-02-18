import { newE2EPage } from '@stencil/core/testing';

test('toolbar: custom', async () => {
  const page = await newE2EPage({
    url: '/src/components/toolbar/test/custom?ionic:_testing=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});

test('toolbar:rtl: custom', async () => {
  const page = await newE2EPage({
    url: '/src/components/toolbar/test/custom?ionic:_testing=true&rtl=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});
