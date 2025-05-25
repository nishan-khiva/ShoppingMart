import React, { useState, useEffect } from 'react';
import axios from 'axios';
import profileicon from '../assets/profile_icon.png'
const ProfileOverview = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('')
  const [isEditing, setIsEditing] = useState(false); // For toggling between view and edit mode



  // On page load, load user data from localStorage
  useEffect(() => {
    setName(localStorage.getItem('userName') || '');
    setEmail(localStorage.getItem('userEmail') || '');
    setUserId(localStorage.getItem('userId') || '');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`http://localhost:4000/user/updateprofile/${userId}`, { name, email }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res)
      // Update localStorage with new data
      localStorage.setItem('userName', res.data.name);
      localStorage.setItem('userEmail', res.data.email);

      // Switch back to view mode
      setIsEditing(false);
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-3">
      <h2 className="text-2xl font-semibold mb-6">Profile Information</h2>
      <div className='flex'>
        {/* Profile Overview or Edit Form */}
        {isEditing ? (
          <div>
            <h3 className="text-lg font-medium mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <input
                className="w-full mb-3 p-2 border rounded"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
              <input
                className="w-full mb-3 p-2 border rounded"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </form>
            <button
              className="mt-4 text-blue-600"
              onClick={() => setIsEditing(false)} // Switch to view mode
            >
              Cancel
            </button>
          </div>
        ) : (
          <div>
            <p className="text-lg font-medium">{name}</p>
            <p className="text-gray-600">{email}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setIsEditing(true)} // Switch to edit mode
            >
              Edit Profile
            </button>
          </div>
        )}
        <div className='ml-[23vw] w-full flex items-center justify-center'>
          <img src={profileicon} className='w-[150px] '/>
        </div>
      </div>
    </div>
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-3 space-y-1">
      <h3 className='font-semibold text-xl'>FAQs</h3>
      <h2 className='font-medium'>What happens when I update my email address? </h2>
      <p className='text-[14px]'>Your login email id  changes, likewise. 
        You'll receive all your account related communication on your updated email address 
      </p>

      <h2 className='font-medium'>What happens to my existing Flipkart account when I update my email address? </h2>
      <p className='text-[14px]'>Updating your email address  doesn't invalidate your account. Your account remains fully functional.
         You'll continue seeing your Order history, saved information and personal details.
      </p>
    </div>
    </>
  );
};

export default ProfileOverview;
