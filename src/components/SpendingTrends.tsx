import React from "react";
import MoneyTips from "@/components/MoneyTips";

interface Transaction {
  category: string;
  amount: number;
  type: "expense";
}

interface Budget {
  category: string;
  amount: number;
}

interface SpendingTrendsProps {
  transactions: Transaction[];
  budgets: Budget[];
}

export default function SpendingTrends({ transactions, budgets }: SpendingTrendsProps) {
  return (
    <div>
      {/* Smart Money Tips */}
      <MoneyTips transactions={transactions} budgets={budgets} />
    </div>
  );
}
