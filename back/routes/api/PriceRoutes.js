const express = require("express");

const priceController = require("../../controllers/PriceController");

const router = express.Router();

router.get("/getAll", priceController.getPrice);
router.delete("/clear", priceController.clearPrice);
// router.post("/add", priceController.addPrice);

module.exports = router;
