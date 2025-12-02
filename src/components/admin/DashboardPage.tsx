"use client";
import React, { useEffect, useState } from "react";
import StatCard from "./StatCard";
import DashboardSkeleton from "@/components/skeleton/DashboardSkeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

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

const visitorData = [
  { month: "Jan", visitors: 4200 },
  { month: "Feb", visitors: 3800 },
  { month: "Mar", visitors: 6100 },
  { month: "Apr", visitors: 7300 },
  { month: "May", visitors: 6900 },
  { month: "Jun", visitors: 8200 },
];

const postData = [
  { day: "Mon", posts: 140 },
  { day: "Tue", posts: 170 },
  { day: "Wed", posts: 120 },
  { day: "Thu", posts: 190 },
  { day: "Fri", posts: 220 },
  { day: "Sat", posts: 260 },
  { day: "Sun", posts: 180 },
];

interface DashboardPageProps {
  setActivePage?: (key: string) => void;
}

export default function DashboardPage({ setActivePage }: DashboardPageProps) {
  const [stats, setStats] = useState<any | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStats({
        totalUsers: 1200,
        totalPosts: 340,
        totalReports: 12,
        totalComments: 780,
      });
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!stats) {
    return <DashboardSkeleton />;
  }

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
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Visitors</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={visitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="visitors"
                stroke="#fec107"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
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

          {/* Tombol menuju halaman Reports */}
          <button
            onClick={() => setActivePage && setActivePage("reports")}
            className="w-full mt-2 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition"
          >
            View All Reports
          </button>
        </div>
      </section>

      {/* Additional Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Post Activity */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Post Activity</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={postData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="posts" fill="#fec107" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={[
                { month: "Jan", users: 1000 },
                { month: "Feb", users: 1400 },
                { month: "Mar", users: 1800 },
                { month: "Apr", users: 2400 },
                { month: "May", users: 3000 },
                { month: "Jun", users: 3700 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#16a34a"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
