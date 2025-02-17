import { ChevronLeft, ChevronRight } from "lucide-react";

// ✅ Define props type
interface MonthSelectorProps {
  formattedMonth: string;
  onMonthChange: (direction: "prev" | "next") => void;
}

export function MonthSelector({ formattedMonth, onMonthChange }: MonthSelectorProps) {
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
      <button onClick={() => onMonthChange("prev")} className="p-2">
        <ChevronLeft className="w-6 h-6 text-gray-400" />
      </button>
      <div className="text-lg font-semibold">{formattedMonth}</div>
      <button onClick={() => onMonthChange("next")} className="p-2">
        <ChevronRight className="w-6 h-6 text-gray-400" />
      </button>
    </div>
  );
}
