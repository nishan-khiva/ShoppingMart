import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaTachometerAlt, FaAddressBook } from "react-icons/fa";

const Seller = () => {
    return (
        <>
            <div className='flex h-screen overflow-hidden mt-[10vh] '>
                <div className='w-[18vw] h-full border-r px-4 py-6 font-medium bg-white sticky top-0'>
                    <div className='flex flex-col gap-6'>
                        <Link to="/seller" className='flex gap-2 items-center hover:underline'>
                            <FaTachometerAlt size={20} className="text-gray-600" />
                            <p>Dashboard</p>
                        </Link>
                        <Link to="add-category" className='flex gap-2 items-center hover:underline'>
                            <img src="/add_icon.svg" alt="Add" />
                            <p>Add Category</p>
                        </Link>
                        <Link to="product-list" className='flex gap-2 items-center hover:underline'>
                            <img src="/product_list_icon.svg" alt="List" />
                            <p>Manage Products</p>
                        </Link>
                        
                        <Link to="order-list" className='flex gap-2 items-center hover:underline'>
                            <img src="/order_icon.svg" alt="Orders" />
                            <p>Order List</p>
                        </Link>
                        <Link to="employee-list" className='flex gap-2 items-center hover:underline'>
                            <FaAddressBook size={21} />
                            <p>Employee List</p>
                        </Link>
                    </div>
                </div>

                <div className='flex-1 h-full overflow-y-auto p-4 scrollbar-hide'>
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Seller;
