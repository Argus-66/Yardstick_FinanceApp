"use client";

import React from "react";
import { format } from "date-fns";
import categoryIcons from "./CategoryIcons"; // ✅ Import the icons

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "expense" | "income";
}

interface TransactionsListProps {
  transactions: Transaction[];
  onSelectTransaction: (transaction: Transaction) => void;
}

export function TransactionsList({ transactions, onSelectTransaction }: TransactionsListProps) {
  // ✅ Sort transactions by date & time (latest first)
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // ✅ Group transactions by date
  const groupedTransactions = sortedTransactions.reduce((acc, transaction) => {
    const formattedDate = format(new Date(transaction.date), "PPPP");
    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(transaction);
    return acc;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-8"> {/* ✅ Added spacing between date groups */}
      {Object.keys(groupedTransactions).length === 0 ? (
        <div className="text-center text-gray-400">No transactions for this month.</div>
      ) : (
        Object.keys(groupedTransactions).map((date) => (
          <div key={date}>
            <h2 className="text-gray-400 font-semibold mb-4">{date}</h2>
            <div className="space-y-4"> {/* ✅ Added spacing between transactions */}
              {groupedTransactions[date].map((t) => (
                <div
                  key={t._id}
                  onClick={() => onSelectTransaction(t)}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition"
                >
                  <div className="flex items-center space-x-4">
                    {/* ✅ Use centralized category icons - ONLY in the circular badge */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        t.type === "income" ? "bg-green-500/20" : "bg-red-500/20"
                      }`}
                    >
                      {categoryIcons[t.category] || "❓"}
                    </div>
                    {/* ✅ Only show the category name here - no duplicate emoji */}
                    <div className="text-white font-medium">{t.category}</div>
                  </div>
                  <div className={`text-lg ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                    {t.type === "income" ? "+" : "-"}₹{Math.abs(t.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
