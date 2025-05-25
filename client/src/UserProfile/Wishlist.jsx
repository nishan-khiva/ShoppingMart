import React, { useEffect } from 'react';
import { useWishlist } from '../Context/WishlistContext';
import { useCart } from '../Context/CartContext';
import Swal from 'sweetalert2';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Wishlist = () => {
    const { wishlist, toggleWishlist,fetchWishlist } = useWishlist();
    const { addToCart } = useCart();
    const likedItems = Object.values(wishlist).filter(Boolean);
    
    useEffect(() => {
        fetchWishlist(); 
      }, []);
    

    return (
        <div className=''>
            <div className='py-4 px-6 '>
                <h1 className='text-2xl'>My Wishlist</h1>
            </div>

            <div className='px-6'>
                {likedItems.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg py-10">No items in wishlist.</div>
                ) : (
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 py-2'>
                        {likedItems.map((product) => (
                            <div key={product._id} className='flex flex-col border border-gray-400 rounded p-3'>
                                <button onClick={() => toggleWishlist(product)}>
                                    {wishlist[product._id] ? (
                                        <AiFillHeart color="red" size={18} />
                                    ) : (
                                        <AiOutlineHeart size={18} />
                                    )}
                                </button>
                                <img
                                    src={`http://localhost:4000/uploads/${product.productimage}`}
                                    alt={product.productname}
                                    className='transition-transform duration-300 hover:scale-105 object-cover rounded'
                                />
                                <p className='opacity-40'>{product.productcategory}</p>
                                <h3 className='font-semibold'>{product.productname}</h3>

                                {/* Stars */}
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

                                {/* Price & Button */}
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
        </div>
    );
};

export default Wishlist;
