require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

require('./Models/DBConnection'); // MongoDB Connection
const productRoutes = require('./Router/ProductsRouter');
const userRoutes = require('./Router/UserSignRouter');
const categoryRoutes = require('./Router/CategoryRouter');
const employeeRoutes = require('./Router/EmployeeRoutes'); 
const orderRoutes = require('./Router/OrderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Serve uploaded images statically
app.use('/uploads', express.static(uploadDir));

// Routes
app.use('/products', productRoutes);
app.use('/user', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/employees', employeeRoutes);  
app.use('/api/orders', orderRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("Hello, this is the server page!");
});

// Start Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
