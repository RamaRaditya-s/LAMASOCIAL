"use client";
import React from "react";
import StatCard from "./StatCard";

const Icons = {
  Users: () => <span className="text-2xl">👥</span>,
  Posts: () => <span className="text-2xl">📝</span>,
  Reports: () => <span className="text-2xl">🚨</span>,
  Comments: () => <span className="text-2xl">💬</span>,
  Chart: () => <span className="text-3xl">📊</span>,
};

const dummyReports = [
  { id: "r1", type: "Spam", user: "user123", status: "Pending", date: "2024-01-20" },
  { id: "r2", type: "Harassment", user: "user456", status: "Under Review", date: "2024-01-19" },
  { id: "r3", type: "Inappropriate", user: "user789", status: "Resolved", date: "2024-01-18" },
];

export default function DashboardPage({ stats }: { stats: any }) {
  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Icons.Users, color: "bg-blue-100 text-blue-600" },
    { label: "Total Posts", value: stats.totalPosts, icon: Icons.Posts, color: "bg-green-100 text-green-600" },
    { label: "Active Reports", value: stats.totalReports, icon: Icons.Reports, color: "bg-red-100 text-red-600" },
    { label: "Total Comments", value: stats.totalComments, icon: Icons.Comments, color: "bg-purple-100 text-purple-600" },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">User Activity</h3>
          <div className="flex-1 border border-dashed border-gray-300 rounded-lg flex items-center justify-center py-16">
            <div className="text-center">
              <Icons.Chart />
              <p className="text-gray-500 mt-2">Chart Component</p>
              <p className="text-sm text-gray-400">User engagement analytics</p>
            </div>
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <h3 className="text-lg font-semibold text-gray-800">Recent Reports</h3>

          <div className="flex flex-col gap-3">
            {dummyReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-slate-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{report.type}</p>
                  <p className="text-sm text-gray-500">User: {report.user}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : report.status === "Under Review"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {report.status}
                </span>
              </div>
            ))}
          </div>

          <button className="w-full mt-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition">
            View All Reports
          </button>
        </div>
      </section>
    </div>
  );
}
