const express = require("express");

const PriceRoutes = require("./PriceRoutes");
const CronRoutes = require("./CronRoutes");
const DataRoutes = require("./DataRoute");

let router = express.Router();

router.use("/price", PriceRoutes);
router.use("/cron", CronRoutes);
router.use("/data", DataRoutes);

module.exports = router;
