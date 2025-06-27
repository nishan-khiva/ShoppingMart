import React from 'react';
import { useCart } from '../Context/CartContext';
import Swal from 'sweetalert2';
import { useProducts } from "../Context/ProductContext";
// const API_URL = import.meta.env.VITE_API_URL;

const BestSeller = () => {
  const { addToCart } = useCart();
  const { bestproducts, setBestproducts } = useProducts();
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/no-image.png"; // fallback image
    if (imagePath.startsWith("https://res.cloudinary.com")) {
      return imagePath;
    } else {
      return `http://localhost:4000/uploads/${imagePath}`;
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-18 py-6" id='best'>
      <h1 className="text-3xl font-semibold">Best Seller</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 py-3">
        {bestproducts.map((product) => (
          <div key={product._id} className="flex flex-col border border-gray-400 rounded p-3">

            <img
              // src={`${API_URL}/uploads/${product.productimage}`}
              src={getImageUrl(product.productimage)}
              alt={product.productname}
              className="transition-transform duration-300 hover:scale-105 object-contain h-[150px] w-full"
            />
            <p className="opacity-40">{product.productcategory || "Vegetables"}</p>
            <h3 className="font-semibold">{product.productname}</h3>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src="/star_icon.svg"
                  className={`w-3.5 ${i === 5 ? 'opacity-50' : ''}`}
                  alt="star"
                />
              ))}
            </div>

            <div className="flex gap-1 justify-between items-center mt-2">
              <h2 className="text-green-600 font-semibold text-xl">₹{product.sellprice}</h2>
              <p className="line-through opacity-40 text-[14px] mt-[2px]">₹{product.productprice}</p>


              <button
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    Swal.fire({
                      icon: 'info',
                      title: 'Please Login First',
                      text: 'You need to be logged in to add items to the cart.',
                      showConfirmButton: true,
                      confirmButtonColor: '#3085d6',
                    });
                  } else {
                    addToCart(product);
                  }
                }}
                className="flex gap-1 bg-green-200 rounded-xl px-3 py-1 hover:bg-green-800 w-full sm:w-auto mt-2 sm:mt-0"
              >
                <img src="/nav_cart_icon.svg" className="w-3.5" alt="cart" />
                <p className="text-green-500">Add</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
