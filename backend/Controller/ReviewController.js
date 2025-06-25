
const Review = require('../Models/ReviewSchema');
const Order = require('../Models/OrderSchema');

// POST: Submit Review
const submitReview = async (req, res) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const hasOrdered = await Order.findOne({
      userId,
      'items.productId': productId,
      status: 'Delivered'
    });

    if (!hasOrdered) {
      return res.status(403).json({ message: 'You can only review products you have received.' });
    }
    const review = new Review({
      userId,
      productId,
      rating,
      comment
    });

    await review.save();

    res.status(200).json({ message: 'Review submitted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to submit review.' });
  }
};

// ✅ GET: Check Eligibility
// const checkReviewEligibility = async (req, res) => {
//   const { productId } = req.params;
//   const userId = req.user.id;

//   try {
//     const hasOrdered = await Order.findOne({
//       userId,
//       'items.productId': productId,
//       status: 'Delivered'
//     });

//     res.json({ canReview: !!hasOrdered });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error checking review eligibility.' });
//   }
// };

const checkReviewEligibility = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  try {
    // 1. Check if the user has ordered the product and it’s delivered
    const hasOrdered = await Order.findOne({
      userId,
      'items.productId': productId,
      status: 'Delivered'
    });

    // 2. Get all reviews for this product
    const reviews = await Review.find({ productId }).select('-__v').populate('userId', 'name').lean();

    res.json({
      canReview: !!hasOrdered,
      reviews: reviews.map(review => ({
        _id: review._id,
        user: review.userId,
        name: review.userId.name, // optionally populate user name
        rating: review.rating,
        comment: review.comment
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking review eligibility.' });
  }
};


module.exports = {
  submitReview,
  checkReviewEligibility
};
