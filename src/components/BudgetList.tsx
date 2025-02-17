"use client";

import React from "react";
import { Trash } from "lucide-react";

interface Budget {
  _id: string;
  month: string;
  category: string;
  amount: number;
}

interface BudgetListProps {
  budgets: Budget[];
  currentMonth: Date;
  fetchBudgets: () => void;
}


export function BudgetList({ budgets, currentMonth, fetchBudgets }: BudgetListProps) {
  console.log("📊 Rendering BudgetList with budgets:", budgets); // ✅ Debugging log

  function handleDeleteBudget(id: string) {
    fetch("/api/budgets", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then(() => fetchBudgets()) // ✅ Refresh budgets after delete
      .catch((err) => console.error("Error deleting budget:", err));
  }

  return (
    <div className="mt-6 w-full max-w-lg">
      <h2 className="text-lg font-bold text-white mb-4 text-center">
        Budgets for {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
      </h2>

      <div className="space-y-4">
        {budgets.length === 0 ? (
          <div className="text-gray-400 text-center">No budgets set for this month.</div>
        ) : (
          budgets.map((budget) => (
            <div key={budget._id} className="flex justify-between items-center bg-gray-800 p-3 rounded-md">
              <div className="text-white">{budget.category}</div>
              <div className="flex items-center space-x-4">
                <div className="text-green-500 font-bold">₹{budget.amount.toFixed(2)}</div>
                <button onClick={() => handleDeleteBudget(budget._id)} className="text-red-500 hover:text-white">
                  🗑
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
