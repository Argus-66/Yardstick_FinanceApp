"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function AddTransaction() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // ✅ Default to today
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const incomeCategories = ["Salary", "Awards", "Coupons", "Grants", "Lottery", "Rent"];
  const expenseCategories = [
    "Food", "Education", "Groceries", "Home", "Entertainment", "Bills",
    "Transport", "Beauty", "Clothing", "Health", "Sports", "Shopping"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // ✅ Set time to the current time while keeping the selected date
    const selectedDate = new Date(date);
    const now = new Date();
    selectedDate.setHours(now.getHours(), now.getMinutes(), now.getSeconds());

    const transaction = {
      amount: type === "expense" ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount)),
      date: selectedDate.toISOString(), // ✅ Correct date + current time
      description,
      category,
      type,
    };

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      });

      if (res.ok) {
        alert("Transaction added!");
        handleClearForm(); // ✅ Clear form after successful addition
      } else {
        alert("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleClearForm = () => {
    setAmount("");
    setDate(new Date().toISOString().split("T")[0]); // ✅ Reset to today
    setDescription("");
    setCategory("");
    setType("expense");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-xl font-bold text-white mb-4">Add Transaction</h1>

      {/* Income / Expense Toggle */}
      <div className="flex justify-center mb-4">
        <button
          className={`px-4 py-2 rounded-l-lg ${type === "expense" ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setType("expense")}
        >
          Expense
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${type === "income" ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"}`}
          onClick={() => setType("income")}
        >
          Income
        </button>
      </div>

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
        <input
          type="text"
          placeholder="Description (Optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 rounded bg-gray-700 text-white"
          required
        >
          <option value="">Select Category</option>
          {(type === "income" ? incomeCategories : expenseCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add Transaction
        </button>
      </form>
    </div>
  );
}
