import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../Api/axiosInstance';
import { useCart } from '../Context/CartContext';
import Swal from 'sweetalert2';

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const token = localStorage.getItem("token")


    useEffect(() => {
        if (id) {
            api.get(`${API_URL}/products/${id}`)
                .then(res => setProduct(res.data))
                .catch(err => console.error(err));

            api.get(`${API_URL}/api/can-review/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    setReviews(res.data.reviews);

                    // Calculate average rating
                    const total = res.data.reviews.reduce((acc, review) => acc + review.rating, 0);
                    const avg = res.data.reviews.length ? total / res.data.reviews.length : 0;
                    setAverageRating(avg.toFixed(1)); // Round to 1 decimal point
                })


                .catch(err => console.error(err));
        }
    }, [id]);

    const handleAddToCart = () => {
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
    };

    const handleBuyNow = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'info',
                title: 'Please Login First',
                text: 'You need to be logged in to buy products.',
                showConfirmButton: true,
                confirmButtonColor: '#3085d6'
            });
        } else {
            addToCart(product);
            navigate('/shoping');
        }
    };
 const getImageUrl = (imagePath) => {
        if (!imagePath) return "/no-image.png"; // fallback image
        if (imagePath.startsWith("https://res.cloudinary.com")) {
            return imagePath;
        } else {
            return `http://localhost:4000/uploads/${imagePath}`;
        }
    };
    if (!product) return <div className="text-center mt-20 text-lg">Loading...</div>;
    

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 mt-10 bg-gray-100 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-start bg-white p-8   rounded-lg shadow-md">
                {/* Product Image */}
                <div className="w-full">
                    <img
                    src={getImageUrl(product.productimage)}
                        alt={product.productname}
                        className=" h-auto rounded-lg shadow border border-gray-400   "
                    />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                    <p className="text-sm text-gray-500">{product.productcategory}</p>
                    <h1 className="text-3xl font-bold text-gray-800">{product.productname}</h1>

                    {/* Star Rating */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <img
                                key={i}
                                src="/star_icon.svg"
                                className={`w-5 h-5 ${i < Math.floor(averageRating) ? '' : 'opacity-80'}`}
                                alt="star"
                            />
                        ))}
                        <span className="text-gray-600 text-sm ml-1">({averageRating})</span>
                    </div>


                    {/* Price Info */}
                    <div className="flex items-center gap-3">
                        <span className="text-2xl font-semibold text-green-600">₹{product.sellprice}</span>
                        <span className="text-gray-400 line-through">₹{product.productprice}</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed">{product.productdesc}</p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-6">
                        <button
                            onClick={handleAddToCart}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={handleBuyNow}
                            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition"
                        >
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

            {/* for Review */}
            {reviews.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10">
                    {reviews.map((review, idx) => (
                        <div
                            key={idx}
                            className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-4"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-semibold text-gray-800">{review.name}</h3>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <img
                                            key={i}
                                            src="/star_icon.svg"
                                            className={`w-4 h-4 ${i < review.rating ? '' : 'opacity-30'}`}
                                            alt="star"
                                        />
                                    ))}
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500 mt-10">No reviews yet.</p>
            )}


        </div>
    );
};

export default ProductDetails;
