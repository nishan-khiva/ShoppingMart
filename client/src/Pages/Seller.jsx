import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaAddressBook, FaBars, FaTimes } from "react-icons/fa";
import SellerNavbar from '../SellerPages/sellerNavbar';

const Seller = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <>
      <SellerNavbar />

      {/* Mobile: Top Bar with Hamburger */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-white border-green-400 border shadow-md fixed top-[10vh] w-full z-30">
        <h1 className="text-lg font-semibold">Seller Panel</h1>
        <button onClick={toggleSidebar} className="text-2xl text-gray-700">
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div className="flex h-screen pt-[10vh] md:pt-0 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`fixed md:static z-40 top-[10vh] md:top-0 left-0 bg-white border-r w-[70vw] sm:w-[50vw] md:w-[18vw] h-full p-4 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 `}
        >
          <nav className="flex flex-col gap-5 font-semibold text-gray-700 text-[15px] py-12">
            <NavItem to="/seller" icon={<FaTachometerAlt size={20} className="text-green-600" />} label="Dashboard" onClick={closeSidebar} />
            <NavItem to="add-category" icon={<img src="/add_icon.svg" alt="Add" className="w-5 h-5" />} label="Add Category" onClick={closeSidebar} />
            <NavItem to="product-list" icon={<img src="/product_list_icon.svg" alt="List" className="w-5 h-5" />} label="Manage Products" onClick={closeSidebar} />
            <NavItem to="order-list" icon={<img src="/order_icon.svg" alt="Orders" className="w-5 h-5" />} label="Order List" onClick={closeSidebar} />
            <NavItem to="employee-list" icon={<FaAddressBook size={20} className="text-blue-600" />} label="Employee List" onClick={closeSidebar} />
          </nav>
        </div>

        {/* Overlay on Mobile when Sidebar Open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-30 z-20 md:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto px-3 py-12 bg-gray-50">
          <Outlet />
        </div>
      </div>
    </>
  );
};

const NavItem = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 hover:underline hover:text-green-600 transition-all"
  >
    <div className="w-5 h-5">{icon}</div>
    <span>{label}</span>
  </Link>
);

export default Seller;
