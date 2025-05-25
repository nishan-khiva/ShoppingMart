import React from 'react'

const Footer = () => {
    return (
        <div className="bg-green-100 mt-[16vh]">
            <div className="flex flex-col md:flex-row py-10 px-4 md:justify-between gap-10 md:gap-0">
                <div className="md:w-[30vw]">
                    <h1 className="text-2xl font-semibold">NishanMart</h1>
                    <p className="font-semibold opacity-50 mt-2">
                        We deliver fresh groceries and snacks straight to your door. Trusted by thousands, we aim to make your shopping experience simple and affordable.
                    </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-[16px]">Quick Links</h1>
                        <div className="font-sans opacity-45 flex flex-col text-[14px] mt-1">
                            <a href="#">Home</a>
                            <a href="#best">Best Seller</a>
                            <a href="#">Offers & Deals</a>
                            <a href="#">Contact us</a>
                            <a href="#">FAQs</a>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-[16px]">Need Help?</h1>
                        <div className="font-sans opacity-45 flex flex-col text-[14px] mt-1">
                            <a href="#">Delivery Information</a>
                            <a href="#">Return & Refund Policy</a>
                            <a href="#">Payment Methods</a>
                            <a href="#">Track your Order</a>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-[16px]">Follow Us</h1>
                        <div className="font-sans opacity-45 flex flex-col text-[14px] mt-1">
                            <a href="https://www.instagram.com/nishan_khiva_/reels/">Instagram</a>
                            <a href="https://www.facebook.com/people/Nishan-Singh-Khiva/pfbid0qTJHCT5roNvm74SB58HguVL4S91G1XGiYGs12XBjMfpHPsQssjQvCoDQBt2YbMa7l/">Facebook</a>
                            <a href="#">Twitter</a>
                            <a href="https://www.youtube.com/@nishankhivavlogs6499">You Tube</a>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="w-[80vw] m-auto text-gray-400" />
            <div className="p-3">
                <p className="text-center font-semibold mt-2">
                    Copyright © 2025 Author: Nishan Singh
                </p>
            </div>
        </div>
    );
};


export default Footer
