import React from 'react'
import Banner from "../assets/bottom_banner_image.png"

const BottomBanner = () => {
    return ( 
    <div className='relative px-4 md:px-18 py-6'>
        
        {/* Banner Image only visible on md and above */}
        <img src={Banner} className="hidden md:block w-full h-auto" alt="Banner" />
        
        {/* Text Content */}
        <div className='relative md:absolute md:top-22 md:left-180'>
            <h1 className='text-2xl md:text-4xl text-green-600 font-semibold'>Why We Are the Best?</h1>

            <div className='flex gap-2 py-4'>
                <div>
                    <img src='/delivery_truck.svg' className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className='leading-4 md:leading-6'>
                    <h1 className='font-semibold text-md md:text-xl'>Fastest Delivery</h1>
                    <p className='opacity-60 text-sm md:text-base'>Groceries delivered in under 30 minutes.</p>
                </div>
            </div>

            <div className='flex gap-2 py-2'>
                <div>
                    <img src='/leaf_icon.svg' className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className='leading-4 md:leading-6'>
                    <h1 className='font-semibold text-md md:text-xl'>Freshness Guaranteed</h1>
                    <p className='opacity-60 text-sm md:text-base'>Fresh produce straight from the source..</p>
                </div>
            </div>

            <div className='flex gap-2 py-2'>
                <div>
                    <img src='/coin_icon.svg' className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className='leading-4 md:leading-6'>
                    <h1 className='font-semibold text-md md:text-xl'>Affordable Prices</h1>
                    <p className='opacity-60 text-sm md:text-base'>Fresh produce straight from the source..</p>
                </div>
            </div>

            <div className='flex gap-2 py-2'>
                <div>
                    <img src='/trust_icon.svg' className="w-6 h-6 md:w-8 md:h-8" />
                </div>
                <div className='leading-4 md:leading-6'>
                    <h1 className='font-semibold text-md md:text-xl'>Trusted by Thousands</h1>
                    <p className='opacity-60 text-sm md:text-base'>Loved by 10,000+ happy customers.</p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default BottomBanner
