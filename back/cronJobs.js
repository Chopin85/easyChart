const CronJob = require("cron").CronJob;
const moment = require("moment");
const CronTime = require("cron").CronTime;

const priceService = require("./service/priceService");

// const job = new CronJob("* */1 * * *", function() {
//   const d = moment().format();
//   priceService.addPrice(d);
// });

let data = null;

const returnData = () => {
  return data;
};

const job = new CronJob(`*/1 * * * * *`, () => {
  const d = moment().format();
  priceService.addPrice(d, data);

  console.log("ok", d, data.sec);
});

const startJob = d => {
  console.log("start");
  data = d;
  job.setTime(new CronTime(`*/${d.sec} * * * * *`));
  job.start();
};

const stopJob = () => {
  console.log("stop");
  job.stop();
};

module.exports = { startJob, stopJob, returnData };
