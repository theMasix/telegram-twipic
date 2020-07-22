const puppeteer = require('puppeteer');

const url = `file://${__dirname}/page/index.html`;

const takeShot = {};

takeShot.take = (imageName, deviceScaleFactor = 3) => {
  const imagePath = `${__dirname}/screenshots/${imageName}`;

  return new Promise(async (res, rej) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({
        width: 540,
        height: 960,
        deviceScaleFactor: deviceScaleFactor,
      });
      await page.goto(url, {
        // Wait until fully load
        waitUntil: ['load'],
      });

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

module.exports = takeShot;
