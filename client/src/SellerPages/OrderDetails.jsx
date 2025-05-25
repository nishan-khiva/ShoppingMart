import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../Api/axiosInstance'
const OrderDetails = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const [order, setOrder] = useState(null);
  const [actionSummaryVisible, setActionSummaryVisible] = useState(false);
  const [actionText, setActionText] = useState("");
  const [nextStatus, setNextStatus] = useState("");
  const [summary, setSummary] = useState(false);

  const fetchOrder = async () => {
    const token = localStorage.getItem('token1');
    try {
      const res = await api.get(`/api/orders/adminorder/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrder(res.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  const openSummaryFor = (status) => {
    setNextStatus(status);
    setActionSummaryVisible(true);
  };

  const emplyName = localStorage.getItem('emplyname');

  const handleSubmitSummary = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/orders/update-status/${order._id}`, {
        status: nextStatus,
        summary: actionText,
        emplyName,
      });
      setActionSummaryVisible(false);
      setActionText("");
      await fetchOrder();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const getNextAction = () => {
    switch (order?.status) {
      case "Pending": return "Processing";
      case "Processing": return "Shipped";
      case "Shipped": return "Delivered";
      default: return null;
    }
  };

  const next = getNextAction();

  if (!order) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 mb-4 gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Order Details</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSummary(true)}
            className="bg-green-500 px-3 py-1 rounded text-white font-semibold hover:bg-green-600"
          >
            View Activity
          </button>
          {next && (
            <button
              className="bg-blue-600 px-3 py-1 rounded text-white font-semibold hover:bg-blue-700"
              onClick={() => openSummaryFor(next)}
            >
              Mark as {next}
            </button>
          )}
          {(order.status === "Pending" || order.status === "Processing") && (
            <button
              className="bg-red-600 px-3 py-1 rounded text-white font-semibold hover:bg-red-700"
              onClick={() => openSummaryFor("Cancelled")}
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>

      {/* Order Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="space-y-2">
          <p><strong>📦 Order ID:</strong> {order.orderId}</p>
          <p><strong>👤 Customer:</strong> {order.name}</p>
          <p><strong>📞 Contact:</strong> {order.contact}</p>
          <p><strong>📍 Address:</strong> {order.address}</p>
        </div>
        <div className="space-y-2">
          <p><strong>💳 Payment Mode:</strong> {order.paymentMethod}</p>
          <p><strong>💳 Payment Status:</strong> Paid</p>
          <p><strong>📅 Placed On:</strong> {new Date(order.date).toLocaleString()}</p>
          <p><strong>🚚 Status:</strong> <span className="font-medium text-blue-600">{order.status}</span></p>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="mb-6 overflow-x-auto">
        <h3 className="text-xl font-semibold border-b mb-2">🛒 Items</h3>
        <table className="min-w-full text-left border">
          <thead className="bg-gray-100 text-sm text-gray-700">
            <tr>
              <th className="p-2 border">Product</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-t">
                <td className="p-2 border">{item.productname}</td>
                <td className="p-2 border text-right">{item.quantity}</td>
                <td className="p-2 border text-right">₹{item.sellprice}.00</td>
                <td className="p-2 border text-right font-medium">₹{item.quantity * item.sellprice}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 rounded-lg p-4 border space-y-2 flex flex-col sm:flex-row justify-between gap-4">
        <div><p className="font-semibold">💰 Payment Details</p></div>
        <div className="text-right space-y-1">
          <p><strong>Total Price:</strong> ₹{order.totalPrice}.00</p>
          <p><strong>GST:</strong> ₹{order.gst}</p>
          <p className="text-lg font-bold text-green-700"><strong>Final Amount:</strong> ₹{order.finalAmount}</p>
        </div>
      </div>

      {/* View Activity Modal */}
      {summary && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex justify-center items-center px-4">
          <div className="bg-gray-200 rounded-lg p-4 w-full max-w-5xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Order Activity</h3>
              <button
                className="w-8 h-8 flex items-center justify-center text-black text-lg font-bold rounded-full bg-gray-300"
                onClick={() => setSummary(false)}
              >
                ×
              </button>
            </div>
            {order.actionSummary?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border bg-white">
                  <thead className="bg-gray-100 text-gray-700 text-sm">
                    <tr>
                      <th className="border p-2">Date & Time</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Action by</th>
                      <th className="border p-2">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.actionSummary.map((summary, index) => (
                      <tr key={index} className="border-t text-sm">
                        <td className="p-2 border text-gray-500">{new Date(summary.changedAt).toLocaleString()}</td>
                        <td className="p-2 font-medium text-blue-600 border">{summary.status}</td>
                        <td className="p-2 border">{summary.emplyName || "N/A"}</td>
                        <td className="p-2 border text-gray-700 whitespace-pre-wrap break-words">{summary.summary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No status changes yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {actionSummaryVisible && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-50 flex justify-center items-center px-4">
          <div className="bg-gray-300 p-4 rounded w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-semibold text-lg">Activity Remark</h2>
              <button onClick={() => setActionSummaryVisible(false)} className="font-bold text-xl">×</button>
            </div>
            <form onSubmit={handleSubmitSummary}>
              <textarea
                className="w-full border rounded p-2 mb-2"
                placeholder={`Enter Remarks for ${nextStatus}`}
                rows={4}
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
              />
              <button type="submit" className="bg-green-600 px-4 py-1 text-white rounded font-semibold">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
