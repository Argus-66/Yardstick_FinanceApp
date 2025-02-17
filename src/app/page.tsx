"use client";

import React, { useState, useEffect } from "react";
import MonthSelector from "@/components/MonthSelector";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { TransactionsList } from "@/components/TransactionsList";
import { TransactionPopup } from "@/components/TransactionPopup";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "income" | "expense";
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data: Transaction[]) => setTransactions(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  // ✅ Filter transactions to only show the selected month
  const filteredTransactions = transactions.filter((t) => {
    const transactionDate = new Date(t.date);
    return (
      transactionDate.getMonth() === currentMonth.getMonth() &&
      transactionDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  return (
    <div className="p-6">
      {/* ✅ Month Selector */}
      <MonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />

      {/* ✅ Expense Summary */}
      <ExpenseSummary transactions={filteredTransactions} />

      {/* ✅ Transactions List */}
      <TransactionsList transactions={filteredTransactions} onSelectTransaction={setSelectedTransaction} />

      {/* ✅ Transaction Popup */}
      <TransactionPopup
        transaction={selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
        onDelete={(id) => {
          console.log("Deleting transaction with ID:", id);
          setSelectedTransaction(null);
          // TODO: Call API to delete transaction
        }}
      />
    </div>
  );
}
