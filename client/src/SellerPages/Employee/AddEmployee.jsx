import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const employeeId = searchParams.get('id');

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    status: 'Active',
    email: '',
    password: '',
    image: null,
  });
  useEffect(() => {
    if (employeeId) {
      const fetchEmployee = async () => {
        try {
          const res = await axios.get(`http://localhost:4000/employees/${employeeId}`);
          const data = res.data;
          setFormData({
            name: data.name,
            role: data.role,
            status: data.status,
            email: data.email,
            password: '',
            image: null, 
          });
        } catch (err) {
          console.error('Error loading employee:', err);
        }
      };
      fetchEmployee();
    }
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('role', formData.role);
    formDataToSend.append('status', formData.status);
    formDataToSend.append('email', formData.email);
    if (formData.password) {
      formDataToSend.append('password', formData.password);
    }
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (employeeId) {
        await axios.put(`http://localhost:4000/employees/${employeeId}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Employee updated successfully!');
      } else {
        await axios.post('http://localhost:4000/employees/', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        alert('Employee added successfully!');
      }
      navigate('/seller/employee-list');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="px-6 w-full">
      <h2 className="text-2xl font-semibold mb-4">
        {employeeId ? 'Edit Employee' : 'Add Employee'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
            disabled={!!employeeId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Password {employeeId && '(leave blank to keep old password)'}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required={!employeeId}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="HR">HR</option>
            <option value="Intern">Employee</option>
           <option value="Intern">Admin</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <div className="flex items-center space-x-4">
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === 'Active'}
                onChange={handleChange}
                className="mr-2"
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={formData.status === 'Inactive'}
                onChange={handleChange}
                className="mr-2"
              />
              Inactive
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Employee Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded"
            accept="image/*"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {employeeId ? 'Update Employee' : 'Add Employee'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
