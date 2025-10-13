"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/Navbar";
import DashboardPage from "@/components/admin/DashboardPage";

export default function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const dummyStats = {
    totalUsers: 12430,
    totalPosts: 85910,
    totalReports: 34,
    totalComments: 7821,
  };

  return (
    <div className="flex h-screen bg-transparent text-gray-800">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto">
          {activePage === "dashboard" && <DashboardPage stats={dummyStats} />}
          {activePage === "users" && (
            <div className="p-6 text-gray-600">Users Page Placeholder</div>
          )}
          {activePage === "posts" && (
            <div className="p-6 text-gray-600">Posts Page Placeholder</div>
          )}
          {activePage === "reports" && (
            <div className="p-6 text-gray-600">Reports Page Placeholder</div>
          )}
        </main>
      </div>
    </div>
  );
}
