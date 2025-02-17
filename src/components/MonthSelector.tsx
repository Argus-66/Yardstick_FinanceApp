"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface MonthSelectorProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function MonthSelector({ currentMonth, onMonthChange }: MonthSelectorProps) {
  function changeMonth(offset: number) {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + offset);
    onMonthChange(newDate);
  }

  return (
    <div className="flex items-center justify-between bg-gray-900 p-4 rounded-lg mb-4">
      <button onClick={() => changeMonth(-1)} className="text-gray-400 hover:text-white">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <span className="text-white text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</span>
      <button onClick={() => changeMonth(1)} className="text-gray-400 hover:text-white">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
