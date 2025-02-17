"use client";

import React, { useState, useEffect } from "react";

interface Budget {
  date: string;
  category: string;
  amount: number;
}

export function BudgetList() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBudgets() {
      try {
        const response = await fetch("/api/budgets");
        const data: Budget[] = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBudgets();
  }, []);

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center text-gray-400">Loading budgets...</div>
      ) : budgets.length === 0 ? (
        <div className="text-center text-gray-400">No budgets set.</div>
      ) : (
        budgets.map((b, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                💰
              </div>
              <div>
                <div className="text-white font-medium">{b.category}</div>
              </div>
            </div>
            <div className="text-lg text-green-500"> {/* ✅ Always Green */}
              ₹{b.amount.toFixed(2)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
