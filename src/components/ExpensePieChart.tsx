"use client";

import React from "react";
import { Pie, PieChart, Tooltip, Cell, ResponsiveContainer, Legend, Label } from "recharts";

interface Transaction {
  category: string;
  amount: number;
  type: "expense";
}

interface ExpensePieChartProps {
  transactions: Transaction[];
}

export default function ExpensePieChart({ transactions }: ExpensePieChartProps) {
  // ✅ Group expenses by category
  const categoryTotals: { [key: string]: number } = {};
  let totalExpense = 0;

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
      totalExpense += Math.abs(t.amount);
    }
  });

  // ✅ Format data for Pie Chart (Include Percentage)
  const data = Object.keys(categoryTotals).map((category) => ({
    category,
    value: categoryTotals[category],
    percentage: ((categoryTotals[category] / totalExpense) * 100).toFixed(1), // ✅ Calculate percentage
  }));

  // ✅ Define vibrant colors
  const colors = [
    "#ff6384", // Red
    "#36a2eb", // Blue
    "#ffce56", // Yellow
    "#4bc0c0", // Teal
    "#9966ff", // Purple
    "#ff9f40", // Orange
    "#e7e9ed", // Grey
    "#ffcd56", // Light Yellow
    "#c9cbcf", // Soft Grey
    "#29b6f6", // Sky Blue
    "#ab47bc", // Deep Purple
    "#ef5350", // Light Red
  ];

  return (
    <div className="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Expense Breakdown</h2>
      {data.length === 0 ? (
        <p className="text-gray-400 text-center">No expenses for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`₹${value}`, name]} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
