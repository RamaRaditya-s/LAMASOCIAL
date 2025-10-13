import React from "react";

export default function Navbar() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-800 text-xl">🔔</button>
        <div className="flex items-center gap-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="Admin"
            className="w-8 h-8 rounded-full border"
          />
          <span className="text-sm font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}
