const express = require("express");

const cronController = require("../../controllers/CronController");

const router = express.Router();

router.get("/start", cronController.startCron);
router.get("/stop", cronController.stopCron);

module.exports = router;
