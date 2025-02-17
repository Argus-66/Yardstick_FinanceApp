"use client";

import { useState } from "react";
import { Check } from "lucide-react";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  description?: string;
}

interface TransactionEditFormProps {
  transaction: Transaction;
  onSave: () => void;
}

export function TransactionEditForm({ transaction, onSave }: TransactionEditFormProps) {
  const [editedTransaction, setEditedTransaction] = useState<Transaction>(transaction);

  function handleSave() {
    fetch("/api/transactions", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: editedTransaction._id, // ✅ Ensure ID is sent
        amount: editedTransaction.amount,
        description: editedTransaction.description,
        date: editedTransaction.date, // ✅ Allow editing date
        category: editedTransaction.category,
        type: editedTransaction.type,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to update transaction");
        }
        return res.json();
      })
      .then(() => {
        console.log("Transaction updated successfully");
        onSave(); // ✅ Close edit mode
        window.location.reload(); // ✅ Refresh transactions after update
      })
      .catch((err) => console.error("Error updating transaction:", err));
  }

  return (
    <div className="space-y-4 mt-4">
      <label className="block text-sm text-gray-400">Amount</label>
      <input
        type="number"
        className="w-full p-2 bg-gray-800 text-white rounded"
        value={editedTransaction.amount}
        onChange={(e) => setEditedTransaction({ ...editedTransaction, amount: Number(e.target.value) })}
      />

      <label className="block text-sm text-gray-400">Date</label>
      <input
        type="date"
        className="w-full p-2 bg-gray-800 text-white rounded"
        value={editedTransaction.date.split("T")[0]} // ✅ Ensure correct date format (YYYY-MM-DD)
        onChange={(e) => setEditedTransaction({ ...editedTransaction, date: e.target.value })}
      />

      <label className="block text-sm text-gray-400">Description</label>
      <input
        type="text"
        className="w-full p-2 bg-gray-800 text-white rounded"
        value={editedTransaction.description || ""}
        onChange={(e) => setEditedTransaction({ ...editedTransaction, description: e.target.value })}
      />

      <button onClick={handleSave} className="w-full bg-blue-500 text-white p-2 rounded flex justify-center items-center gap-2">
        <Check className="w-5 h-5" /> Save Changes
      </button>
    </div>
  );
}
