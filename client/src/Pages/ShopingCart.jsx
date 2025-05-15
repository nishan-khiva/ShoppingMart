// import React, { useState } from 'react';
// import { useCart } from '../Context/CartContext';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const ShoppingCart = () => {
//   const { cartItems, removeFromCart, updateQuantity,clearCart } = useCart();
//   const [address, setAddress] = useState('');
//   const [contact, setContact] = useState('');
//   const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.sellprice * item.quantity, 0);
//   const gst = totalPrice * 0.02;
//   const finalAmount = totalPrice + gst;

//   const handleQuantityChange = (id, value) => {
//     const qty = parseInt(value);
//     if (!isNaN(qty) && qty >= 1 && qty <= 50) {
//       updateQuantity(id, qty);
//     }
//   };

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     if (!address.trim()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Address',
//         text: 'Please enter a delivery address.',
//         timer: 2000,
//         showConfirmButton: false
//       });
//       return;
//     }

//     const orderDetails = {
//       items: cartItems,
//       totalPrice,
//       gst,
//       finalAmount,
//       address,
//       contact,
//       paymentMethod,
//     };

//     try {
//       const response = await axios.post('https://shoppingmart-u430.onrender.com/api/orders/place', orderDetails);
//       Swal.fire({
//         icon: 'success',
//         title: 'Order Placed!',
//         text: response.data.message || 'Your order has been placed successfully.',
//         timer: 2000,
//         showConfirmButton: false
//       });

//       setAddress('');
//       setContact('');
//       clearCart();
//       setPaymentMethod('Cash on Delivery');

//       // Optional: clear cart
//       localStorage.removeItem('cartItems');
//       // window.location.href = '/'; // or redirect to success page
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Something went wrong.',
//         showConfirmButton: false,
//         timer: 2000
//       });
//     }
//   };

//   return (
//     <div className='px-18 py-6 flex justify-between gap-2 mt-[10vh]'>
//       {/* Cart Items List */}
//       <div>
//         <h1 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h1>
//         <div className='grid grid-cols-3 gap-32 text-gray-500 font-semibold mb-4'>
//           <p>Product Details</p>
//           <p>Sub Totals</p>
//           <p>Action</p>
//         </div>
//         {cartItems.map(item => (
//           <div key={item._id} className='grid grid-cols-3 items-center gap-32 border-b pb-3 mb-3'>
//             <div className='flex gap-4 items-center'>
//               <img src={`https://shoppingmart-u430.onrender.com/uploads/${item.productimage}`} className='w-16 h-16 object-cover rounded' />
//               <div>
//                 <h3 className='font-semibold text-gray-700'>{item.productname}</h3>
//                 <div className='flex items-center gap-2 mt-1'>
//                   <button
//                     className='h-[30px] w-[30px] bg-gray-200 rounded hover:cursor-pointer disabled:opacity-50'
//                     onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                     disabled={item.quantity <= 1}
//                   >-</button>
//                   <input
//                     type="number"
//                     min="1"
//                     max="50"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(item._id, e.target.value)}
//                     className='w-12 text-center border rounded border-gray-300'
//                   />
//                   <button
//                     className='h-[30px] w-[30px] bg-gray-200 rounded hover:cursor-pointer'
//                     onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                     disabled={item.quantity >= 50}
//                   >+</button>
//                 </div>
//               </div>
//             </div>
//             <p className='text-gray-800 font-semibold'>₹{(item.sellprice * item.quantity).toFixed(2)}</p>
//             <button
//               onClick={() => removeFromCart(item._id)}
//               className='text-red-500 hover:underline text-sm mr-25'
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Order Summary */}
//       <div className='mr-3 w-[30vw] mt-2'>
//         <form onSubmit={handlePlaceOrder} className="max-w-md mx-auto">
//           <div className="bg-gray-100 rounded-lg p-4 space-y-4 shadow-lg">
//             <h2 className="text-lg font-semibold text-gray-700">Order Summary</h2>
//             <hr />
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Delivery Address</label>
//               <input
//                 type="text"
//                 required
//                 placeholder="Enter your address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Contact No.</label>
//               <input
//                 type="tel"
//                 required
//                 placeholder="Only 10 digit no insert"
//                 value={contact}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   if (/^\d*$/.test(value) && value.length <= 10) {
//                     setContact(value);
//                   }
//                 }}
//                 maxLength="10"
//                 pattern="\d{10}"
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               />

