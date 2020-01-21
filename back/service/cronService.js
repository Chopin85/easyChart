const { startJob, stopJob } = require("../cronJobs");

// const CronTime = require("cron").CronTime;

const startCron = data => {
  startJob(data);
};

const stopCron = () => {
  stopJob();
};

// const setCron = time => {
//   job.setTime(new CronTime(`*/${time.time} * * * * *`));
//   job.start();
// };

module.exports = {
  startCron,
  stopCron
};
