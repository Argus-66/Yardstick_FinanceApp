"use client";

import React, { useState, useEffect } from "react";

interface Transaction {
  category: string;
  amount: number;
  type: "income" | "expense";
}

export default function InsightsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]); // ✅ Define type explicitly

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const res = await fetch("/api/transactions");
        const data: Transaction[] = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("❌ Error fetching transactions:", error);
      }
    }
    fetchTransactions();
  }, []);

  // ✅ Fix: Ensure TypeScript recognizes `.type` property
  const expenseTotals = transactions
    .filter((t) => t.type === "expense") // ✅ Now TypeScript understands `type`
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Math.abs(t.amount);
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="p-6">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Insights</h2>
      {/* Render insights here */}
    </div>
  );
}
