const cronService = require("../service/cronService");

const startCron = async (req, res) => {
  cronService.startCron(req.query);

  res.status(200).send({
    success: true,
    data: "ok"
  });
};

const stopCron = async (req, res) => {
  cronService.stopCron();

  res.status(200).send({
    success: true,
    data: "ok"
  });
};

module.exports = {
  startCron,
  stopCron
};
