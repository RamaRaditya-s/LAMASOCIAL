"use client";

import { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Navbar from "@/components/admin/AdminNavbar";
import DashboardPage from "@/components/admin/DashboardPage";
import UsersPage from "@/components/admin/UsersPage";
import PostsPage from "@/components/admin/PostsPage";
import ReportsPage from "@/components/admin/ReportsPage";
import AnalyticsPage from "@/components/admin/AnalyticsPage";
import AdsManagementPage from "@/components/admin/AdsManagement";

export default function AdminPage() {
  const [activePage, setActivePage] = useState("dashboard");

  const dummyStats = {
    totalUsers: 12430,
    totalPosts: 85910,
    totalReports: 34,
    totalComments: 7821,
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <div className="h-auto self-start mt-4 ml-4">
        <Sidebar activePage={activePage} setActivePage={setActivePage} />
      </div>

      {/* Main Section */}
      <div className="flex-1 flex flex-col p-6 gap-6">
        <div className="mt-2">
          <Navbar />
        </div>

        <main className="flex-1 overflow-y-auto">
          {activePage === "dashboard" && (
            <DashboardPage setActivePage={setActivePage} />
          )}
          {activePage === "users" && <UsersPage />}
          {activePage === "posts" && <PostsPage />}
          {activePage === "reports" && <ReportsPage />}
          {activePage === "analytics" && <AnalyticsPage />}
          {activePage === "ads" && <AdsManagementPage />}
        </main>
      </div>
    </div>
  );
}
