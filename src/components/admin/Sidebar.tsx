"use client";

import React from "react";

interface SidebarProps {
  activePage: string;
  setActivePage: (key: string) => void;
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const menuItems = [
    { key: "dashboard", label: "🏠 Dashboard" },
    { key: "users", label: "👥 Users" },
    { key: "posts", label: "📝 Posts" },
    { key: "reports", label: "🚫 Reports" },
    { key: "analytics", label: "📊 Analytics" },
  ];

  return (
    <aside className="w-64 bg-white rounded-lg shadow-md border border-gray-100 m-4 mt-6 p-5 flex flex-col h-auto">
      <h2 className="text-xl font-bold mb-5 text-gray-900">Admin Panel</h2>

      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`text-left px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activePage === item.key
                ? "bg-blue-500 text-white shadow-sm"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
