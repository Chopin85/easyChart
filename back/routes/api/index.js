const express = require("express");

const PriceRoutes = require("./PriceRoutes");

let router = express.Router();

router.use("/price", PriceRoutes);

module.exports = router;
