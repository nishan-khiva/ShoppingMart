import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../Context/CartContext';
import Swal from 'sweetalert2';
import Footer from './Footer';

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`https://shoppingmart-u430.onrender.com/categories/${categoryName}/products`)
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error fetching products:", err));
    }, [categoryName]);

    useEffect(() => {
        axios.get('https://shoppingmart-u430.onrender.com/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error("Error fetching categories:", err));
    }, []);

    return (
        <>
        <div className='p-6 mt-12'>
            {/* Heading and Category Links */}
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl capitalize'>{categoryName} Products</h2>
                <div className='flex gap-3 overflow-x-auto'>
                    {categories.map((cat) => (
                        <Link
                            key={cat._id}
                            to={`/category/${cat.name}`}
                            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap border 
                ${cat.name === categoryName ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-green-200'}`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            {products.length === 0 ? (
                <p>No products found in this category.</p>
            ) : (
                <div className='grid grid-cols-5 gap-4'>
                    {products.map(product => (
                        <div key={product._id} className='flex flex-col border border-gray-400 rounded p-3'>
                            <img
                                src={`https://shoppingmart-u430.onrender.com/uploads/${product.productimage}`}
                                alt={product.productname}
                                className='transition-transform duration-300 hover:scale-105 w-full h-40 object-cover rounded'
                            />
                            <p className='opacity-40'>{product.productcategory}</p>
                            <h3 className='font-semibold'>{product.productname}</h3>

                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <img
                                        key={i}
                                        src="/star_icon.svg"
                                        className={`w-3.5 ${i >= 4 ? "opacity-50" : ""}`}
                                        alt="star"
                                    />
                                ))}
                            </div>

                            <div className='flex gap-1 justify-between items-center mt-1'>
                                <h2 className='text-green-600 font-semibold text-xl'>₹{product.sellprice}</h2>
                                <p className='line-through opacity-40 text-[14px] mt-[2px]'>₹{product.productprice}</p>
                                <button
                                    onClick={() => {
                                        const token = localStorage.getItem('token');
                                        if (!token) {
                                            Swal.fire({
                                                icon: 'info',
                                                title: 'Please Login First',
                                                text: 'You need to be logged in to add items to the cart.',
                                                showConfirmButton: true,
                                                confirmButtonColor: '#3085d6'
                                            });
                                        } else {
                                            addToCart(product);
                                        }
                                    }}
                                    className='flex gap-1 bg-green-200 rounded-xl px-3 py-1 hover:bg-green-800'
                                >
                                    <img src='/nav_cart_icon.svg' className='w-3.5' />
                                    <p className='text-green-500'>Add</p>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <Footer/>
        </>
    );
};

export default CategoryProducts;
