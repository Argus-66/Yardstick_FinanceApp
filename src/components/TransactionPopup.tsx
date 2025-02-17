"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { TransactionDetails } from "./TransactionDetails";
import { TransactionEditForm } from "./TransactionEditForm";

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
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Reset edit mode when a new transaction is opened
  useEffect(() => {
    setIsEditing(false);
  }, [transaction]);

  if (!transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-md w-full">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">
            {isEditing ? "Edit Transaction" : transaction.category}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Show either transaction details or edit form */}
        {isEditing ? (
          <TransactionEditForm 
            transaction={transaction} 
            onSave={() => {
              setIsEditing(false);
              onClose(); // ✅ Close popup after saving
            }} 
          />
        ) : (
          <TransactionDetails 
            transaction={transaction} 
            onEdit={() => setIsEditing(true)} 
            onDelete={(id) => {
              onDelete(id);
              onClose(); // ✅ Close popup after deleting
            }} 
          />
        )}
      </div>
    </div>
  );
}
