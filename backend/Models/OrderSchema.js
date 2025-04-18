const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      productname: String,
      productimage: String,
      sellprice: Number,
      quantity: Number,
    }
  ],
  totalPrice: Number,
  gst: Number,
  finalAmount: Number,
  address: String,
  contact: Number,
  paymentMethod: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
