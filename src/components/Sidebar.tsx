"use client"; 

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PlusSquare,
  BarChart,
  Wallet,
  Tag,
  Home,
  Banknote,
} from "lucide-react";

const menuItems = [
  { name: "Home", href: "/", icon: <Home className="w-6 h-6" /> },
  { name: "Add Transaction", href: "/add-transaction", icon: <PlusSquare className="w-6 h-6" /> },
  { name: "Analytics", href: "/analytics", icon: <BarChart className="w-6 h-6" /> },
  { name: "Budget", href: "/budget", icon: <Banknote className="w-6 h-6" /> },
  { name: "Accounts", href: "/accounts", icon: <Wallet className="w-6 h-6" /> },
  // ❌ Removed Categories
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar h-screen w-64 text-white fixed top-0 left-0 flex flex-col border-r border-gray-800 shadow-lg bg-black">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-800 flex items-center gap-2">
        <div className="text-yellow-500 text-2xl">💰</div>
        <h1 className="text-xl font-bold tracking-wide">Finance Tracker</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 pt-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-5 py-3 rounded-r-lg transition-colors font-medium ${
                isActive
                  ? "bg-blue-600 text-white font-semibold border-l-4 border-yellow-500"
                  : "text-gray-200 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span className={isActive ? "text-yellow-500" : ""}>{item.icon}</span>
              <span className="ml-3">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
