const puppeteer = require("puppeteer");
const devices = require("puppeteer/DeviceDescriptors");
const iPhonex = devices["iPad Pro landscape"];

const resultPrix = async ({
  origin,
  destination,
  departureDate,
  returnDate
}) => {
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
  await page.keyboard.type(`${origin}`, { delay: 100 });
  await page.keyboard.press("Enter");

  //DESTINATION
  await page.waitForSelector('input[name="destination"]');
  await page.click('input[name="destination"]');
  await page.focus('input[name="destination"]');
  await page.keyboard.type(`${destination}`, { delay: 100 });
  await page.keyboard.press("Enter");

  //DEPART
  await page.waitForSelector('div[class="outbound-date-picker"]');
  await page.click('div[class="outbound-date-picker"]');
  await page.waitForSelector(`div[data-date="${departureDate}"] > a`);

  await page.evaluate(departureDate => {
    document.querySelector(`div[data-date="${departureDate}"] > a`).click();
  }, departureDate);

  await page.waitFor(1000);

  //RETURN
  await page.evaluate(returnDate => {
    document.querySelector(`div[data-date="${returnDate}"] > a`).click();
  }, returnDate);

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

// const data = {
//   origin: "Parigi Orly (ORY)",
//   destination: "Milano Linate (LIN)",
//   departureDate: "2020-02-06",
//   returnDate: "2020-02-16"
// };

// resultPrix(data);

module.exports = { resultPrix };
