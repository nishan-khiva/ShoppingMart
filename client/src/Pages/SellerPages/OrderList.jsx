import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("https://shoppingmart-u430.onrender.com/api/orders/oder-list");
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(prev => (prev === orderId ? null : orderId));
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`https://shoppingmart-u430.onrender.com/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      fetchOrders(); // refresh orders
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  const cancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.delete(`https://shoppingmart-u430.onrender.com/api/orders/${orderId}`);
      fetchOrders(); // refresh orders
    } catch (error) {
      console.error("Failed to cancel order", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Order List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Address</th>
              <th className="py-2 px-4 text-left">Payment</th>
              <th className="py-2 px-4 text-left">Products</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr
                    onClick={() => toggleOrderDetails(order._id)}
                    className="border-t hover:bg-gray-50 cursor-pointer align-top"
                  >
                    <td className="py-2 px-4">{order._id}</td>
                    <td className="py-2 px-4">{order.address}</td>
                    <td className="py-2 px-4">{order.paymentMethod}</td>
                    <td className="py-2 px-4">
                      {order.items.map((item, idx) => (
                        <div key={idx}>
                          {item.productname} × {item.quantity}
                        </div>
                      ))}
                    </td>
                    <td className="py-2 px-4 font-semibold">₹{order.finalAmount.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        className="border p-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row toggle
                          cancelOrder(order._id);
                        }}
                        className="ml-3 text-red-500 hover:underline"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>

                  {/* Expandable details */}
                  {expandedOrderId === order._id && (
                    <tr className="bg-gray-50 border-b">
                      <td colSpan="6" className="py-4 px-4">
                        <p><strong>Customer:</strong> {order.customerName || 'N/A'}</p>
                        <p><strong>Phone:</strong> {order.phone || 'N/A'}</p>
                        <p><strong>Status:</strong> {order.status}</p>
                        <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                        <div className="mt-3">
                          <strong>Product Breakdown:</strong>
                          <ul className="list-disc pl-5">
                            {order.items.map((item, idx) => (
                              <li key={idx}>
                                {item.productname} - {item.quantity} × ₹{item.sellprice} = ₹{item.quantity * item.sellprice}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td className="py-4 px-4 text-center" colSpan={6}>No orders available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
