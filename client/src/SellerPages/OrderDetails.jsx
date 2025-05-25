import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const OrderDetails = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  const [order, setOrder] = useState(null);
  const [actionSummaryVisible, setActionSummaryVisible] = useState(false);
  const [actionText, setActionText] = useState("");
  const [nextStatus, setNextStatus] = useState("");
  const [summary, setSummary] = useState(false);

  // ✅ Move fetchOrder outside so it's reusable
  const fetchOrder = async () => {
    const token = localStorage.getItem('token1');
    try {
      const res = await axios.get(`http://localhost:4000/api/orders/adminorder/${orderId}`, {
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
      await axios.put(`http://localhost:4000/api/orders/update-status/${order._id}`, {
        status: nextStatus,
        summary: actionText,
        emplyName,
      });
      setActionSummaryVisible(false);
      setActionText("");
      await fetchOrder(); // ✅ Refresh order data without reload
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
    <div className=" p-6 max-w-5xl mx-auto mt-2 bg-white rounded-lg shadow-md relative">
      <div className='flex justify-between items-center border-b'>
        <h2 className="text-3xl font-bold text-gray-800 mb-2  pb-2">Order Details</h2>
        <div>
          <div className='flex'>
            {/* view summary button */}
            <button
              onClick={() => setSummary(true)}
              className='bg-green-500 px-2 py-1 rounded shadow text-white font-semibold hover:cursor-pointer hover:bg-green-600  '
            >
              View Activity
            </button>
            {/* status button */}
            <div className='flex ml-2'>
              {next && (
                <button
                  className="bg-blue-600 px-3 text-white rounded hover:cursor-pointer hover:bg-blue-700  "
                  onClick={() => openSummaryFor(next)}
                >
                  Mark as {next}
                </button>
              )}
              {(order.status === "Pending" || order.status === "Processing") && (
                <button
                  className="bg-red-600 px-2 text-white rounded ml-2 hover:cursor-pointer hover:bg-red-700 "
                  onClick={() => openSummaryFor("Cancelled")}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6 mt-1">
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


          {/* Action Summary details */}
          {summary && (
            <div className='fixed inset-0 bg-white/10 backdrop-blur-sm z-50 flex justify-center items-center'>
              <div className=" bg-gray-300 border-2 border-gray-800 rounded-lg px-4 py-2 w-[52vw] z-100 shadow-lg">
                <div className='flex justify-between items-center mb-2'>
                  <h3 className="text-lg font-semibold">Order Activity</h3>
                  <button
                    className="w-8 h-8 flex items-center justify-center hover:cursor-pointer rounded-full bg-gray-300 text-black text-lg font-bold"
                    onClick={() => setSummary(false)}
                  >
                    ×
                  </button>
                </div>
                {order.actionSummary?.length > 0 ? (
                  <table className="text-left border mt-4 mb-2 bg-white shadow-md w-full">
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
                          <td className="p-2 text-gray-700 border">
                            <div className="max-h-[10vh] w-[20vw] overflow-y-auto break-words whitespace-pre-wrap">
                              {summary.summary}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-600">No status changes yet.</p>
                )}
              </div>
            </div>
          )}


        </div>
      </div>

      {/* Action Summary Form */}
      {actionSummaryVisible && (
        <div className='fixed inset-0 bg-white/20 backdrop-blur  w-full h-full z-50 flex justify-center items-center '>
          <div className="bg-gray-300 shadow-lg px-4 py-2 rounded w-[30vw] h-[33vh]">
            <div className='flex justify-between'>
              <h1 className='font-semibold'>Activity Remark</h1>
              <button className=' font-bold mb-1 text-xl' onClick={() => setActionSummaryVisible(false)}>X</button>
            </div>

            <form onSubmit={handleSubmitSummary}>
              <textarea
                className='w-full border rounded px-3 mb-2'
                placeholder={`Enter Remarks for ${nextStatus}`}
                rows={4}
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
              />
              <button type="submit" className='bg-green-600 px-4 py-1 rounded font-semibold text-white'>
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold border-b mb-2">🛒 Items</h3>
        <table className="w-full text-left border">
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

      {/* Price Summary */}
      <div className="bg-gray-50 rounded-lg p-4 border space-y-2 flex justify-between">
        <div><p><strong>Payment Details</strong></p></div>
        <div>
          <p className='flex justify-between'><strong>Total Price:</strong> <p>₹{order.totalPrice}.00  </p> </p>
          <p className='flex justify-between'><strong>GST:</strong><p>₹{order.gst}</p>  </p>
          <p className="text-lg font-bold text-green-700"><strong>Final Amount:</strong> ₹{order.finalAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
