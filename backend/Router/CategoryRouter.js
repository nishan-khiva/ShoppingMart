const express = require('express');
const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const Category = require('../Models/CategorySchema');
const upload = require('../Middleware/upload'); // Assuming you have a middleware for file uploads

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getProductsByCategory
} = require('../Controller/CategoryController');

// // Multer setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // save in /uploads folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique name
//   }
// });

// const upload = multer({ storage });

// Routes
router.get('/', getCategories);
router.post('/', upload.single('image'), createCategory);
router.put('/:id', upload.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

router.get('/:categoryName/products', getProductsByCategory);

module.exports = router;