//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
//               <select
//                 value={paymentMethod}
//                 onChange={(e) => setPaymentMethod(e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
//               >
//                 <option value="Cash on Delivery">Cash on Delivery</option>
//                 <option value="Online Payment">Online Payment</option>
//               </select>
//             </div>
//             <hr />
//             <div className="flex justify-between text-sm">
//               <p className="text-gray-600">Price</p>
//               <p className="text-gray-800 font-semibold">₹{totalPrice.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between text-sm">
//               <p className="text-gray-600">Shipping Fees</p>
//               <p className="text-green-600 font-semibold">Free</p>
//             </div>
//             <div className="flex justify-between text-sm">
//               <p className="text-gray-600">GST (2%)</p>
//               <p className="text-gray-800 font-semibold">₹{gst.toFixed(2)}</p>
//             </div>
//             <div className="flex justify-between font-bold text-lg">
//               <p>Total Amount</p>
//               <p>₹{finalAmount.toFixed(2)}</p>
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded mt-2 transition duration-300"
//             >
//               Place Order
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;


import React, { useEffect, useState } from 'react';
import { useCart } from '../Context/CartContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import empty from '../assets/emptyOrders.png'
import AddressForm from '../UserProfile/AddressForm';
import { useWishlist } from '../Context/WishlistContext';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [contact, setContact] = useState();
  const [selectedAddressId, setSelectedAddressId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showform, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null)
  const { wishlist, toggleWishlist } = useWishlist();

  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.sellprice * item.quantity, 0);
  const gst = totalPrice * 0.02;
  const finalAmount = totalPrice + gst;

  const fetchSavedAddresses = async (selectLast = false) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://shoppingmart-u430.onrender.com/api/address/my', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedAddresses(res.data);
      if (res.data.length > 0) {
        if (selectLast) {
          setSelectedAddressId(res.data[res.data.length - 1]._id);
        } else {
          setSelectedAddressId((prev) => prev || res.data[0]._id);
        }
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };
  useEffect(() => {
    fetchSavedAddresses();
  }, []);
  //Address List
  useEffect(() => {
    const selectedAddress = savedAddresses.find((addr) => addr._id === selectedAddressId);
    if (selectedAddress) {
      setContact(selectedAddress.phoneno);
    }
  }, [selectedAddressId, savedAddresses]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    //  Find the selected address object
    const selectedAddress = savedAddresses.find((addr) => addr._id === selectedAddressId);

    // Validation: Cart empty
    if (cartItems.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Cart is Empty',
        text: 'Please add some products before placing an order.',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    // Validation: Address not selected
    if (!selectedAddress) {
      Swal.fire({
        icon: 'warning',
        title: 'Address Missing',
        text: 'Please select a delivery address.',
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    //  Prepare order data
    const orderDetails = {
      items: cartItems,
      totalPrice,
      gst,
      finalAmount,
      address: `${selectedAddress.name}, ${selectedAddress.address}, ${selectedAddress.city}, ${selectedAddress.state} - ${selectedAddress.pincode}`,
      contact: selectedAddress.phoneno,
      paymentMethod,
    };

    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('https://shoppingmart-u430.onrender.com/api/orders/place', orderDetails, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: 'success',
        title: 'Order Placed!',
        text: response.data.message || 'Your order has been placed successfully.',
        timer: 2000,
        showConfirmButton: false,
      });

      //  Reset states
      clearCart();
      setContact('');
      setOrderPlaced(true);
      localStorage.removeItem('cartItems');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong.',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const formedit = (addressObj) => {
    setShowForm(true)
    setEditData(addressObj);

  }

  //wishlist ke liye
  const toggleLike = (productId) => {
    setLikedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };


  return (
    <div className='relative'>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-[70vh] mt-18">
          <h2 className="text-2xl text-gray-500 font-semibold">Your cart is empty.</h2>
          <div><img src={empty} className='w-[300px] mt-3' /></div>
          <button onClick={(e) => {
            e.stopPropagation();
            navigate('/');
          }}
            className="px-6 py-2 bg-green-500 rounded-2xl ml-7 mt-7 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-semibold"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className='px-8 py-6 mt-[10vh] flex gap-6'>
          {/* Cart Section */}
          <div className='w-2/3'>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Shopping Cart</h1>
            <div className='grid grid-cols-3 gap-32 text-gray-500 font-semibold mb-4'>
              <p>Product Details</p>
              <p>Sub Totals</p>
              <p>Action</p>
            </div>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item._id} className='grid grid-cols-3 items-center gap-32 border-b pb-3 mb-3'>
                  <div className='flex gap-4 items-center'>
                    <img src={`https://shoppingmart-u430.onrender.com/uploads/${item.productimage}`} className='w-16 h-16 object-cover rounded' />
                    <div>
                      <h3 className='font-semibold text-gray-700'>{item.productname}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <button
                          className='h-[30px] w-[30px] bg-gray-200 rounded'
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1 || orderPlaced}
                        >-</button>
                        <input
                          type="number"
                          min="1"
                          max="50"
                          value={item.quantity}
                          onChange={(e) => {
                            let newQty = parseInt(e.target.value);
                            if (newQty >= 1 && newQty <= 50) {
                              updateQuantity(item._id, newQty);
                            }
                          }}
                          className='w-12 text-center border rounded border-gray-300'
                          disabled={orderPlaced}
                        />

                        <button
                          className='h-[30px] w-[30px] bg-gray-200 rounded'
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          disabled={item.quantity >= 50 || orderPlaced}
                        >+</button>
                      </div>
                    </div>
                  </div>
                  <p className='text-gray-800 font-semibold'>₹{(item.sellprice * item.quantity).toFixed(2)}</p>
                  {/* Action Buttun */}
                  <div className='flex gap-3'>
                    {/* wishlist button */}
                    <button onClick={() => toggleWishlist(item)}>
                      {wishlist[item._id] ? (
                        <AiFillHeart color="red" size={18} />
                      ) : (
                        <AiOutlineHeart size={18} />
                      )}
                    </button>
                    {/* Remove Button */}
                    {!orderPlaced && (
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className='text-red-500 hover:underline text-sm'
                      >
                        Remove
                      </button>
                    )}
                  </div>

                </div>
              ))
            )}

          </div>

          {/* Order Summary */}
          <div className='w-1/3'>
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <h2 className="text-xl font-bold mb-2">Order Summary</h2>

              {/* address */}
              <div>
                <label className="block font-semibold mb-1">Delivery Address:</label>

                {savedAddresses.length === 0 ? (
                  <div className="bg-yellow-100 text-yellow-800 p-3 rounded text-sm">
                    No saved addresses. Please add one.
                    <button
                      type="button"
                      className="block mt-2 text-blue-600 hover:underline text-sm"
                      onClick={() => setShowForm(true)}
                    >
                      Add New Address
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Dropdown */}
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      value={selectedAddressId}
                      onChange={(e) => setSelectedAddressId(e.target.value)}
                      disabled={orderPlaced}
                    >
                      {savedAddresses.map((addr) => (
                        <option key={addr._id} value={addr._id}>
                          {addr.name} - {addr.city}
                        </option>
                      ))}
                    </select>

                    {/* Show selected address */}
                    <div className="mt-2 text-sm text-gray-700 bg-gray-50 border rounded p-2">
                      {savedAddresses.find(addr => addr._id === selectedAddressId) && (
                        <>
                          <p><strong>{savedAddresses.find(addr => addr._id === selectedAddressId).name}</strong></p>
                          <p>{savedAddresses.find(addr => addr._id === selectedAddressId).address}</p>
                          <p>{savedAddresses.find(addr => addr._id === selectedAddressId).city}, {savedAddresses.find(addr => addr._id === selectedAddressId).state} - {savedAddresses.find(addr => addr._id === selectedAddressId).pincode}</p>
                          <p>Phone: {savedAddresses.find(addr => addr._id === selectedAddressId).phoneno}</p>
                        </>
                      )}
                    </div>

                    <button
                      type="button"
                      className="mt-2 text-blue-600 hover:underline text-sm"
                      onClick={() => setShowForm(true)}
                    >
                      Add New Address/
                    </button>
                    <button
                      type="button"
                      className="mt-2 text-blue-600 hover:underline text-sm"
                      onClick={() => {
                        const selected = savedAddresses.find(addr => addr._id === selectedAddressId);
                        if (selected) {
                          formedit(selected);  // Pass selected address object
                        }
                      }}
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>




              {/* Payment Method */}
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded"
                disabled={orderPlaced}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Online Payment">Online Payment</option>
              </select>
              {/* ✅ Product List */}
              <div>
                <h3 style={{ marginBottom: '8px', fontWeight: 'bold' }}>Products:</h3>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  {cartItems.map((item) => (
                    <li key={item._id} style={{ marginBottom: '6px' }}>
                      {item.productname} × {item.quantity} = ₹{(item.sellprice * item.quantity).toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>

              <hr style={{ margin: '8px 0' }} />
              <hr style={{ margin: '8px 0' }} />
              {/* Pricing */}
              <div className='mt-4 text-sm'>
                <p>Price: ₹{totalPrice.toFixed(2)}</p>
                <p>GST (2%): ₹{gst.toFixed(2)}</p>
                <p className='font-bold'>Total: ₹{finalAmount.toFixed(2)}</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-500 text-white font-semibold py-2 rounded hover:bg-green-600 transition"
              >
                Place Order
              </button>
            </form>

          </div>
        </div>
      )
      }
      {/* Address Form */}
      {showform && (
        <div className='absolute top-0 left-0 w-full h-screen '>
          <button
            className='absolute mt-5 ml-[62vw] font-semibold text-xl'
            onClick={() => setShowForm(false)}
          >
            X</button>
          <div className="bg-gray-200 shadow-md rounded-lg p-6  mt-5 w-[35vw] ml-[30vw] py-9">
            <AddressForm
              show={setShowForm}
              add={() => fetchSavedAddresses(true)}
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
