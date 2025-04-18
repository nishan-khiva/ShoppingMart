import React from 'react'

const Never = () => {
    return (
        <div className='px-18 py-9 flex flex-col justify-center items-center' >
            <h1 className='text-3xl font-semibold'>Never Miss a Deal!</h1>
            <p className='font-sans '>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
            <div className="flex mt-4 w-full max-w-md">
                <input
                    type="email"
                    placeholder="Enter your email ID"
                    className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition"
                >
                    Subscribe
                </button>
            </div>



        </div>
    )
}

export default Never
