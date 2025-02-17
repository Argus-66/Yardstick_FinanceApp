"use client";

import React from "react";

interface AnalyticsMonthSelectorProps {
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

export default function AnalyticsMonthSelector({ currentMonth, onMonthChange }: AnalyticsMonthSelectorProps) {
  function handlePrevMonth() {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    onMonthChange(prevMonth);
  }

  function handleNextMonth() {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    onMonthChange(nextMonth);
  }

  return (
    <div className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
      <button onClick={handlePrevMonth} className="text-gray-400 hover:text-white">&lt;</button>
      <span className="text-lg font-semibold">
        {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
      </span>
      <button onClick={handleNextMonth} className="text-gray-400 hover:text-white">&gt;</button>
    </div>
  );
}
