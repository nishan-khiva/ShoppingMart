import React, { useEffect, useState, useRef } from 'react';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import { useNavigate } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { useCart } from '../Context/CartContext'; // import useCart
import { useSearch } from '../Context/SearchContext';

const Navbar = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showSign, setShowSign] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { searchQuery, setSearchQuery } = useSearch();
    const { cartItems } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    const isSellerRoute = location.pathname.startsWith('/seller');
    const loginRef = useRef(null);
    const profileRef = useRef(null);
    // 👇 Hide navbar on specific routes
    const hideNavbarRoutes = ['/seller-login'];
    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

    const toggleLogin = () => {
        setShowLogin(prev => !prev);
        setShowSign(false);
    };
    const handleSignupClick = () => {
        setShowSign(true);
        setShowLogin(false);
    };
    const handleLoginSuccess = () => {
        setShowLogin(false);
        setIsLoggedIn(true);
    };
    const handleSignSuccess = () => {
        setShowSign(false);
        setIsLoggedIn(true);
    };
    const handleSearch = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && searchQuery.trim()) {
            navigate('/all-products');
        }
    };
    

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                loginRef.current &&
                !loginRef.current.contains(event.target) &&
                !event.target.closest("#login-button")
            ) {
                setShowLogin(false);
                setShowSign(false);
            }
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfileDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        setShowLogin(false);
        setShowSign(false);
        setShowProfileDropdown(false);
    }, [location.pathname]);
    //Navbar scroll
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 10);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    if (shouldHideNavbar) return null;

    return (
        <nav className={`w-full h-[10vh] flex items-center justify-between px-4 sm:px-6 fixed top-0 left-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md border-b border-gray-300' : 'bg-white/80 backdrop-blur-sm border-b border-gray-200'}`}>

            <div className='font-bold text-lg sm:text-xl'>NishanMart</div>

            {isSellerRoute ? (
                <div className='text-xs sm:text-sm font-medium text-gray-600 flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap'>
                    Welcome, Seller 👋
                    <button
                        onClick={() => {
                            localStorage.removeItem('isSellerLoggedIn');
                            navigate('/seller-login');
                        }}
                        className='ml-2 sm:ml-3 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs sm:text-sm'
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <div className='flex flex-wrap sm:flex-nowrap gap-4 sm:gap-6 items-center justify-end'>
                    <Link to='/'><h3 className='text-sm sm:text-base'>Home</h3></Link>
{/*                      <Link to="/seller"><h3 className='text-sm sm:text-base'>Admin Dashboard</h3></Link> */}
                    <Link to="/all-products"><h3 className='text-sm sm:text-base'>All Product</h3></Link>
                    

                    <div className='flex items-center gap-2 border rounded-2xl px-2 py-1'>
                        <input
                            type="search"
                            placeholder="Search products"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleSearch}
                            className="outline-none px-2 py-0.5 rounded-2xl text-xs sm:text-sm w-[100px] sm:w-auto"
                        />
                        <img src="/search_icon.svg" alt="Search Icon" className="w-5 h-5 cursor-pointer" onClick={handleSearch} />
                    </div>

                    <Link to='/shoping' className='relative'>
                        <img src="/nav_cart_icon.svg" alt="Cart" />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 left-3 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <div className="relative" ref={profileRef}>
                            <button
                                id="profile-button"
                                onClick={() => setShowProfileDropdown(prev => !prev)}
                                className='rounded-2xl text-sm font-semibold text-gray-800 hover:bg-gray-200 flex items-center gap-2'
                            >
                                <FaUserCircle className="text-xl" />
                            </button>
                            {showProfileDropdown && (
                                <div className="absolute top-10 right-0 bg-white border rounded shadow-md w-36 z-50">
                                    <ul className="text-sm">
                                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">My Account</li>
                                        <li
                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                localStorage.removeItem('token');
                                                setIsLoggedIn(false);
                                                setShowProfileDropdown(false);
                                            }}
                                        >
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={toggleLogin}
                            id="login-button"
                            className='rounded-2xl py-1 px-3 bg-green-400 text-sm font-semibold text-white hover:bg-green-500'
                        >
                            LOG-IN
                        </button>
                    )}

                    {/* Login/Signup Popup Responsive */}
                    {showLogin && (
                        <div className='absolute top-[25vh] left-[5vw] sm:left-[35vw] z-50 w-[90vw] sm:w-auto' ref={loginRef}>
                            <Login
                                onSignupClick={handleSignupClick}
                                onLoginSuccess={handleLoginSuccess}
                            />
                        </div>
                    )}
                    {showSign && (
                        <div className='absolute top-[25vh] left-[5vw] sm:left-[35vw] z-50 w-[90vw] sm:w-auto' ref={loginRef}>
                            <Signup
                                onLoginClick={toggleLogin}
                                onSignSuccess={handleSignSuccess}
                            />
                        </div>
                    )}
                </div>
            )}
        </nav>

    );
};

export default Navbar;
