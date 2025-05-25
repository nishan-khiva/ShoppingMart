// Imports
import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartContext';
import { useWishlist } from '../Context/WishlistContext';
import api from '../Api/axiosInstance'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import empty from '../assets/emptyOrders.png';
import AddressForm from '../UserProfile/AddressForm';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
const API_URL = import.meta.env.VITE_API_URL;

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [contact, setContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const navigate = useNavigate();

  // Pricing
  const totalPrice = cartItems.reduce((acc, item) => acc + item.sellprice * item.quantity, 0);
  const gst = totalPrice * 0.02;
  const finalAmount = totalPrice + gst;

  // Fetch Address List
  const fetchSavedAddresses = async (selectLast = false, selectedId = null) => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/api/address/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedAddresses(res.data);

      if (res.data.length > 0) {
        if (selectedId) {
          setSelectedAddressId(selectedId);
        }
        else {
          const defaultId = selectLast
            ? res.data[res.data.length - 1]._id
            : res.data[0]._id;
          setSelectedAddressId(defaultId);
        }
      } else {
        setSelectedAddressId('');
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };


  useEffect(() => {
    fetchSavedAddresses();
  }, []);

  useEffect(() => {
    const selected = savedAddresses.find(addr => addr._id === selectedAddressId);
    if (selected) {
      setContact(selected.phoneno);
    }
  }, [selectedAddressId, savedAddresses]);

  // Place Order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const selectedAddress = savedAddresses.find(addr => addr._id === selectedAddressId);

    if (cartItems.length === 0) {
      return Swal.fire('Cart is Empty', 'Add some products.', 'warning');
    }

    if (!selectedAddress) {
      return Swal.fire('Address Missing', 'Please select a delivery address.', 'warning');
    }

    const orderDetails = {
      items: cartItems,
      totalPrice,
      gst,
      finalAmount,
      address: `${selectedAddress.name}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
      contact: selectedAddress.phoneno,
      paymentMethod,
    };

    try {
      const token = localStorage.getItem('token');
      const res = await api.post('/api/orders/place', orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire('Order Placed!', res.data.message || 'Order placed successfully.', 'success');
      clearCart();
      setOrderPlaced(true);
      setContact('');
      localStorage.removeItem('cartItems');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong.', 'error');
    }
  };

  const handleEdit = (addressObj) => {
    setEditData(addressObj);
    setShowForm(true);
  };

  return (
    <div className='relative mt-16'>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[70vh]">
          <h2 className="text-2xl text-gray-500 font-semibold">Your cart is empty.</h2>
          <img src={empty} className='w-[300px] mt-3' />
          <button onClick={() => navigate('/')} className="mt-7 px-6 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-700 transition">
            Shop Now
          </button>
        </div>
      ) : (
        <div className='px-8 py-6 mt-[10vh] flex gap-6'>
          {/* Cart Section */}
          <div className='w-2/3'>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className='grid grid-cols-3 gap-32 font-semibold text-gray-500 mb-4'>
              <p>Product Details</p>
              <p>Sub Totals</p>
              <p>Action</p>
            </div>

            {cartItems.map(item => (
              <div key={item._id} className='grid grid-cols-3 items-center gap-32 border-b pb-3 mb-3'>
                <div className='flex gap-4 items-center'>
                  <img src={`${API_URL}/uploads/${item.productimage}`} className='w-16 h-16 rounded object-cover' />
                  <div>
                    <h3 className='font-semibold'>{item.productname}</h3>
                    <div className='flex items-center gap-2 mt-1'>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className='w-[30px] h-[30px] bg-gray-200 rounded'
                        disabled={item.quantity <= 1 || orderPlaced}
                      >-</button>
                      <input
                        type="number"
                        min="1"
                        max="50"
                        value={item.quantity}
                        onChange={(e) => {
                          let newQty = parseInt(e.target.value);
                          if (newQty >= 1 && newQty <= 50) updateQuantity(item._id, newQty);
                        }}
                        className='w-12 border text-center rounded border-gray-300'
                        disabled={orderPlaced}
                      />
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className='w-[30px] h-[30px] bg-gray-200 rounded'
                        disabled={item.quantity >= 50 || orderPlaced}
                      >+</button>
                    </div>
                  </div>
                </div>
                <p className='font-semibold'>₹{(item.sellprice * item.quantity).toFixed(2)}</p>
                <div className='flex gap-3 items-center'>
                  <button onClick={() => toggleWishlist(item)}>
                    {wishlist[item._id] ? <AiFillHeart size={18} color="red" /> : <AiOutlineHeart size={18} />}
                  </button>
                  {!orderPlaced && (
                    <button onClick={() => removeFromCart(item._id)} className='text-red-500 hover:underline text-sm'>
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className='w-1/3'>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Order Summary</h2>

              {/* Address Section */}
              <div>
                <label className="font-semibold mb-1 block">Delivery Address:</label>
                {savedAddresses.length === 0 ? (
                  <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800">
                    No saved addresses. Please add one.
                    <button
                      type="button"
                      onClick={() => {
                        setEditData(null);
                        setShowForm(true);
                      }}
                      className="mt-2 block text-blue-600 hover:underline"
                    >
                      Add New Address
                    </button>
                  </div>
                ) : (
                  <>
                    <select
                      value={selectedAddressId}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      disabled={orderPlaced}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                    >
                      {savedAddresses.map(addr => (
                        <option key={addr._id} value={addr._id}>
                          {addr.name} - {addr.city}
                        </option>
                      ))}
                    </select>
                    <div className="mt-2 p-2 bg-gray-50 border rounded text-sm">
                      {(() => {
                        const selected = savedAddresses.find(addr => addr._id === selectedAddressId);
                        return selected ? (
                          <>
                            <p><strong>{selected.name}</strong></p>
                            <p>{selected.address}</p>
                            <p>{selected.city}, {selected.state} - {selected.pincode}</p>
                            <p>Phone: {selected.phoneno}</p>
                          </>
                        ) : null;
                      })()}
                    </div>
                    <div className='flex gap-3 text-sm mt-2'>
                      <button type="button" onClick={() => {
                        setEditData(null);
                        setShowForm(true);
                      }} className="text-blue-600 hover:underline">Add New</button>
                      <button type="button" onClick={() => {
                        const current = savedAddresses.find(addr => addr._id === selectedAddressId);
                        if (current) handleEdit(current);
                      }} className="text-blue-600 hover:underline">Edit</button>
                    </div>
                  </>
                )}
              </div>

              {/* Payment */}
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={orderPlaced}
                className="w-full px-3 py-2 border border-gray-300 rounded"
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>

              {/* Products */}
              <div>
                <h3 className="font-bold mb-1">Products:</h3>
                <ul className="text-sm">
                  {cartItems.map((item) => (
                    <li key={item._id}>{item.productname} × {item.quantity} = ₹{(item.sellprice * item.quantity).toFixed(2)}</li>
                  ))}
                </ul>
              </div>

              {/* Totals */}
              <div className='text-right text-sm mt-4'>
                <p>Price: ₹{totalPrice.toFixed(2)}</p>
                <p>GST (2%): ₹{gst.toFixed(2)}</p>
                <p className='font-bold'>Total: ₹{finalAmount.toFixed(2)}</p>
              </div>

              <button type="submit" className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Address Modal */}
      {showForm && (
        <div className='absolute top-0 left-0 w-full h-screen flex justify-center items-start pt-10 z-50'>
          <div className="bg-gray-300 rounded-lg p-7 w-[35vw] relative">
            <button
              className='absolute top-1 right-3 text-lg font-bold'
              onClick={() => {
                setShowForm(false);
                setEditData(null);
              }}
            >
              X
            </button>
            <AddressForm
              show={setShowForm}
              add={(updatedId) => fetchSavedAddresses(false, updatedId)}
              editData={editData}
              setEditData={setEditData}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
