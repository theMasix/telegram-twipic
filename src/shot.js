const puppeteer = require('puppeteer');

const url = `file://${__dirname}/index.html`;

(async () => {
  const browser = await puppeteer.launch();
  // const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 540, height: 960 });

  await page.goto(url);
  await page.screenshot({ path: '1.png' });

  await browser.close();
})();
