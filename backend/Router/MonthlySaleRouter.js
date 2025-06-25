const express = require("express");
const router = express.Router();
const { getMonthlySales } = require("../Controller/MonthlySales");

// Monthly Sales Route
router.get("/sales/monthly", getMonthlySales);

module.exports = router;
