import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Catagory = () => {
  const [categories, setCategories] = useState([]);

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

  useEffect(() => {
    axios.get('http://localhost:4000/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className='px-18 py-6'>
      <h1 className='text-3xl font-semibold'>Categories</h1>
      <div className='grid grid-cols-6 gap-2 py-3'>
        {categories.map((cat, index) => (
          <Link to={`/category/${cat.name.toLowerCase()}`} key={cat._id}>
          <div className={`w-[14vw] rounded-xl ${bgColors[index % bgColors.length]} flex flex-col items-center`}>
            <img
              src={`http://localhost:4000/${cat.image}`}
              className='h-[150px] transition-transform duration-300 hover:scale-105 object-cover'
              alt={cat.name}
            />
            <p className='font-serif mb-1'>{cat.name}</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
};

export default Catagory;
