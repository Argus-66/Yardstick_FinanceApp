"use client";

import React, { useState, useEffect } from "react";

interface Transaction {
  amount: number;
  date: string;
  type: "expense" | "income";
}

interface ExpenseSummaryProps {
  currentMonth: string;
}

export function ExpenseSummary({ currentMonth }: ExpenseSummaryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch("/api/transactions");
        const data: Transaction[] = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTransactions();
  }, []);

  // ✅ Filter transactions for the selected month
  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(currentMonth.split(",")[1].trim())
  );

  // ✅ Calculate total expense & total income separately
  const totalExpense = filteredTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  const total = totalIncome - totalExpense; // ✅ Correct calculation

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
