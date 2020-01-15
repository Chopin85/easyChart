const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const CronJob = require("cron").CronJob;
const moment = require("moment");
const priceService = require("./service/priceService");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

routes.init(app);

// const job = new CronJob("*/1 * * * *", function() {
const d = moment().format();
priceService.addPrice(d);
// });
// job.start();

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
