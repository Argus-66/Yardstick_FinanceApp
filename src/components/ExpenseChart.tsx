"use client";

import React from "react";
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  date: string;
  amount: number;
  type: "income" | "expense";
}

interface ExpenseChartProps {
  transactions: Transaction[];
}

export default function ExpenseChart({ transactions }: ExpenseChartProps) {
  // ✅ Group transactions by day
  const daysInMonth = new Date().getDate();
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    income: 0,
    expense: 0,
  }));

  transactions.forEach((t) => {
    const day = new Date(t.date).getDate() - 1;
    if (t.type === "income") {
      dailyData[day].income += Math.abs(t.amount);
    } else {
      dailyData[day].expense += Math.abs(t.amount);
    }
  });

  return (
    <div className="mt-8 bg-gray-900 p-4 rounded-lg shadow-lg">
      <h2 className="text-white text-lg font-semibold mb-4">📊 Monthly Expenses & Income</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dailyData}>
          <XAxis dataKey="day" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip />
          <Bar dataKey="income" fill="green" name="Income" />
          <Bar dataKey="expense" fill="red" name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
