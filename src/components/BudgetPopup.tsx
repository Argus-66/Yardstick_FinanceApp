"use client";

import React, { useState } from "react";
import { Plus, X } from "lucide-react";

interface BudgetPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onBudgetAdded: () => void;
  currentMonth: string; // ✅ Accept current month as a prop
}

export function BudgetPopup({ isOpen, onClose, onBudgetAdded, currentMonth }: BudgetPopupProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null; // ✅ Hide modal if not open

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const budget = {
      amount: parseFloat(amount),
      month: currentMonth, // ✅ Ensure correct format from parent component
      category,
    };

    try {
      const res = await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budget),
      });

      if (res.ok) {
        alert("✅ Budget added successfully!");
        setAmount("");
        setCategory("");
        onClose();
        onBudgetAdded(); // ✅ Refresh budgets after adding
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Failed to add budget.");
      }
    } catch (error) {
      console.error("❌ Error adding budget:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Set Budget</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Groceries">Groceries</option>
            <option value="Home">Home</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Bills">Bills</option>
            <option value="Transport">Transport</option>
            <option value="Beauty">Beauty</option>
            <option value="Clothing">Clothing</option>
            <option value="Health">Health</option>
            <option value="Sports">Sports</option>
            <option value="Shopping">Shopping</option>
            <option value="Education">Education</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? "Adding..." : <><Plus className="w-5 h-5" /> Add Budget</>}
          </button>
        </form>
      </div>
    </div>
  );
}
