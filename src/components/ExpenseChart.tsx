"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  date: string;
  amount: number;
  type: "income" | "expense";
  category: string;
}

interface ExpenseChartProps {
  transactions: Transaction[];
  selectedCategory: string;
}

export default function ExpenseChart({ transactions, selectedCategory }: ExpenseChartProps) {
  // ✅ Filter transactions by category
  const filteredTransactions = selectedCategory
    ? transactions.filter((t) => t.category === selectedCategory)
    : transactions;

  // ✅ Group by date
  const dailyTotals = filteredTransactions.reduce((acc, t) => {
    const day = new Date(t.date).getDate();
    acc[day] = acc[day] || { day, income: 0, expense: 0 };
    acc[day][t.type] += Math.abs(t.amount);
    return acc;
  }, {} as Record<number, { day: number; income: number; expense: number }>);

  const chartData = Object.values(dailyTotals);

  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl text-white font-bold mb-4">Monthly Expenses</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#10b981" name="Income" />
          <Bar dataKey="expense" fill="#ef4444" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
