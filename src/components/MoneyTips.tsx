"use client";

import React from "react";

interface Transaction {
  category: string;
  amount: number;
  type: "expense";
}

interface Budget {
  category: string;
  amount: number;
}

interface MoneyTipsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function MoneyTips({ transactions, budgets }: MoneyTipsProps) {
  // ✅ Analyze spending patterns
  const expenseTotals: { [key: string]: number } = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      expenseTotals[t.category] = (expenseTotals[t.category] || 0) + Math.abs(t.amount);
    }
  });

  // ✅ Find biggest spending category
  const biggestExpenseCategory = Object.keys(expenseTotals).reduce(
    (a, b) => (expenseTotals[a] > expenseTotals[b] ? a : b),
    ""
  );
  const biggestExpenseAmount = expenseTotals[biggestExpenseCategory] || 0;

  // ✅ Generate Smart Money Tips
  const tips = [];
  if (biggestExpenseCategory) {
    tips.push(`Try cutting back on ${biggestExpenseCategory} expenses to save more.`);
  }
  if (transactions.length > 10) {
    tips.push("You're making a lot of transactions. Consider tracking them more closely!");
  }
  if (budgets.length > 0 && biggestExpenseAmount > 5000) {
    tips.push("Consider setting a stricter budget to control spending.");
  }

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-lg mt-6">
      <h2 className="text-white text-lg font-semibold mb-4">💡 Smart Money Tips</h2>
      {tips.length > 0 ? (
        <ul className="text-gray-300 list-disc ml-6">
          {tips.map((tip, index) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 text-center">No financial tips at the moment. Keep up the good work!</p>
      )}
    </div>
  );
}
