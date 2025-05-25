// EmployeeController.js
require('dotenv').config();
const Employee = require('../Models/EmpoyeeSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Function to add a new employee
exports.addEmployee = async (req, res) => {
  const { name, role, status, email, password } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newEmployee = new Employee({ name, role, status, email, password, image });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).json({ message: 'Error adding employee', error });
  }
};

// Function to fetch all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);  // Send the list of employees back
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).send('Server error');
  }
};
// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ message: 'Error fetching employee', error });
  }
};


exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ message: 'Error deleting employee', error });
  }
};

// Function to edit/update an employee
exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, role, status } = req.body;
  const image = req.file ? req.file.filename : undefined;

  const updatedFields = { name, role, status };
  if (image) updatedFields.image = image;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedFields, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ message: 'Error updating employee', error });
  }
};

//login
exports.loginEmployee = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    // Compare password
    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    // Generate JWT Token
    const token = jwt.sign(
      { employeeId: employee._id, role: employee.role, name:employee.name },
      process.env.JWT_SECRET2, 
      { expiresIn: '1h' }
    );

    // Successful login response
    res.status(200).json({ success: true, message: 'Login successful',token, });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
