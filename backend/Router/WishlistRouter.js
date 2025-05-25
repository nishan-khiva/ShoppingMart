const express = require('express');
const router = express.Router();
const { verifyToken } = require('../Middleware/Auth');
const { toggleWishlist, getUserWishlist } = require('../Controller/WishlistController');

router.post('/toggle', verifyToken ,toggleWishlist);
router.get('/',verifyToken , getUserWishlist);

module.exports = router;