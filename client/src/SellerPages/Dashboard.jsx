import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useProducts } from "../Context/ProductContext";
import api from "../Api/axiosInstance";

const Dashboard = () => {
  const { products, loading } = useProducts();
  const [salesData, setSalesData] = useState([]);
  const [salesLoading, setSalesLoading] = useState(true);

 const orderCount = salesData.length > 0 ? salesData[0].orderCount : 0;
const totalRevenue = salesData.length > 0 ? salesData[0].totalRevenue : 0;

const stats = [
  { title: "Total Products", value: products.length },
  { title: "Total Orders", value: orderCount },
  { title: "Total Revenue", value: `₹${totalRevenue}` },
  { title: "Pending Orders", value: 5 },
];

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await api.get("/api/sales/monthly");
        setSalesData(response.data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setSalesLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  if (loading || salesLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow flex flex-col items-center md:items-start">
            <h4 className="text-gray-500 text-sm">{stat.title}</h4>
            <p className="text-xl md:text-2xl font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Sales Chart */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
        <h2 className="text-lg md:text-xl font-semibold mb-4">Monthly Sales</h2>
        <div className="w-full h-[200px] md:h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="totalRevenue" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
