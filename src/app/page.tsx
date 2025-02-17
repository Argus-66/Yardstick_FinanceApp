"use client";

import React, { useState, useEffect } from "react";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

export default function HomePage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]); // ✅ Define the type explicitly

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

  // ✅ Fix: Ensure TypeScript understands `.date`
  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date); // ✅ Now TypeScript knows `.date` exists
    return (
      transactionDate.getMonth() === currentMonth.getMonth() &&
      transactionDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  return (
    <div className="p-6">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Transactions</h2>
      {/* Render Transactions Here */}
    </div>
  );
}
