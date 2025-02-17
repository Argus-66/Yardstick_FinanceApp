"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { BudgetPopup } from "@/components/BudgetPopup";
import { BudgetList } from "@/components/BudgetList";
import MonthSelector from "@/components/MonthSelector";

export default function BudgetPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date()); // ✅ Store as Date Object
  const [budgets, setBudgets] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // ✅ Function to fetch budgets when month changes
  async function fetchBudgets() {
    try {
      const formattedMonth = currentMonth.toISOString().slice(0, 7);
      console.log("🔄 Fetching budgets for:", formattedMonth); // ✅ Debugging log
  
      const res = await fetch(`/api/budgets?month=${formattedMonth}`);
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch budgets");
      }
  
      console.log("📊 Received Budgets:", data); // ✅ Debugging log
      setBudgets(data); // ✅ Ensure state update
    } catch (error) {
      console.error("❌ Error fetching budgets:", error);
    }
  }
  

  // ✅ Fetch budgets when currentMonth changes
  useEffect(() => {
    fetchBudgets();
  }, [currentMonth]);

  const formattedMonth = currentMonth.toISOString().slice(0, 7); // ✅ Ensure proper format

  return (
    <div className="p-6 flex flex-col items-center">
      {/* Month Selector (Centered) */}
      <MonthSelector currentMonth={currentMonth} onMonthChange={setCurrentMonth} />

      {/* Add Budget Button (Only Pop-Up Now) */}
      <button
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2"
        onClick={() => setIsPopupOpen(true)}
      >
        <Plus className="w-5 h-5" /> Add Budget
      </button>

      {/* Budget List */}
      <BudgetList budgets={budgets} currentMonth={currentMonth} fetchBudgets={fetchBudgets} />

      {/* Popup Form (No Inline Form) */}
      <BudgetPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onBudgetAdded={fetchBudgets}
        currentMonth={formattedMonth} // ✅ Pass selected month in correct format
      />
    </div>
  );
}
