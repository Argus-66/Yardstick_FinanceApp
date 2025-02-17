"use client";

import React from "react";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

interface BiggestExpenseProps {
  transactions: Transaction[];
}

export default function BiggestExpense({ transactions }: BiggestExpenseProps) {
  if (!transactions || transactions.length === 0) {
    return <p className="text-gray-400 text-center">No transactions available.</p>;
  }

  // ✅ Fix: Ensure TypeScript understands `.type`
  const expenseTotals = transactions
    .filter((t) => t.type === "expense") // ✅ Now TypeScript knows `.type` exists
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  // ✅ Find the biggest expense category
  const biggestCategory = Object.keys(expenseTotals).reduce((a, b) =>
    expenseTotals[a] > expenseTotals[b] ? a : b
  );

  return (
    <div className="mt-6 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-2">💰 Biggest Expense</h2>
      <p className="text-gray-300 text-center">
        You spent the most on <span className="text-red-500 font-bold">{biggestCategory}</span>: ₹
        {expenseTotals[biggestCategory].toLocaleString()}
      </p>
    </div>
  );
}
