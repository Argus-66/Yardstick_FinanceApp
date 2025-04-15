"use client";

import { useState } from "react";

export default function TransactionForm({ onTransactionAdded }: { onTransactionAdded: () => void }) {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date || !description) return alert("All Fields are Required!");

    setLoading(true);
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amount), date, description, category }),
    });

    if (res.ok) {
      setAmount("");
      setDate("");
      setDescription("");
      setCategory("Food");
      onTransactionAdded(); // Refresh transaction list
    } else {
      alert("Failed to add transaction");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-900 rounded-lg shadow-md mb-6 text-white">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        ➕ <span className="ml-2">Add Transaction</span>
      </h2>
      
      {/* Form Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          className="p-3 bg-gray-800 rounded-md text-white border border-gray-600 w-full"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 bg-gray-800 rounded-md text-white border border-gray-600 w-full"
          required
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="p-3 bg-gray-800 rounded-md text-white border border-gray-600 w-full"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 bg-gray-800 rounded-md text-white border border-gray-600 w-full"
        >
          <option value="Food">Food</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Bills">Bills</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 p-3 rounded-md text-white font-bold hover:bg-blue-600 transition"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
