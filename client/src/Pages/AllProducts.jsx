import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Footer from '../Components/Footer';
import { useCart } from '../Context/CartContext';
import Swal from 'sweetalert2';
import { useSearch } from '../Context/SearchContext';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useWishlist } from '../Context/WishlistContext';
import { useProducts } from "../Context/ProductContext";
const API_URL = import.meta.env.VITE_API_URL;

const AllProducts = () => {
    const { products, setProducts } = useProducts();
    const { searchQuery } = useSearch();
    const [filtered, setFiltered] = useState([]);
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();


    useEffect(() => {
        const filteredItems = products.filter((item) =>
            item.productname.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFiltered(filteredItems);
    }, [searchQuery, products]);

    return (
        <>
            <div className='mt-[8vh] px-4 sm:px-6 lg:px-18 py-6'>
                <div className='py-4 px-6'>
                    <h1 className='text-2xl'>ALL PRODUCTS</h1>
                </div>

                <div className='px-6'>
                    {filtered.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg py-10">No products found.</div>
                    ) : (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-2 '>
                            {filtered.map((product) => (
                                <div key={product._id} className='flex flex-col border border-gray-400 rounded p-3'>
                                    <button onClick={() => toggleWishlist(product)}>
                                        {wishlist[product._id] ? (
                                            <AiFillHeart color="red" size={18} />
                                        ) : (
                                            <AiOutlineHeart size={18} />
                                        )}
                                    </button>
                                    <img
                                        src={`${API_URL}/uploads/${product.productimage}`}
                                        alt={product.productname}
                                        className='transition-transform duration-300 hover:scale-105 object-cover rounded w-full h-auto'
                                    />
                                    <p className='opacity-40 text-xs sm:text-sm mt-2'>{product.productcategory}</p>
                                    <h3 className='font-semibold text-sm sm:text-lg mt-2'>{product.productname}</h3>

                                    {/* Stars */}
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <img
                                                key={i}
                                                src="/star_icon.svg"
                                                className={`w-3.5 ${i >= 4 ? "opacity-50" : ""}`}
                                                alt="star"
                                            />
                                        ))}
                                    </div>

                                    {/* Price & Button */}
                                    <div className='flex gap-1 justify-between items-center mt-2'>
                                        <h2 className='text-green-600 font-semibold text-lg sm:text-xl'>₹{product.sellprice}</h2>
                                        <p className='line-through opacity-40 text-[12px] sm:text-[14px] mt-[2px]'>₹{product.productprice}</p>
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
                                            className='flex gap-1 bg-green-200 rounded-xl px-3 py-2 sm:px-4 sm:py-2 hover:bg-green-800'
                                        >
                                            <img src='/nav_cart_icon.svg' className='w-4 sm:w-5' />
                                            <p className='text-green-500 text-sm sm:text-base'>Add</p>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
