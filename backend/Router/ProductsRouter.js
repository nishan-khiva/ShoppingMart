const express = require('express');
const router = express.Router();
const productController = require('../Controller/ProductsController');
const upload = require('../Middleware/upload')


// Specific routes — keep first
router.get('/bestsellers', productController.getBestSellers);
router.put('/:id/toggle-bestseller', productController.toggleBestSeller);


// Create a new product
router.post(
    '/',
    upload.fields([{ name: 'productimage', maxCount: 1 }]),
    productController.createProduct
);

// Get all products
router.get('/', productController.getAllProducts);

// Get single product by ID
router.get('/:id', productController.getProductById);

// Update a product by ID
router.put('/:id', productController.updateProduct);


// Delete a product by ID
router.delete('/:id', productController.deleteProduct);


module.exports = router;
