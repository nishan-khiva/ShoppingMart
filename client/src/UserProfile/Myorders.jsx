import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Empty from '../assets/emptyOrders.png'

const Myorders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/orders/oder-list', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data.orders);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleViewDetails = (orderId) => {
    navigate('/myaccount/viewdetails', { state: { orderId } });
  };




  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full  mt-3">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className='flex w-full justify-center items-center'>
          <div>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
            <img src={Empty} alt='empty' className='w-62 mt-3' />
            <button onClick={(e) => {
              e.stopPropagation();
              navigate('/');
            }}
              className="px-6 py-2 bg-green-500 rounded-2xl ml-18 mt-7 hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-semibold"
            >
              Shop Now
            </button>

          </div>
        </div>
      ) : (
        <div> 
          <table className="min-w-full border">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-2 px-4 text-left border">Order Id</th>
                <th className="py-2 px-4 text-left border">Date</th>
                <th className="py-2 px-4 text-left border">Items</th>
                <th className="py-2 px-4 text-left border">Status</th>
                <th className="py-2 px-4 text-left border">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t">
                  {/* Order Id */}
                  <td className="py-2 px-4 border">
                    <button onClick={() => handleViewDetails(order._id)} className='hover cursor-pointer text-blue-600 hover:underline'>
                      {order.orderId}
                    </button>
                  </td>
                  {/* Date */}
                  <td className="py-2 px-4 border">{new Date(order.date).toLocaleString()}</td>
                  {/* Items */}
                  <td className="py-2 px-4 border">
                    {order.items.map((item) => item.productname).join(', ')}
                  </td>
                  {/* Order status */}
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${order.status === 'Delivered'
                        ? 'text-green-700'
                        : order.status === 'Shipped'
                          ? 'text-orange-400'
                          : order.status === 'Processing'
                            ? 'text-yellow-800'
                            : 'text-red-700'
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  {/* Total */}
                  <td className="py-2 px-4 border">₹{order.totalPrice}.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Myorders;
