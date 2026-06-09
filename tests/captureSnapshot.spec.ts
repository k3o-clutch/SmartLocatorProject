import { test } from '@playwright/test';
import * as fs from 'fs';

test('Capture Website Snapshot', async ({ page }) => {

  await page.goto('https://moviesandtv.myvi.in/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(5000);

  const elements = await page.evaluate(() => {

    return Array.from(document.querySelectorAll('button,a,input,img'))
     .map(el => ({

  tag: el.tagName,

  text: (el.textContent || '')
    .trim()
    .substring(0,100),

  id: el.id,

  className: el.className,

  role: el.getAttribute('role'),

  ariaLabel: el.getAttribute('aria-label'),

  href: el.getAttribute('href')

}));

  });

fs.writeFileSync(
  'snapshots/current/domSnapshot.json',
  JSON.stringify(elements, null, 2)
);

console.log("Snapshot written successfully");
console.log("Elements captured:", elements.length);

});