import React from 'react'
import Banner from "../assets/bottom_banner_image.png"

const BottomBanner = () => {
    return (
        <div className='px-18 py-6 relative' >
            <img src={Banner} />
            <div className='absolute top-22 left-180'>
                <h1 className='text-4xl text-green-600 font-semibold'>Why We Are the Best?</h1>
                <div className='flex gap-1 py-4'>
                    <div>
                        <img src='/delivery_truck.svg' />
                    </div>
                    <div className='leading-3'>
                        <h1 className='font-semibold text-xl'>Fastest Delivery</h1>
                        <p className='opacity-40'>Groceries delivered in under 30 minutes.</p>
                    </div>
                </div>

                <div className='flex gap-1 '>
                    <div>
                        <img src='/leaf_icon.svg' />
                    </div>
                    <div className='leading-3'>
                        <h1 className='font-semibold text-xl'>Freshness Guaranteed</h1>
                        <p className='opacity-40'>Fresh produce straight from the source..</p>
                    </div>
                </div>

                <div className='flex gap-1 py-3 '>
                    <div>
                        <img src='/coin_icon.svg' />
                    </div>
                    <div className='leading-3'>
                        <h1 className='font-semibold text-xl'>Affordable Prices</h1>
                        <p className='opacity-40'>Fresh produce straight from the source..</p>
                    </div>
                </div>

                <div className='flex gap-1 py-3 '>
                    <div>
                        <img src='/trust_icon.svg' />
                    </div>
                    <div className='leading-3'>
                        <h1 className='font-semibold text-xl'>Trusted by Thousands</h1>
                        <p className='opacity-40'>Loved by 10,000+ happy customers.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BottomBanner
