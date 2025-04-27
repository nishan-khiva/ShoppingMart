import React from 'react'
import banner from '../assets/banner.png'
import { Link } from 'react-router-dom'

const MainBanner = () => {
  return (
    <div className="relative px-4 sm:px-10 md:px-18 py-8">
      <img
        src={banner}
        alt="banner"
        className="w-full h-auto object-cover"
      />

      <div className="absolute top-[28%] sm:top-[25%] left-[8%] sm:left-[15%] w-[50%] sm:w-[60%] md:w-[40%] font-semibold">
        <h1 className="sm:text-lg md:text-5xl leading-snug sm:leading-tight mb-4 sm:top-[]">
          Freshness You Can Trust, Savings You will Love!
        </h1>


        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
          <Link
            to="/all-products"
            className="border px-4 py-1 rounded-[4px] text-xs sm:text-base cursor-pointer"
          >
            Shop Now
          </Link>

          <div className="flex items-center group cursor-pointer text-xs sm:text-base">
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
  )
}

export default MainBanner
