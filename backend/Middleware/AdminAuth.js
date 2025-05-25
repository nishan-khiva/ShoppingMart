// middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Employee = require('../Models/EmpoyeeSchema')
exports.adminToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token,  process.env.JWT_SECRET2); 
    const user = await Employee.findById(decoded.userId);   

    if (!user) return res.status(404).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
