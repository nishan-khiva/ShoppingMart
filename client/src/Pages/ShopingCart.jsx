import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import Swal from 'sweetalert2';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity,clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const totalPrice = cartItems.reduce((acc, item) => acc + item.sellprice * item.quantity, 0);
  const gst = totalPrice * 0.02;
  const finalAmount = totalPrice + gst;

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value);
    if (!isNaN(qty) && qty >= 1 && qty <= 50) {
      updateQuantity(id, qty);
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Address',
        text: 'Please enter a delivery address.',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const orderDetails = {
      items: cartItems,
      totalPrice,
      gst,
      finalAmount,
      address,
      contact,
      paymentMethod,
    };

    try {
      const response = await axios.post('https://shoppingmart-u430.onrender.com/api/orders/place', orderDetails);
      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: response.data.message || 'Your order has been placed successfully.',
        timer: 2000,
        showConfirmButton: false
      });

      setAddress('');
      setContact('');
      clearCart();
      setPaymentMethod('Cash on Delivery');

      // Optional: clear cart
      localStorage.removeItem('cartItems');
      // window.location.href = '/'; // or redirect to success page
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div className='px-18 py-6 flex justify-between gap-2 mt-[10vh]'>
      {/* Cart Items List */}
      <div>
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h1>
        <div className='grid grid-cols-3 gap-32 text-gray-500 font-semibold mb-4'>
          <p>Product Details</p>
          <p>Sub Totals</p>
          <p>Action</p>
        </div>
        {cartItems.map(item => (
          <div key={item._id} className='grid grid-cols-3 items-center gap-32 border-b pb-3 mb-3'>
            <div className='flex gap-4 items-center'>
              <img src={`https://shoppingmart-u430.onrender.com/uploads/${item.productimage}`} className='w-16 h-16 object-cover rounded' />
              <div>
                <h3 className='font-semibold text-gray-700'>{item.productname}</h3>
                <div className='flex items-center gap-2 mt-1'>
                  <button
                    className='h-[30px] w-[30px] bg-gray-200 rounded hover:cursor-pointer disabled:opacity-50'
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >-</button>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    className='w-12 text-center border rounded border-gray-300'
                  />
                  <button
                    className='h-[30px] w-[30px] bg-gray-200 rounded hover:cursor-pointer'
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= 50}
                  >+</button>
                </div>
              </div>
            </div>
            <p className='text-gray-800 font-semibold'>₹{(item.sellprice * item.quantity).toFixed(2)}</p>
            <button
              onClick={() => removeFromCart(item._id)}
              className='text-red-500 hover:underline text-sm mr-25'
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className='mr-3 w-[30vw] mt-2'>
        <form onSubmit={handlePlaceOrder} className="max-w-md mx-auto">
          <div className="bg-gray-100 rounded-lg p-4 space-y-4 shadow-lg">
            <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
            <hr />
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Address</label>
              <input
                type="text"
                required
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact No.</label>
              <input
                type="tel"
                required
                placeholder="Only 10 digit no insert"
                value={contact}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value) && value.length <= 10) {
                    setContact(value);
                  }
                }}
                maxLength="10"
                pattern="\d{10}"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              />

            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>
            </div>
            <hr />
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Price</p>
              <p className="text-gray-800 font-semibold">₹{totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">Shipping Fees</p>
              <p className="text-green-600 font-semibold">Free</p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-600">GST (2%)</p>
              <p className="text-gray-800 font-semibold">₹{gst.toFixed(2)}</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <p>Total Amount</p>
              <p>₹{finalAmount.toFixed(2)}</p>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded mt-2 transition duration-300"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShoppingCart;
