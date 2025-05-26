import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../Api/axiosInstance';
const API_URL = import.meta.env.VITE_API_URL;

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees/');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete employee
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id)); 
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Error deleting employee");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          Employee List
          <span className="ml-4 text-sm text-gray-600">Total Employees: {loading ? 'Loading...' : employees.length}</span>
        </h2>
        <Link to="/seller/add-employee" className="flex gap-2 items-center hover:underline">
          <img src="/add_icon.svg" alt="Add" className="w-5 h-5" />
          <p>Add Employee</p>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className="text-sm border-t hover:bg-gray-50">
                <td className="px-4 py-2 border">
                  <img
                    src={`${API_URL}/uploads/${employee.image}`}
                    alt={employee.name}
                    style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }}
                  />
                </td>
                <td className="px-4 py-2 border font-medium">{employee.name}</td>
                <td className="px-4 py-2 border font-medium">{employee.email}</td>
                <td className="px-4 py-2 border text-gray-600">{employee.role}</td>
                <td className="px-4 py-2 border">
                  <span className={`px-2 py-1 rounded-full text-white ${employee.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-6 border-r border-b text-center flex gap-2 justify-center">
                  <button
                    onClick={() => navigate(`/seller/add-employee?id=${employee._id}`)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit size={22} />
                  </button>
                  <button
                    onClick={() => handleDelete(employee._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash size={22} />
                  </button>
                </td>
              </tr>
            ))}
            {employees.length === 0 && !loading && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
