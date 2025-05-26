import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import api from '../Api/axiosInstance';
import { Link, Outlet } from 'react-router-dom';
import { useProducts } from "../Context/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

const ProductList = () => {
  const { products, setProducts,  loading } = useProducts();
  // const [products, setProducts] = useState([]);
  
  // No need to call fetchProducts again
  if (loading) return <p>Loading...</p>;

  const navigate = useNavigate();

  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get("http://localhost:4000/products/");
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.error("Error fetching products:", error);
  //   }
  // };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };
  const toggleBestSeller = async (id, currentStatus) => {
    try {
      await api.put(`/products/${id}/toggle-bestseller`, {
        bestseller: !currentStatus,
      });
      setProducts((prev) =>
        prev.map((p) =>
          p._id === id ? { ...p, bestseller: !currentStatus } : p
        )
      );
    } catch (error) {
      console.error("Error toggling bestseller:", error);
    }
  };


  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  return (
    <div className="p-4 md:p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-semibold">
          Product List
          <span className="ml-4 text-sm text-gray-600 font-normal">
            Total Products: {products.length}
          </span>
        </h2>

        <Link to="/seller/add-product" className="flex gap-2 items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          <img src="/add_icon.svg" alt="Add" className="w-5 h-5" />
          <p className="text-sm font-medium">Add Products</p>
        </Link>
      </div>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-3 border">Image</th>
              <th className="px-4 py-3 border">Name</th>
              <th className="px-4 py-3 border">Description</th>
              <th className="px-4 py-3 border">Category</th>
              <th className="px-4 py-3 border">Price</th>
              <th className="px-4 py-3 border">Sell Price</th>
              <th className="px-4 py-3 border">Actions</th>
              <th className="px-4 py-3 border">Best Seller</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-sm border-t hover:bg-gray-50">
                <td className="px-4 py-3 border">
                  <img
                    src={`${API_URL}/uploads/${product.productimage}`}
                    alt={product.productname}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3 border font-medium">{product.productname}</td>
                <td className="px-4 py-3 border text-gray-600">{product.productdesc}</td>
                <td className="px-4 py-3 border text-green-700">{product.productcategory}</td>
                <td className="px-4 py-3 border line-through text-red-500">₹{product.productprice}</td>
                <td className="px-4 py-3 border font-bold text-green-700">₹{product.sellprice}</td>
                <td className="px-4 py-3 border">
                  <div className="flex justify-center items-center gap-3">
                    <button
                      onClick={() => navigate(`/seller/add-product?id=${product._id}`)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </td>
                <td className="px-4 py-3 border text-center">
                  <input
                    type="checkbox"
                    checked={product.bestseller}
                    onChange={() => toggleBestSeller(product._id, product.bestseller)}
                    className="w-5 h-5 cursor-pointer accent-green-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards for Mobile */}
      <div className="block md:hidden space-y-4">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow rounded-lg p-4 border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={`http://localhost:4000/uploads/${product.productimage}`}
                alt={product.productname}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{product.productname}</h3>
                <p className="text-sm text-gray-500">{product.productcategory}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{product.productdesc}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-red-500 line-through">₹{product.productprice}</span>
              <span className="text-green-600 font-bold">₹{product.sellprice}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/seller/add-product?id=${product._id}`)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash size={18} />
                </button>
              </div>
              <div>
                <input
                  type="checkbox"
                  checked={product.bestseller}
                  onChange={() => toggleBestSeller(product._id, product.bestseller)}
                  className="w-5 h-5 cursor-pointer accent-green-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default ProductList;