import React, { useEffect, useState } from 'react';
import api from '../Api/axiosInstance'
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';


const ViewDetails = () => {
  const [singleOrder, setSingleOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { orderId } = location.state || {};
  const [statusDetails, setStatusDetails] = useState(false)
  const [cancelReasonVisible, setCancelReasonVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    const fetchSingleOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/api/orders/oder/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSingleOrder(response.data.order);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (orderId) {
      fetchSingleOrder();
    }
  }, [orderId]);


  if (!singleOrder) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-2 px-8 py-3 bg-white shadow-lg rounded-xl border border-gray-200 relative">
      <div className='flex justify-between items-center'>
        <h2 className="text-3xl font-bold text-green-600 mb-6">Order Details</h2>
        <div className='flex gap-2'>
          <button onClick={() => setStatusDetails(true)}
            className='bg-green-500 px-3 py-1 rounded font-semibold text-white hover:cursor-pointer hover:bg-green-700'
          >Status details
          </button>
          {/* Cancel Button */}
          {singleOrder.status === 'Pending' && (
            <div className=" text-right">
              <button
                onClick={() => setCancelReasonVisible(true)}
                disabled={loading}

                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
              >
                {loading ? "Cancelling..." : "Cancel Order"}
              </button>
            </div>
          )}
        </div>
      </div>
      <hr className="my-1" />
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <div><strong>Order ID:</strong> {singleOrder.orderId}</div>
        <div><strong>Date:</strong> {new Date(singleOrder.date).toLocaleString()}</div>
        <div><strong>Status:</strong>
          <span className={`ml-2 px-3 py-1 rounded-full text-sm ${singleOrder.status === 'Delivered' ? 'bg-green-200 text-green-800' :
            singleOrder.status === 'Processing' ? 'bg-yellow-200 text-yellow-800' :
              singleOrder.status === 'Shipped' ? 'bg-blue-200 text-blue-800' :
                singleOrder.status === 'Cancelled' ? 'bg-gray-300 text-gray-700' :
                  'bg-red-200 text-red-800'
            }`}>{singleOrder.status}</span>
        </div>
        <div><strong>Payment Method:</strong> {singleOrder.paymentMethod}</div>
        <div><strong>Name:</strong> {singleOrder.name}</div>
        <div><strong>Payment Status:</strong> paid </div>
        <div><strong>Address:</strong> {singleOrder.address}</div>
        <div><strong>Contact:</strong> {singleOrder.contact}</div>

      </div>

      <hr className="my-6" />

      <h3 className="text-xl font-semibold mb-3 text-gray-800">Items:</h3>
      <table className="min-w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border">Product</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {singleOrder.items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{item.productname}</td>
              <td className="p-2 border">{item.quantity}</td>
              <td className="p-2 border text-right">₹{item.sellprice}.00</td>
              <td className="p-2 border text-right">₹{item.sellprice * item.quantity}.00</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 text-right space-y-1 text-gray-800 text-md">
        <p><strong>Subtotal:</strong> ₹{singleOrder.totalPrice}.00</p>
        <p><strong>GST:</strong> ₹{singleOrder.gst}</p>
        <p className="text-lg font-bold"><strong>Final Amount:</strong> ₹{singleOrder.finalAmount}</p>
      </div>


      {/* Status Details */}
      {statusDetails && (
        <div className='fixed inset-0 backdrop-blur-sm bg-white/10 w-full h-full flex justify-center items-center  z-50'>
          <div className='bg-gray-400 shadow-2xs  rounded-lg px-4 py-2   w-[40vw]'>
            <div className='flex justify-between item-center'>
              <h3 className="text-lg font-semibold mb-1">Status Summary</h3>
              <button
                className='w-6 h-6 flex items-center justify-center  rounded-full bg-black text-white text-xl leading-none font-bold '
                onClick={() => setStatusDetails(false)}>
                x</button>
            </div>
            {singleOrder.actionSummary?.length > 0 ? (
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-2 mb-3 w-full">
                {singleOrder.actionSummary.map((summary, index) => (
                  <li key={index} className="p-2 border rounded bg-white shadow-sm">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-600 ">{summary.status}</span>
                      <span className="text-sm text-gray-500">{new Date(summary.changedAt).toLocaleString()}</span>
                    </div>
                    <p className="mt-1 text-gray-700 max-h-[10vh]  overflow-y-auto whitespace-pre-wrap break-words ">{summary.summary}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No status changes yet.</p>
            )}
          </div>
        </div>
      )}


      {/* Cancel order */}
      {cancelReasonVisible && (
        <div className="fixed inset-0 z-50 w-full h-full flex justify-center items-center">
          <div className="bg-gray-300 shadow-lg rounded p-4 w-[30vw]">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Cancel Order</h3>
              <button onClick={() => setCancelReasonVisible(false)} className="text-red-600 text-xl font-bold">×</button>
            </div>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const token = localStorage.getItem('token');

                // Step 1: Show confirmation modal
                const result = await Swal.fire({
                  title: 'Are you sure?',
                  text: 'Do you really want to cancel this order?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, cancel it!'
                });

                // Step 2: If user cancels confirmation, stop here
                if (!result.isConfirmed) return;

                // Step 3: Proceed with cancellation
                try {
                  await axios.put(
                    `http://localhost:4000/api/orders/cancel-order/${singleOrder._id}`,
                    { summary: cancelReason },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );

                  Swal.fire('Cancelled!', 'Your order has been cancelled.', 'success');
                  setSingleOrder((prev) => ({ ...prev, status: 'Cancelled' }));
                  setCancelReason('');
                  setCancelReasonVisible(false);
                } catch (err) {
                  Swal.fire('Error', err.response?.data?.message || 'Something went wrong', 'error');
                }
              }}
            >
              <textarea
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="Enter reason for cancellation"
                className="w-full border px-3 py-2 rounded mb-3"
                rows="4"
                required
              />
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-1 rounded font-semibold"
              >
                Submit
              </button>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ViewDetails;
