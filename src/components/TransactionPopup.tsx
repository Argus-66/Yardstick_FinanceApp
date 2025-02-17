"use client";

import React from "react";
import { X, Trash, Pencil } from "lucide-react";

interface Transaction {
  _id: string;
  date: string;
  category: string;
  amount: number;
  type: "expense" | "income";
  description?: string;
}

interface TransactionPopupProps {
  transaction: Transaction | null;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export function TransactionPopup({ transaction, onClose, onDelete }: TransactionPopupProps) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">{transaction.category}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Amount */}
        <div className={`text-2xl font-bold my-4 ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}>
          {transaction.type === "income" ? "+" : "-"}₹{Math.abs(transaction.amount).toFixed(2)}
        </div>

        {/* Details */}
        <div className="text-gray-300">
          <p>{transaction.description || "No description provided."}</p>
          <p className="text-sm mt-2">{new Date(transaction.date).toLocaleString()}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button onClick={() => onDelete(transaction._id)} className="text-red-500 hover:text-white flex items-center gap-1">
            <Trash className="w-5 h-5" /> Delete
          </button>
          <button className="text-blue-500 hover:text-white flex items-center gap-1">
            <Pencil className="w-5 h-5" /> Edit
          </button>
        </div>
      </div>
    </div>
  );
}
