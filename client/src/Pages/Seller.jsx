import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaAddressBook } from "react-icons/fa";
import SellerNavbar from '../SellerPages/sellerNavbar';

const Seller = () => {
  return (
    <>
    <SellerNavbar/>
    <div className="flex flex-col md:flex-row h-screen sm:mt-[10vh] mt-2 overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-[18vw] h-auto md:h-full border-b md:border-b-0 md:border-r bg-white sticky top-[10vh] md:top-0 overflow-x-auto md:overflow-x-visible">
        <div className="flex flex-row md:flex-col gap-4 md:gap-6 p-4 font-semibold text-gray-700 text-[14px] md:text-[16px]">
          <NavItem to="/seller" icon={<FaTachometerAlt size={22} className="text-green-600" />} label="Dashboard" />
          <NavItem to="add-category" icon={<img src="/add_icon.svg" alt="Add" className="w-6 h-6" />} label="Add Category" />
          <NavItem to="product-list" icon={<img src="/product_list_icon.svg" alt="List" className="w-6 h-6" />} label="Manage Products" />
          <NavItem to="order-list" icon={<img src="/order_icon.svg" alt="Orders" className="w-6 h-6" />} label="Order List" />
          <NavItem to="employee-list" icon={<FaAddressBook size={22} className="text-blue-600" />} label="Employee List" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-3 bg-gray-50">
        <Outlet />
      </div>
    </div>
    </>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link 
    to={to} 
    className="flex items-center min-w-max gap-2 md:gap-3 hover:underline hover:text-green-600 transition-all"
  >
    <div className="w-6 h-6 flex items-center justify-center">
      {icon}
    </div>
    <span className="whitespace-nowrap">{label}</span>
  </Link>
);

export default Seller;
