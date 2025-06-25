import React from 'react';

const InstamojoButton = () => {
  const handlePayNow = () => {
    // Instamojo test/demo payment link
    window.location.href = "https://imjo.in/fwz4K8";
  };

  return (
    <button
      onClick={handlePayNow}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
    >
      Pay Now (Instamojo)
    </button>
  );
};

export default InstamojoButton;
