import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../Api/axiosInstance'
import { jwtDecode } from 'jwt-decode';

const SellerLogin = ({ setIsSellerLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('nishankhiva@gmail.com');
  const [password, setPassword] = useState('1234');


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/employees/login', {
        email,
        password,
      });
      if (res.status === 200) {
        localStorage.setItem('isSellerLoggedIn', 'true');
        const token = res.data.token
        localStorage.setItem('token1', token);
        const decodeToken = jwtDecode(token);
        const emplyname = decodeToken.name;
        const role= decodeToken.role;
        localStorage.setItem('emplyname', emplyname);
        localStorage.setItem('role',role);
        setIsSellerLoggedIn(true);
        navigate('/seller');
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or server error');
    }
  };

  return (
    <div className='mt-[20vh]'>
      <form onSubmit={handleSubmit} className="flex items-center justify-center mt-[10vh]">
        <div className="bg-white px-10 py-8 rounded-xl shadow-md w-full max-w-sm">
          <h2 className="text-2xl text-green-400 font-semibold mb-6 text-center">
            Seller <span className='text-gray-700'>Login</span>
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2"
              required
            />
            <button
              type="submit"
              className="bg-green-400 text-white py-2 rounded hover:bg-green-700 transition duration-200"
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SellerLogin;