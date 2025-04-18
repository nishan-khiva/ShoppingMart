import React from 'react'
import banner from '../assets/banner.png'
import {Link} from 'react-router-dom'
const MainBanner = () => {
    return (
        <div className='relative px-4 sm:px-10 md:px-18 py-8'>
            <img src={banner} alt='banner' className='w-full h-auto object-cover' />
    
            <div className='absolute top-[20%] sm:top-[25%] left-[10%] sm:left-40 w-[80%] sm:w-[32vw] font-semibold'>
                <h1 className='text-2xl sm:text-4xl md:text-5xl leading-snug sm:leading-tight mb-4'>
                    Freshness You Can Trust, Savings You will Love!
                </h1>
    
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
                    <Link
                        to={"/all-products"}
                        className='border rounded-2xl px-4 py-1 text-sm sm:text-base cursor-pointer'
                    >
                        Shop Now
                    </Link>
    
                    <div className="flex items-center group cursor-pointer text-sm sm:text-base">
                        <a href="#">Explore deals</a>
                        <img
                            src="/black_arrow_icon.svg"
                            alt="arrow"
                            className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    
}

export default MainBanner
