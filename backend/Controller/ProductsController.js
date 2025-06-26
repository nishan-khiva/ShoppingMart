const Product = require('../Models/ProductSchema');
const upload = require('../Middleware/upload'); 

// Create Product
exports.createProduct = async (req, res) => {
  try {
    const {
      productname,
      productdesc,
      productcategory,
      productprice,
      sellprice
    } = req.body;

    // 📦 Multi-field file access like 'photo' and 'signature'
    const file = req.files['productimage'] ? req.files['productimage'][0].path : "";

    // 🔧 Product model instance
    const product = new Product({
      productimage: file,
      productname,
      productdesc,
      productcategory,
      productprice,
      sellprice,
    });

    // 💾 Save to DB
    const savedProduct = await product.save();

    // ✅ Response
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Product creation error:", error);
    res.status(400).json({ error: error.message });
  }
};



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
  upload.fields([{ name: 'productimage', maxCount: 1 }]),  // 🔁 Changed from single to fields
  async (req, res) => {
    try {
      const {
        productname,
        productdesc,
        productcategory,
        productprice,
        sellprice
      } = req.body;

      const updateData = {
        productname,
        productdesc,
        productcategory,
        productprice,
        sellprice,
      };

      // 👇 Image from Cloudinary or file system
      if (req.files && req.files['productimage']) {
        updateData.productimage = req.files['productimage'][0].path;
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
      console.error("Update error:", error);
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
