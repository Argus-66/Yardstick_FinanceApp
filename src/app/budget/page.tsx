"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function Budget() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const budget = { amount: parseFloat(amount), date, category };

    try {
      await fetch("/api/budgets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(budget),
      });
      alert("Budget added!");
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-white mb-4">Set Budget</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="number" 
          placeholder="Amount" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 text-white"
          required 
        />
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 text-white"
          required 
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Groceries">Groceries</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button 
          type="submit" 
          className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Budget
        </button>
      </form>
    </div>
  );
}
