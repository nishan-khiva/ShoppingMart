const Category = require('../Models/CategorySchema');
const Product = require('../Models/ProductSchema')

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Add category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.path : null;

    const category = new Category({ name, image });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category' });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.path : undefined;

    const updatedFields = { name };
    if (image) updatedFields.image = image;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

// Get products by category name
exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryName = req.params.categoryName;

    // Case-insensitive matching
    const products = await Product.find({
      productcategory: { $regex: new RegExp(categoryName, 'i') }
    });

    res.json(products);
  } catch (err) {
    console.error("Error in getProductsByCategory:", err);
    res.status(500).json({ error: 'Failed to fetch products for category' });
  }
};




