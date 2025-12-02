"use client";

import React, { useState, useEffect } from "react";
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

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

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

  const userGrowthData = [
    { month: "Jan", users: 1000 },
    { month: "Feb", users: 1400 },
    { month: "Mar", users: 1800 },
    { month: "Apr", users: 2400 },
    { month: "May", users: 3000 },
    { month: "Jun", users: 3700 },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {/* Header Section Skeleton */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
          <div className="h-7 w-1/3 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-1/4 bg-gray-200 rounded"></div>
        </section>

        {/* Stats Grid Skeleton */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg shadow-md border border-gray-100 p-6"
            >
              <div className="h-6 w-2/3 bg-gray-200 rounded mb-4"></div>
              <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </section>

        {/* Charts Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-lg shadow-md border border-gray-100 p-6"
            >
              <div className="h-6 w-1/3 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 bg-gray-100 rounded"></div>
            </div>
          ))}
        </section>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
        <p className="text-gray-600 mt-1">Website performance analytics</p>
      </section>

      {/* Charts Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors Chart */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Visitors</h2>
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

        {/* Posts Activity */}
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

        {/* User Growth */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">User Growth</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={userGrowthData}>
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