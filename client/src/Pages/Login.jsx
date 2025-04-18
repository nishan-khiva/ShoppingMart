import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onSignupClick, onLoginSuccess }) => {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://shoppingmart-u430.onrender.com/user/login", form);
            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'User Successfully Login',
                    showConfirmButton: false,
                    timer: 2000
                })
                setForm({ email: '', password: '' });
                onLoginSuccess();
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            console.error("Login Error:", error);
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
        <div>

            <form onSubmit={handleSubmit} className="flex items-center justify-center ">
                <div className="bg-gray-200 px-10 py-8 rounded-xl shadow-md w-full h-full max-w-sm">
                    <h2 className="text-2xl text-green-400 font-semibold mb-6 text-center">User <span className='text-gray-700'>Login</span></h2>
                    <div className="flex flex-col gap-4">
                        <input
                            type="email"
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="password"
                            name='password'
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button
                            type="submit"
                            className="bg-green-400 text-white py-2 rounded hover:bg-green-700 transition duration-200"
                        >
                            Log In
                        </button>

                        <p className="text-sm text-center mt-2">
                            Don't have an account?{' '}
                            <button
                                type="button"
                                onClick={onSignupClick}
                                className="text-green-600 hover:underline font-medium"
                            >
                                Click here
                            </button>
                        </p>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default Login
