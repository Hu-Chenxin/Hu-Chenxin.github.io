import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://localhost:4173/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--hide-scrollbars', '--disable-gpu'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3500));

const total = await page.evaluate(() => document.body.scrollHeight);
console.log('page height', total);

for (const [name, y] of [['top', 0], ['transition', 620], ['title', 900]]) {
  await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), y);
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: `shot-${name}.png` });
  console.log('shot', name, y);
}

await browser.close();
