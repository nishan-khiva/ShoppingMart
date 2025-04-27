import React from 'react';
import { useCart } from '../Context/CartContext';
import Potato from '../assets/potato_image_1.png';
import Carrot from '../assets/carrot_image.png';
import Tomato from '../assets/tomato_image_2.png';
import Onion from '../assets/onion_image_1.png';
import Spinach from '../assets/spinach_image_1.png';
import Swal from 'sweetalert2';

const BestSeller = () => {
  const { addToCart } = useCart();

  const products = [
    {
      _id: '1',
      productname: 'Potato 500g',
      sellprice: 35,
      originalprice: 40,
      productimage: Potato,
    },
    {
      _id: '2',
      productname: 'Carrot 500g',
      sellprice: 45,
      originalprice: 50,
      productimage: Carrot,
    },
    {
      _id: '3',
      productname: 'Tomato 1kg',
      sellprice: 30,
      originalprice: 40,
      productimage: Tomato,
    },
    {
      _id: '4',
      productname: 'Onion 500g',
      sellprice: 35,
      originalprice: 40,
      productimage: Onion,
    },
    {
      _id: '5',
      productname: 'Spinach 500g',
      sellprice: 33,
      originalprice: 44,
      productimage: Spinach,
    },
  ];

  return (
    <div className='px-4 sm:px-6 lg:px-18 py-6'>
      <h1 className='text-3xl font-semibold mb-4'>Best Seller</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
        {products.map((product) => (
          <div key={product._id} className='flex flex-col border border-gray-400 rounded p-4'>
            <img
              src={product.productimage}
              alt={product.productname}
              className='transition-transform duration-300 hover:scale-105 w-full h-auto'
            />
            <p className='opacity-40 text-sm mt-2'>Vegetables</p>
            <h3 className='font-semibold text-lg mt-2'>{product.productname}</h3>
            <div className='flex gap-1 mt-1'>
              {[1, 2, 3, 4, 5].map((i) => (
                <img
                  key={i}
                  src='/star_icon.svg'
                  className={`w-3.5 ${i >= 4 ? 'opacity-50' : ''}`}
                  alt='star'
                />
              ))}
            </div>
            <div className='flex gap-1 justify-between items-center mt-4'>
              <h2 className='text-green-600 font-semibold text-xl'> ₹{product.sellprice}</h2>
              <p className='line-through opacity-40 text-[14px] mt-[2px]'>₹{product.originalprice}</p>
              <button
                onClick={() => {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    Swal.fire({
                      icon: 'info',
                      title: 'Please Login First',
                      text: 'You need to be logged in to add items to the cart.',
                      showConfirmButton: true,
                      confirmButtonColor: '#3085d6',
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
    </div>
  );
};

export default BestSeller;
