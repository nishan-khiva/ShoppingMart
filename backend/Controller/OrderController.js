const Order = require('../Models/OrderSchema')

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

    // Format items
    const formattedItems = items.map(item => ({
      productId: item._id,
      productname: item.productname,
      productimage: item.productimage,
      sellprice: item.sellprice,
      quantity: item.quantity,
    }));

    //  Generate custom orderId like ORDER-10001
    const latestOrder = await Order.findOne().sort({ date: -1 });

    let newOrderId = 'ORDER-10001';
    if (latestOrder && latestOrder.orderId) {
      const lastNumber = parseInt(latestOrder.orderId.split('-')[1]);
      newOrderId = `ORDER-${lastNumber + 1}`;
    }

    // Create new order
    const newOrder = new Order({
      orderId: newOrderId, //  custom readable ID
      items: formattedItems,
      totalPrice,
      gst,
      finalAmount,
      address,
      contact,
      paymentMethod,
      userId: req.user._id,  //  From token
      name: req.user.name    // From token/db
    });
    await newOrder.save();
    res.status(201).json({
      message: 'Order placed successfully',
      orderId: newOrder.orderId, // 👈 Return readable orderId
      order: newOrder
    });

  } catch (err) {
    console.error("Order placing failed:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//user ke liye
exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Fetching user orders failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params;
  const { summary } = req.body;
  const order = await Order.findById(orderId);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  if (order.status !== 'Pending') {
    return res.status(400).json({ message: 'Only pending orders can be cancelled' });
  }
  const cancelSummary = {
    status: "Cancelled",
    summary: summary
      && `${summary} (Cancelled by user)`,
    changedAt: new Date()
  };
  order.status = "Cancelled";
  // Initialize actionSummary if undefined
  if (!order.actionSummary) {
    order.actionSummary = [];
  }
  order.actionSummary.push(cancelSummary);
  await order.save();
  res.json({ message: 'Order cancelled successfully', order });
};
exports.getSingleOrder = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId)

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json({ order });
  } catch (err) {
    console.error('Error fetching order:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

//Admin ke liye
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).populate('userId', 'name email');
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Fetching orders failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//   const { orderId } = req.params; // Order ID from the URL
//   const { status } = req.body;
//   const {summary}= req.body; // New status from the body

//   // Validate the status
//   if (!status || !['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].includes(status)) {
//     return res.status(400).json({ error: 'Invalid status value' });
//   }
//   try {
//     const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' });
//     }
//     res.status(200).json({
//       message: 'Order status updated successfully',
//       order: order
//     });
//   } catch (error) {
//     console.error("Error updating order status:", error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { status, summary, emplyName } = req.body;
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Push new summary into actionSummary array
    order.actionSummary.push({
      status,
      summary,
      emplyName,
      changedAt: new Date()
    });

    // Also update the current status and summary
    order.status = status;
    order.summary = summary;
    order.emplyName = emplyName
    await order.save();

    res.status(200).json({ message: 'Order status updated with summary successfully', order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: 'Server error' });
  }
};