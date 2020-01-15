const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const iPhonex = devices["iPad Pro landscape"];

const resultPrix = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.emulate(iPhonex);
  await page.goto("https://www.easyjet.com/it");
  //ORIGIN
  await page.waitForSelector('input[name="origin"]');
  await page.click('input[name="origin"]');
  await page.focus('input[name="origin"]');
  await page.keyboard.type("Parigi Orly (ORY)", { delay: 100 });
  await page.keyboard.press("Enter");

  //DESTINATION
  await page.waitForSelector('input[name="destination"]');
  await page.click('input[name="destination"]');
  await page.focus('input[name="destination"]');
  await page.keyboard.type("Milano Linate (LIN)", { delay: 100 });
  await page.keyboard.press("Enter");

  //DEPART
  await page.waitForSelector('div[class="outbound-date-picker"]');
  await page.click('div[class="outbound-date-picker"]');
  await page.waitForSelector('div[data-date="2020-02-06"] > a');

  await page.evaluate(() => {
    document.querySelector('div[data-date="2020-02-06"] > a').click();
  });

  await page.waitFor(1000);

  await page.evaluate(() => {
    document.querySelector('div[data-date="2020-02-16"] > a').click();
  });

  await page.waitFor(2000);

  await page.waitForSelector(
    'button[class="ej-button rounded-corners arrow-button search-submit"]'
  );

  await page.$eval(
    'button[class="ej-button rounded-corners arrow-button search-submit"]',
    elem => elem.click()
  );

  await page.waitForSelector(
    'div[class="flight-grid-slider"] > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > ul > li > div > div > div > button > span:nth-child(2) > span:nth-child(2) > span:nth-child(4) > span'
  );

  const targetPrix = await page.evaluate(() => {
    return {
      departurePrix: document.querySelectorAll(
        'span[class="price price-eur"]'
      )[1].innerText,
      returnPrix: document.querySelectorAll('span[class="price price-eur"]')[4]
        .innerText
    };
  });
  // console.log(targetPrix);

  browser.close();
  return targetPrix;
};

// resultPrix();

module.exports = { resultPrix };
