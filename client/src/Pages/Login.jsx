import React, { useState } from 'react'
import Swal from 'sweetalert2';
import api from '../Api/axiosInstance'
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Login = ({ onSignupClick, onLoginSuccess }) => {
    const [form, setForm] = useState({
        email: 'nishankhiva@gmail.com',
        password: '1234'
    });
    const [loading, setLoading] = useState(false); // <-- New loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loader
        try {
            const response = await api.post("/user/login", form);

            if (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'Welcome!',
                    text: 'User Successfully Login',
                    showConfirmButton: false,
                    timer: 2000
                });
                setForm({ email: '', password: '' });
                onLoginSuccess();
                const token = response.data.token;
                localStorage.setItem('token', token);
                const decodedToken = jwtDecode(token);
                const userName = decodedToken.name;
                const userEmail = decodedToken.email;
                const userId = decodedToken.userId;
                localStorage.setItem('userName', userName);
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('userId',userId)
            }
        } catch (error) {
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
        } finally {
            setLoading(false); // Stop loader
        }
    }
    

    return (
        <div className='relative p-[3px] rounded-xl bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-border-motion overflow-hidden'>
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
    );
}

export default Login;
