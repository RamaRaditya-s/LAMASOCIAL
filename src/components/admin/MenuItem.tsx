import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface MenuItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  activePage: string;
  setActivePage: (page: string) => void;
  sidebarOpen: boolean;
}

export default function MenuItem({
  id,
  icon: Icon,
  label,
  activePage,
  setActivePage,
  sidebarOpen,
}: MenuItemProps) {
  const isActive = activePage === id;

  return (
    <button
      onClick={() => setActivePage(id)}
      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <Icon size={20} />
      {sidebarOpen && <span className="ml-3 font-medium">{label}</span>}
    </button>
  );
}
