import React, { useState, useEffect } from 'react';
import api from '../Api/axiosInstance'
import toast from 'react-hot-toast';
const API_URL = import.meta.env.VITE_API_URL;

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [categoryImage, setCategoryImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append('name', categoryName);
    if (categoryImage) {
      formData.append('image', categoryImage);
    }

    try {
      if (editingId) {
        await api.put(`/categories/${editingId}`, formData);
        toast.success("Category updated!");
        setEditingId(null);
      } else {
        await api.post('/categories', formData);
        toast.success("Category added successfully!");
      }
      setCategoryName('');
      setCategoryImage(null);
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await api.delete(`/categories/${id}`);
        toast.success("Category deleted!");
        fetchCategories();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete category");
      }
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    setEditingId(category._id);
  };

  return (
    <div className="w-full mx-auto p-4">
      <div className="bg-white rounded shadow-md p-4 mt-[8vh] sm:mt-0">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          {editingId ? 'Edit Category' : 'Add New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex flex-col w-full sm:flex-1">
            <label className="text-sm text-gray-700 mb-1">Category Name:</label>
            <input
              type="text"
              className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add new Category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full sm:w-auto">
            <label className="text-sm text-gray-700 mb-1">Category Image:</label>
            <input
              type="file"
              onChange={(e) => setCategoryImage(e.target.files[0])}
              className="text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition duration-200"
            >
              {editingId ? 'Update' : 'Add Category'}
            </button>
          </div>
        </form>
      </div>

      {/* Category List */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold mb-3">Category List
        <span className="ml-4 text-sm text-gray-600">Total Category: { categories.length}</span>
        </h1>
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  {cat.image && (
                    <img
                      src={`${API_URL}/${cat.image}`}
                      alt={cat.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
                  <p className="font-medium">{cat.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCategory;
