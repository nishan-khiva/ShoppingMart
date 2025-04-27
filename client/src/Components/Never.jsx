import React, { useState } from 'react';

const Never = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        setEmail('');
        alert('Thank you for subscribing!');
    };

    return (
        <div className='px-6 sm:px-18 py-9 flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-semibold text-center'>Never Miss a Deal!</h1>
            <p className='font-sans text-center mt-2'>Subscribe to get the latest offers, new arrivals, and exclusive discounts.</p>
            <div className="flex mt-4 w-full max-w-lg">
                <form onSubmit={handleSubscribe} className='flex w-full'>
                    <input
                        type="email"
                        placeholder="Enter your email ID"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-l px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700 transition w-full sm:w-auto"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Never;
