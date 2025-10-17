"use client";

import React, { useState, useEffect } from "react";
import SkeletonNavbar from "@/components/skeleton/SkeletonNavbar";
import Image from "next/image";

export default function Navbar() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  // Data contoh
  const items = [
    "Dashboard Overview",
    "User Management",
    "Post Settings",
    "Notifications",
    "Analytics Report",
    "System Logs",
    "Support Tickets",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  if (loading) return <SkeletonNavbar />;

  return (
    <header className="bg-white shadow-md px-6 py-3 flex flex-col md:flex-row md:items-center justify-between relative">
      {/* Search Bar */}
      <div className="relative w-full md:w-auto mb-2 md:mb-0">
        <div className="relative">
          {/* Icon Search */}
          <Image
            src="/search.png"
            alt="Search"
            width={16}
            height={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-lg pl-9 pr-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Dropdown hasil pencarian */}
        {results.length > 0 && (
          <div className="absolute top-11 left-0 bg-white border border-gray-200 rounded-lg shadow-lg w-full md:w-64 z-10">
            {results.map((result, index) => (
              <div
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 cursor-pointer"
                onClick={() => {
                  alert(`You selected: ${result}`);
                  setQuery("");
                  setResults([]);
                }}
              >
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
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
