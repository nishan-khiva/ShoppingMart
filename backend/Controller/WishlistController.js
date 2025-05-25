const Wishlist = require("../Models/WishlistSchema");

// Add or remove item from wishlist (toggle)
exports.toggleWishlist = async (req, res) => {
    const userId = req.user._id; 
    const { productId } = req.body;

    try {
        const existing = await Wishlist.findOne({ user: userId, product: productId });

        if (existing) {
            await Wishlist.deleteOne({ _id: existing._id });
            return res.json({ message: "Removed from wishlist" });
        } else {
            const newWish = new Wishlist({ user: userId, product: productId });
            await newWish.save();
            return res.json({ message: "Added to wishlist" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all wishlist items of logged in user
exports.getUserWishlist = async (req, res) => {
    try {
        const userId = req.user._id;
        const wishlist = await Wishlist.find({ user: userId }).populate("product");
        res.json(wishlist.map(item => item.product)); // 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
