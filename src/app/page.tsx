"use client";

import React, { useState } from "react";
import { format, subMonths, addMonths } from "date-fns";
import { MonthSelector } from "@/components/MonthSelector";
import { ExpenseSummary } from "@/components/ExpenseSummary";
import { TransactionsList } from "@/components/TransactionsList";
import { FloatingAddButton } from "@/components/FloatingAddButton";

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Format month for display
  const formattedMonth = format(currentMonth, "MMMM, yyyy");

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prevMonth) =>
      direction === "prev" ? subMonths(prevMonth, 1) : addMonths(prevMonth, 1)
    );
  };

  return (
    <div className="p-6 space-y-4">
      {/* Month Selector */}
      <MonthSelector 
        formattedMonth={formattedMonth} 
        onMonthChange={handleMonthChange} 
      />

      {/* Expense Summary */}
      <ExpenseSummary currentMonth={formattedMonth} />

      {/* Transactions List */}
      <TransactionsList currentMonth={formattedMonth} />

      {/* Floating Add Button */}
      <FloatingAddButton />
    </div>
  );
}
