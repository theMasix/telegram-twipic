const puppeteer = require('puppeteer');

const url = `file://${__dirname}/page/index.html`;
const takeShot = {};

takeShot.take = (imageName) => {
  try {
    return new Promise(async (res, rej) => {
      const browser = await puppeteer.launch();
      // const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.setViewport({ width: 540, height: 960 });

      console.log(__dirname);
      console.log(url);
      await page.goto(url);
      await page.screenshot({ path: imageName });

      await browser.close();

      res();
    });
  } catch (e) {
    rej('Error Occured in takeShot lib');
  }
};

module.exports = takeShot;
