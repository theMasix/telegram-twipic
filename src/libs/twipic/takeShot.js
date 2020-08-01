const puppeteer = require('puppeteer');

const takeShot = {};

takeShot.take = (imagePath, data = {}, deviceScaleFactor = 3) => {
  const url = takeShot.prepareURL(data);

  return new Promise(async (res, rej) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: 540,
        height: 960,
        deviceScaleFactor: deviceScaleFactor,
      });
      await page.goto(url);
      // Waiting for fonts to load
      await page.evaluateHandle('document.fonts.ready');

      await page.screenshot({ path: imagePath });
      await browser.close();

      res();
    } catch (e) {
      console.log('Error Occured in takeShot lib');
      console.log(e.message);
      rej(e);
    }
  });
};

takeShot.prepareURL = (data) => {
  let url = `file://${__dirname}/page/index.html`;

  for (key of Object.keys(data)) {
    const prefix = Object.keys(data).indexOf(key) == 0 ? '?' : '&';

    if (key == 'body') data[key] = encodeURIComponent(data[key]);

    url += `${prefix}${key}=${data[key]}`;
  }
  console.log(url);
  return url;
};

module.exports = takeShot;
