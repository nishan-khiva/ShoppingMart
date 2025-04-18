const Order = require('../Models/OrderSchema');

exports.placeOrder = async (req, res) => {
  try {
    const {
      items,
      totalPrice,
      gst,
      finalAmount,
      address,
      contact,
      paymentMethod,
    } = req.body;

    const formattedItems = items.map(item => ({
      productId: item._id,
      productname: item.productname,
      productimage: item.productimage,
      sellprice: item.sellprice,
      quantity: item.quantity,
    }));

    const newOrder = new Order({
      items: formattedItems,
      totalPrice,
      gst,
      finalAmount,
      address,
      contact,
      paymentMethod,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: newOrder._id });
  } catch (err) {
    console.error("Order placing failed:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find().sort({ createdAt: -1 }); // latest first
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch orders' });
    }
  };