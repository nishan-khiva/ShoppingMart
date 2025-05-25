import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";
import { Link, Outlet } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://shoppingmart-u430.onrender.com/products/");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://shoppingmart-u430.onrender.com/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between"> <h2 className="text-2xl font-semibold mb-4">Product List</h2>
        <Link to="/seller/add-product" className='flex gap-2 items-center hover:underline'>
          <img src="/add_icon.svg" alt="Add" />
          <p>Add Products</p>
        </Link> </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Sell Price</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-sm border-t hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    src={`https://shoppingmart-u430.onrender.com/uploads/${product.productimage}`}
                    alt={product.productname}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-2 border font-medium">{product.productname}</td>
                <td className="px-4 py-2 border text-gray-600">{product.productdesc}</td>
                <td className="px-4 py-2 border text-green-700">{product.productcategory}</td>
                <td className="px-4 py-2 border line-through text-red-500">₹{product.productprice}</td>
                <td className="px-4 py-2 border font-bold text-green-700">₹{product.sellprice}</td>
                <td className="px-4 py-2  flex justify-center items-center   gap-3">
                  <button
                    onClick={() => navigate(`/seller/add-product?id=${product._id}`)}
                    className="text-blue-600 hover:text-blue-800 h-6"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
