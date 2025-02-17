"use client";

import React, { useState, useEffect } from "react";

// ✅ Define transaction type
interface Transaction {
  date: string;
  category: string;
  method: string;
  amount: number;
}

// ✅ Define props type
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

  const filteredTransactions = transactions.filter((t) =>
    t.date.startsWith(currentMonth.split(",")[1].trim())
  );

  const totalExpense = filteredTransactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalIncome = filteredTransactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="grid grid-cols-3 text-center text-sm">
      <div className="text-red-500">
        <div className="font-semibold">EXPENSE</div>
        <div className="text-lg">₹{Math.abs(totalExpense).toFixed(2)}</div>
      </div>
      <div className="text-green-500">
        <div className="font-semibold">INCOME</div>
        <div className="text-lg">₹{totalIncome.toFixed(2)}</div>
      </div>
      <div className={`${totalExpense + totalIncome < 0 ? "text-red-500" : "text-green-500"}`}>
        <div className="font-semibold">TOTAL</div>
        <div className="text-lg">₹{(totalExpense + totalIncome).toFixed(2)}</div>
      </div>
    </div>
  );
}
