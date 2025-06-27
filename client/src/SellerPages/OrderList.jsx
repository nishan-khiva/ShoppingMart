import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../Api/axiosInstance';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/api/orders/all-oder");
        setOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewDetails = (orderId) => {
    navigate('/seller/full-details', { state: { orderId } });
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = filterStatus === "All" || order.status === filterStatus;
 const matchesSearch = (order.orderId || "").toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const statusColors = {
    Delivered: "text-green-700",
    Pending: "text-yellow-700",
    Shipped: "text-blue-700",
    Cancelled: "text-red-700",
    Processing: "text-gray-700",
  };

  return (
    <div className="p-6">
      {/* Header and Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Order List</h2>
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-1 rounded-full text-sm font-medium ${
              filterStatus === status ? "bg-green-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left border">Order ID</th>
              <th className="py-2 px-4 text-left border">Date</th>
              <th className="py-2 px-4 text-left border">Customer</th>
              <th className="py-2 px-4 text-left border">Payment</th>
              <th className="py-2 px-4 text-left border">Total</th>
              <th className="py-2 px-4 text-left border">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t hover:bg-gray-50 cursor-pointer"
                >
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleViewDetails(order._id)}
                      className="text-blue-600 hover:underline"
                    >
                      {order.orderId}
                    </button>
                  </td>
                  <td className="py-2 px-4 border">
                    {new Date(order.date || order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border">
                    {order.userId?.name || order.name || "Unknown"}
                  </td>
                  <td className="py-2 px-4 border">{order.paymentMethod}</td>
                  <td className="py-2 px-4 font-semibold border">
                    ₹{order.finalAmount.toFixed(2)}
                  </td>
                  <td className={`py-2 px-4 border text-sm font-medium ${statusColors[order.status] || "text-gray-600"}`}>
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
