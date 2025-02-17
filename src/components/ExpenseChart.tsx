"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useMediaQuery } from "react-responsive"; 

// ✅ Explicitly Define `Transaction` Type
interface Transaction {
  _id: string;  // Ensure every transaction has an ID
  category: string;
  amount: number;
  type: "income" | "expense"; // ✅ Allow both income and expense types
}

interface ExpenseChartProps {
  transactions: Transaction[];
}

export default function ExpenseChart({ transactions }: ExpenseChartProps) {
  // ✅ Detect screen size
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // ✅ Group transactions by category (Only Expenses)
  const categoryTotals: Record<string, number> = {}; // ✅ Ensures type safety
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + Math.abs(t.amount);
    }
  });

  // ✅ Format data for the Bar Chart
  const data = Object.keys(categoryTotals).map((category) => ({
    category,
    expense: categoryTotals[category],
  }));

  return (
    <div className="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Monthly Expenses</h2>
      {data.length === 0 ? (
        <p className="text-gray-400 text-center">No expenses for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout={isMobile ? "vertical" : "horizontal"}>
            <XAxis 
              type={isMobile ? "number" : "category"} 
              dataKey={isMobile ? undefined : "category"} 
              tick={{ fill: "white" }} 
            />
            <YAxis 
              type={isMobile ? "category" : "number"} 
              dataKey={isMobile ? "category" : undefined} 
              tick={{ fill: "white" }} 
              width={120} 
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="expense" fill="red" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
