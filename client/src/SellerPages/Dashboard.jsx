import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useProducts } from "../Context/ProductContext";

 
const Dashboard = () => {
    const { products, setProducts, loadProducts, loading } = useProducts();

  // No need to call fetchProducts again
  if (loading) return <p>Loading...</p>;


  const stats = [
    { title: "Total Products", value: products.length },
    { title: "Total Orders", value: 23 },
    { title: "Total Revenue", value: "₹32,400" },
    { title: "Pending Orders", value: 5 },
  ];

  const data = [
    { name: "Jan", sales: 4000 },
    { name: "Feb", sales: 3000 },
    { name: "Mar", sales: 5000 },
    { name: "Apr", sales: 4000 },
  ];



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
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#4ade80" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
