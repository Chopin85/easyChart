const express = require("express");

const dataController = require("../../controllers/DataController");

const router = express.Router();

router.get("/getData", dataController.getData);

module.exports = router;
