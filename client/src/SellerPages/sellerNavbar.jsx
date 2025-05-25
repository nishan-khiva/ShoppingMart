import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {FaEllipsisV  } from 'react-icons/fa';

export default function SellerNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const role = localStorage.getItem('role');
  const emplyName = localStorage.getItem('emplyname');

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside to close profile dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isSellerLoggedIn');
    localStorage.removeItem('token1');
    localStorage.removeItem('emplyname');
    localStorage.removeItem('role');
    navigate('/seller-login');
  };

  return (
    <div className='relative z-50'>
      <div className={`w-full h-[10vh] flex items-center justify-between px-4 sm:px-6 fixed top-0 left-0 transition-all duration-300
        ${isScrolled ? 'bg-white shadow-md border-b border-gray-300' : 'bg-white/80 backdrop-blur-sm border-b border-gray-200'}`}>

        {/* Left logo/title */}
        <div className='font-bold text-lg sm:text-xl'>NishanMart</div>

        {/* Right Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-green-600"
          >
            {emplyName} ({role}) <FaEllipsisV />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg py-1 text-sm text-gray-700">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={() => alert("Profile page feature under development")}
              >
                View Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
