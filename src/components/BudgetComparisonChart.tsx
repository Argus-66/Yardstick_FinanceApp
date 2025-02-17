"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useMediaQuery } from "react-responsive"; // ✅ Detect screen size

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
  // ✅ Detect screen size
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // ✅ Group transactions by category (Expenses Only)
  const expenseTotals: { [key: string]: number } = {};
  transactions.filter((t) => t.type === "expense").forEach((t) => {
    expenseTotals[t.category] = (expenseTotals[t.category] || 0) + Math.abs(t.amount);
  });

  // ✅ Format data for Chart
  const data = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.amount,
    actual: expenseTotals[budget.category] || 0, // Show 0 if no expense for this category
  }));

  return (
    <div className="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Budget vs Actual Spending</h2>
      {data.length === 0 ? (
        <p className="text-gray-400 text-center">No budget set for this month.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout={isMobile ? "vertical" : "horizontal"}>
            <XAxis type={isMobile ? "number" : "category"} dataKey={isMobile ? undefined : "category"} tick={{ fill: "white" }} />
            <YAxis type={isMobile ? "category" : "number"} dataKey={isMobile ? "category" : undefined} tick={{ fill: "white" }} width={120} />
            <Tooltip />
            <Legend />
            <Bar dataKey="budget" fill="blue" name="Planned Budget" />
            <Bar dataKey="actual" fill="red" name="Actual Expense" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
