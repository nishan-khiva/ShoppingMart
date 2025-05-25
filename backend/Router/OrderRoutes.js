const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middleware/Auth');

const { placeOrder, getMyOrders,getAllOrders,updateOrderStatus,cancelOrder,getSingleOrder, getOrderById} = require('../Controller/OrderController');

router.post('/place', verifyToken, placeOrder);
router.get('/oder-list',verifyToken, getMyOrders);
router.put('/cancel-order/:orderId',verifyToken, cancelOrder);
router.get('/oder/:orderId',verifyToken, getSingleOrder);
//Admin 
router.get('/all-oder', getAllOrders);
router.get('/adminorder/:orderId', getOrderById)
router.put('/update-status/:orderId', updateOrderStatus);

module.exports = router;
