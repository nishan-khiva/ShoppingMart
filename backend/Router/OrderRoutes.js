const express = require('express');
const router = express.Router();
const { placeOrder, getAllOrders } = require('../Controller/OrderController');

router.post('/place', placeOrder);
router.get('/oder-list', getAllOrders)

module.exports = router;
