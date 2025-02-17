"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  category: string;
  amount: number;
  type: "income" | "expense";
}

interface Budget {
  category: string;
  amount: number;
}

interface BudgetComparisonChartProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function BudgetComparisonChart({ transactions, budgets }: BudgetComparisonChartProps) {
  // ✅ Summarize expenses by category
  const actualExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  // ✅ Merge with budgets
  const chartData = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.amount,
    actual: actualExpenses[budget.category] || 0,
  }));

  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-lg">
      <h2 className="text-xl text-white font-bold mb-4">Budget vs. Actual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="budget" fill="#3b82f6" name="Budgeted" />
          <Bar dataKey="actual" fill="#ef4444" name="Actual" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
