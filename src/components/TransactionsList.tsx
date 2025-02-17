"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// ✅ Define transaction type
interface Transaction {
  date: string;
  category: string;
  method: string;
  amount: number;
}

// ✅ Define props type
interface TransactionsListProps {
  currentMonth: string;
}

export function TransactionsList({ currentMonth }: TransactionsListProps) {
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

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-gray-400">Loading transactions...</div>
      ) : filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-400">No transactions for this month.</div>
      ) : (
        filteredTransactions.map((t, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white">
                🍽
              </div>
              <div>
                <div className="text-white font-medium">{t.category}</div>
                <div className="text-gray-400 text-sm">{t.method}</div>
              </div>
            </div>
            <div className={`text-lg ${t.amount < 0 ? "text-red-500" : "text-green-500"}`}>
              ₹{Math.abs(t.amount).toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
