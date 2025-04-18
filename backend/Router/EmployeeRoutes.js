// EmployeeRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const { addEmployee, getAllEmployees,deleteEmployee,updateEmployee,loginEmployee,getEmployeeById } = require('../Controller/EmployeeController');  // Import controller functions

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');  // Ensure this folder exists or create it
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Add timestamp to avoid filename conflicts
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('image'), addEmployee);  
router.get('/', getAllEmployees);
router.get('/:id', getEmployeeById);
router.delete('/:id', deleteEmployee);
router.put('/:id', upload.single('image'),updateEmployee);
router.post('/login', loginEmployee);


module.exports = router;
