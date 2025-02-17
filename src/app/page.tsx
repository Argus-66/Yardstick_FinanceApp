"use client";

import React, { useState } from "react";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { TransactionsList } from "@/components/TransactionsList";
import { TransactionPopup } from "@/components/TransactionPopup";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState("February, 2025");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  return (
    <div className="p-6">
      {/* Expense Summary */}
      <ExpenseSummary currentMonth={currentMonth} />

      {/* Transactions List */}
      <TransactionsList
        currentMonth={currentMonth}
        onSelectTransaction={setSelectedTransaction} // ✅ Pass function here
      />

      {/* Transaction Popup */}
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
