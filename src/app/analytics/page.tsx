"use client";

import React, { useState, useEffect } from "react";
import AnalyticsMonthSelector from "@/components/AnalyticsMonthSelector";
import ExpenseChart from "@/components/ExpenseChart";
import ExpensePieChart from "@/components/ExpensePieChart";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";

export default function AnalyticsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);

  // ✅ Fetch transactions and budgets when month changes
  useEffect(() => {
    async function fetchData() {
      try {
        const formattedMonth = currentMonth.toISOString().slice(0, 7);

        const transactionsRes = await fetch(`/api/transactions?month=${formattedMonth}`);
        const budgetsRes = await fetch(`/api/budgets?month=${formattedMonth}`);

        const transactionsData = await transactionsRes.json();
        const budgetsData = await budgetsRes.json();

        setTransactions(transactionsData);
        setBudgets(budgetsData);
      } catch (error) {
        console.error("❌ Error fetching data:", error);
      }
    }
    fetchData();
  }, [currentMonth]);

  return (
    <div className="p-6">
      {/* ✅ Month Selector */}
      <AnalyticsMonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />

      {/* ✅ Placeholder for Charts (Next Steps) */}
      <div className="mt-6">
        <ExpenseChart transactions={transactions} />
        <ExpensePieChart transactions={transactions} />
        <BudgetComparisonChart transactions={transactions} budgets={budgets} />
      </div>
    </div>
  );
}
