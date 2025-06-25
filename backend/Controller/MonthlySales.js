const Order = require("../Models/OrderSchema");

// GET: Monthly Sales Data for Dashboard
const getMonthlySales = async (req, res) => {
  try {
    const monthlySales = await Order.aggregate([
      { $match: { status: "Delivered" } }, // only delivered orders
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$finalAmount" },
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    // Optional: Convert numeric month to name
    const monthNames = [
      "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const formattedData = monthlySales.map((item) => ({
      month: monthNames[item._id],
      totalRevenue: item.totalRevenue,
      orderCount: item.orderCount,
    }));

    res.status(200).json(formattedData);

  } catch (error) {
    console.error("Error fetching monthly sales:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = {
  getMonthlySales
};
