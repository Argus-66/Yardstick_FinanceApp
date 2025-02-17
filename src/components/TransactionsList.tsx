"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// Category icons mapping
const categoryIcons: { [key: string]: string } = {
  Food: "🍽",
  Groceries: "🛒",
  Home: "🏠",
  Entertainment: "🎬",
  Bills: "📑",
  Transport: "🚗",
  Beauty: "💄",
  Clothing: "👕",
  Health: "🏥",
  Sports: "⚽",
  Shopping: "🛍",
  Salary: "💰",
  Awards: "🏆",
  Coupons: "🎟",
  Grants: "🎓",
  Lottery: "🎰",
  Rent: "🏡",
};

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  description?: string;
}

interface TransactionsListProps {
    currentMonth: string;
    onSelectTransaction: (transaction: Transaction) => void; // ✅ Ensure function type
  }

export function TransactionsList({ currentMonth, onSelectTransaction }: TransactionsListProps) {
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

  // ✅ Sort transactions by date & time (latest first)
  const sortedTransactions = filteredTransactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // ✅ Group transactions by date
  const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
    const formattedDate = format(new Date(transaction.date), "PPPP"); // Full date format
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-8"> {/* ✅ Added spacing between transactions */}
      {loading ? (
        <div className="text-center text-gray-400">Loading transactions...</div>
      ) : Object.keys(groupedTransactions).length === 0 ? (
        <div className="text-center text-gray-400">No transactions for this month.</div>
      ) : (
        Object.keys(groupedTransactions).map((date) => (
          <div key={date}>
            <h2 className="text-gray-400 font-semibold mb-4">{date}</h2> {/* ✅ More spacing */}
            {groupedTransactions[date].map((t) => (
              <div
                key={t._id}
                onClick={() => onSelectTransaction(t)} // ✅ Open popup on click
                className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      t.type === "income" ? "bg-green-500/20" : "bg-red-500/20"
                    }`}
                  >
                    {categoryIcons[t.category] || "❓"}
                  </div>
                  <div>
                    <div className="text-white font-medium">{t.category}</div>
                  </div>
                </div>
                <div className={`text-lg ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                  {t.type === "income" ? "+" : "-"}₹{Math.abs(t.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
