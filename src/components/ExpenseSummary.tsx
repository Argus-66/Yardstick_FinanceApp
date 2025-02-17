"use client";

import React from "react";

interface Transaction {
  amount: number;
  type: "expense" | "income";
}

interface ExpenseSummaryProps {
  transactions: Transaction[]; // ✅ Now getting filtered transactions directly
}

export function ExpenseSummary({ transactions }: ExpenseSummaryProps) {
  // ✅ Calculate total expense & total income separately
  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const total = totalIncome - totalExpense;

  return (
    <div className="grid grid-cols-3 text-center text-sm">
      <div className="text-red-500">
        <div className="font-semibold">EXPENSE</div>
        <div className="text-lg">₹{totalExpense.toFixed(2)}</div>
      </div>
      <div className="text-green-500">
        <div className="font-semibold">INCOME</div>
        <div className="text-lg">₹{totalIncome.toFixed(2)}</div>
      </div>
      <div className={`${total < 0 ? "text-red-500" : "text-green-500"}`}>
        <div className="font-semibold">TOTAL</div>
        <div className="text-lg">₹{total.toFixed(2)}</div>
      </div>
    </div>
  );
}
