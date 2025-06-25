const Product = require('../Models/ProductSchema');
// const multer = require("multer");
// const path = require("path");
const upload = require('../Middleware/upload');

// // Multer Storage
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + path.extname(file.originalname));
//     },
// });

// const upload = multer({ storage: storage });

// Create Product
// exports.createProduct = [
//     upload.single("productimage"),
//     async (req, res) => {
//         try {
//             const product = new Product({
//                 productimage: req.file?.filename || "",
//                 productname: req.body.productname,
//                 productdesc: req.body.productdesc,
//                 productcategory: req.body.productcategory,
//                 productprice: req.body.productprice,
//                 sellprice: req.body.sellprice,
//             });

//             const savedProduct = await product.save();
//             res.status(201).json(savedProduct);
//         } catch (error) {
//             res.status(400).json({ error: error.message });
//         }
//     }
// ];

// Create Product
exports.createProduct = [
    upload.single("productimage"), // this should match your frontend field name
    async (req, res) => {
        try {
            const product = new Product({
                productimage: req.file?.path || "",  // Cloudinary provides .path
                productname: req.body.productname,
                productdesc: req.body.productdesc,
                productcategory: req.body.productcategory,
                productprice: req.body.productprice,
                sellprice: req.body.sellprice,
            });

            const savedProduct = await product.save();
            res.status(201).json(savedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get only best seller products
exports.getBestSellers = async (req, res) => {
    try {
        const bestSellers = await Product.find({ bestseller: true });
        res.status(200).json(bestSellers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Toggle bestseller status
exports.toggleBestSeller = async (req, res) => {
    try {
        const { bestseller } = req.body;

        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            { bestseller },
            { new: true }
        );

        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Bestseller status updated", product: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a product
exports.updateProduct = [
    upload.single("productimage"),
    async (req, res) => {
        try {
            const updateData = {
                productname: req.body.productname,
                productdesc: req.body.productdesc,
                productcategory: req.body.productcategory,
                productprice: req.body.productprice,
                sellprice: req.body.sellprice,
            };

            if (req.file) {
                updateData.productimage = req.file.filename;
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            );

            if (!updatedProduct)
                return res.status(404).json({ message: "Product not found" });

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
];


// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
