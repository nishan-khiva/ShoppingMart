import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../Context/ProductContext';
const API_URL = import.meta.env.VITE_API_URL;
const Catagory = () => {
  const { categories, setCategories } = useProducts();

  const bgColors = [
    'bg-red-200',
    'bg-blue-200',
    'bg-amber-200',
    'bg-green-200',
    'bg-pink-200',
    'bg-purple-200',
    'bg-yellow-200',
    'bg-indigo-200',
    'bg-teal-200',
    'bg-orange-200'
  ];

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-16 py-6 sm:w-full sm:flex-wrap">
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Categories</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat, index) => (
          <Link to={`/category/${cat.name.toLowerCase()}`} key={cat._id}>
            <div
              className={`rounded-xl ${bgColors[index % bgColors.length]} flex flex-col items-center p-3 transition-shadow hover:shadow-md`}
            >
              <img
                src={`${API_URL}/${cat.image}`}
                className="h-[120px] sm:h-[140px] md:h-[150px] object-cover rounded-md transition-transform duration-300 hover:scale-105"
                alt={cat.name}
              />
              <p className="font-serif mt-2 text-center text-sm sm:text-base">{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>

  );
};

export default Catagory;
