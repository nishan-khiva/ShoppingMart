// routes/reviewRoutes.js

const express = require('express');
const router = express.Router();
const { submitReview, checkReviewEligibility } = require('../Controller/ReviewController');
const { verifyToken } = require('../Middleware/Auth');

//  Submit review route (POST)
router.post('/submit-review', verifyToken, submitReview);

// Check eligibility route (GET)
router.get('/can-review/:productId', verifyToken, checkReviewEligibility);

module.exports = router;
