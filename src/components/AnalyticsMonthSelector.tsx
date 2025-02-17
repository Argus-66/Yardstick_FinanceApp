"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface MonthSelectorProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  const changeMonth = (offset: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + offset);
    onMonthChange(newMonth);
  };

  return (
    <div className="flex justify-center items-center space-x-4 bg-gray-900 p-3 rounded-lg">
      <button onClick={() => changeMonth(-1)} className="text-gray-300 hover:text-white">
        <ChevronLeft />
      </button>
      <span className="text-white text-lg font-bold">
        {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
      </span>
      <button onClick={() => changeMonth(1)} className="text-gray-300 hover:text-white">
        <ChevronRight />
      </button>
    </div>
  );
}
