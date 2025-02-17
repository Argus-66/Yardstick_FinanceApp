"use client";

import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface Transaction {
  category: string;
  amount: number;
  type: "income" | "expense";
}

interface ExpensePieChartProps {
  transactions: Transaction[];
}

export default function ExpensePieChart({ transactions }: ExpensePieChartProps) {
  // ✅ Filter only expenses
  const expenseTransactions = transactions.filter((t) => t.type === "expense");

  // ✅ Group expenses by category
  const categoryTotals: { [key: string]: number } = {};
  expenseTransactions.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
  });

  // ✅ Convert data for Pie Chart
  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  // ✅ Define Pie Chart Colors
  const COLORS = [
    "#ff7675", "#fab1a0", "#fd79a8", "#636e72", "#0984e3",
    "#6c5ce7", "#00cec9", "#fdcb6e", "#e17055", "#b2bec3"
  ];

  return (
    <div className="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Expense Breakdown</h2>
      {data.length === 0 ? (
        <p className="text-gray-400 text-center">No expenses recorded for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
