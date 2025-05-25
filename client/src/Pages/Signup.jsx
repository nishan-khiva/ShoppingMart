import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const Signup = ({ onLoginClick, onSignSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:4000/user/sign", formData);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'User Successfully Registred',
                    showConfirmButton: false,
                    timer: 2000
                })
                setFormData({ name: '', email: '', password: '', confirmpassword: '' });
                onSignSuccess();
                localStorage.setItem('token', response.data.token);
            }
        }
        catch (error) {
            if (error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.response.data.message,
                    showConfirmButton: false,
                    timer: 2000
                });
            } else {
                Swal.fire('Oops!', 'Something went wrong. Please try again.', 'error');
            }
        }
    }

    return (
        <div className="flex items-center justify-center relative p-[3px] rounded-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-border-motion overflow-hidden">
            <form onSubmit={handleSubmit} className="bg-gray-200 m-auto px-10 py-5 rounded-xl shadow-md w-full max-w-sm ">
                <h2 className="text-2xl font-bold text-center text-green-500 mb-6">
                    Create <span className="text-gray-800">Account</span>
                </h2>

                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="email"
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="password"
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="password"
                        name='confirmpassword'
                        value={formData.confirmpassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                        required
                    />

                    <button
                        type="submit"
                        className="bg-green-500 text-white py-2 rounded hover:bg-green-600 transition duration-200"
                    >
                        Sign Up
                    </button>

                    <p className="text-sm text-center mt-2">
                        Already have an account?{' '}
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="text-green-600 hover:underline font-medium"
                        >
                            Click here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;
