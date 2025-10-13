import React from "react";

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const menuItems = [
    { key: "dashboard", label: "🏠 Dashboard" },
    { key: "users", label: "👥 Users" },
    { key: "posts", label: "📝 Posts" },
    { key: "reports", label: "🚫 Reports" },
    { key: "analytics", label: "📊 Analytics" },
    { key: "settings", label: "⚙️ Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-4">
      <h1 className="text-xl font-bold text-blue-600 mb-6">Admin Panel</h1>
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`text-left px-4 py-2 rounded-lg transition-colors ${
              activePage === item.key
                ? "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
        <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
          🔓 Logout
        </button>
      </div>
    </aside>
  );
}
