"use client";

import React, { useState, useEffect } from "react";
import MonthSelector from "@/components/MonthSelector";
import ExpenseChart from "@/components/ExpenseChart";
import BudgetComparisonChart from "@/components/BudgetComparisonChart";
import { Select, SelectItem } from "@/components/ui/select"; // ✅ Using shadcn/ui

export default function AnalyticsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  // ✅ Extract unique categories
  const categories = [...new Set(transactions.map((t) => t.category))];

  return (
    <div className="p-6">
      {/* Month Selector */}
      <MonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />

      {/* Category Filter */}
      <div className="mt-4 w-64">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectItem value="">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>{category}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Monthly Expense Chart */}
      <ExpenseChart transactions={transactions} selectedCategory={selectedCategory} />

      {/* Budget vs. Actual Comparison */}
      <BudgetComparisonChart transactions={transactions} budgets={budgets} />
    </div>
  );
}
