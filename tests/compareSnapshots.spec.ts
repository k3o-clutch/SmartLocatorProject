import { test } from '@playwright/test';
import * as fs from 'fs';

test('Compare Snapshots', async () => {

  
  const baseline = JSON.parse(
    fs.readFileSync(
      'snapshots/baseline/domSnapshot.json',
      'utf8'
    )
  );

  const current = JSON.parse(
    fs.readFileSync(
      'snapshots/current/domSnapshot.json',
      'utf8'
    )
  );

  const baselineTexts = [
  ...new Set(
    baseline
      .map((e: any) => `${e.tag}|${e.text}`)
      .filter(Boolean)
  )
];

const currentTexts = [
  ...new Set(
    current
      .map((e: any) => `${e.tag}|${e.text}`)
      .filter(Boolean)
  )
];

const ignoredTexts = [
  'A|View All',
  'BUTTON|Watch Now',
  'BUTTON|Play'
];

const added = currentTexts.filter(
  (text: string) =>
    !baselineTexts.includes(text) &&
    !ignoredTexts.includes(text)
);

const removed = baselineTexts.filter(
  (text: string) =>
    !currentTexts.includes(text) &&
    !ignoredTexts.includes(text)
);
  console.log('----------------------');
  console.log('Locator Health Report');
  console.log('----------------------');

 console.log("Added Count:", added.length);
console.log("Removed Count:", removed.length);

console.log('\nAdded Elements');
console.log('--------------');
console.log(added);

console.log('\nRemoved Elements');
console.log('----------------');
console.log(removed);
});