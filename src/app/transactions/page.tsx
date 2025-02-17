"use client";

import { useEffect, useState } from "react";
import TransactionForm from "@/components/TransactionForm";
import ExpenseCharts from "@/components/ExpenseCharts";

interface Transaction {
  _id: string;
  amount: number;
  date: string;
  description: string;
  category: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 flex items-center justify-center">
        💰 <span className="ml-2">Transaction History</span>
      </h1>

      {/* Add Transaction Form */}
      <div className="mb-10">
        <TransactionForm onTransactionAdded={fetchTransactions} />
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-400">No transactions found.</p>
      ) : (
        <>
          {/* Transaction Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-700 mt-6 text-white text-center">
              <thead>
                <tr className="bg-gray-800">
                  <th className="border border-gray-700 p-4">Date</th>
                  <th className="border border-gray-700 p-4">Description</th>
                  <th className="border border-gray-700 p-4">Category</th>
                  <th className="border border-gray-700 p-4">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border border-gray-700 bg-gray-900 hover:bg-gray-800 transition">
                    <td className="border border-gray-700 p-4">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="border border-gray-700 p-4">{tx.description}</td>
                    <td className="border border-gray-700 p-4">{tx.category}</td>
                    <td className="border border-gray-700 p-4 font-bold">₹{tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Expense Charts */}
          <ExpenseCharts transactions={transactions} />
        </>
      )}
    </div>
  );
}