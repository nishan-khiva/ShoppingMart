const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },

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
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserDetails', required: true },
  name: {
    type: String,
    ref: 'UserDetails',
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending' // Default status is Pending
  },

  actionSummary: [
    {
      status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        required: true
      },
      summary: {
        type: String,
        required: true
      },
      emplyName: {
        type: String,
      },
      changedAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
