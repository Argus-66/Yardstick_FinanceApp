"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Transaction {
  amount: number;
  date: string;
  description: string;
  category: string;
}

export default function ExpenseCharts({ transactions }: { transactions: Transaction[] }) {
  if (transactions.length === 0) {
    return <p className="text-center text-gray-400">No transactions to display charts.</p>;
  }

  // 📌 Group transactions by category
  const categoryData = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.keys(categoryData).map((key) => ({ name: key, value: categoryData[key] }));

  // 📌 Group transactions by month
  const monthlyData = transactions.reduce((acc, tx) => {
    const month = new Date(tx.date).toLocaleString("default", { month: "short", year: "numeric" });
    acc[month] = (acc[month] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const barData = Object.keys(monthlyData).map((key) => ({ name: key, amount: monthlyData[key] }));

  // 📌 Define Pie Chart Colors
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#D988B9"];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-center mb-4">📊 Expense Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Monthly Spending</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
