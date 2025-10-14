"use client";
import React from "react";

export default function DashboardSkeleton() {
  const shimmer =
    "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse";

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className={`h-6 w-48 rounded-md ${shimmer}`} />
        <div className={`h-4 w-72 rounded-md mt-3 ${shimmer}`} />
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-md border border-gray-100 p-4 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-full ${shimmer}`} />
            <div className="flex flex-col gap-2 w-full">
              <div className={`h-4 w-3/4 rounded-md ${shimmer}`} />
              <div className={`h-6 w-1/2 rounded-md ${shimmer}`} />
            </div>
          </div>
        ))}
      </section>

      {/* Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <div className={`h-5 w-40 rounded-md ${shimmer}`} />
          <div
            className={`flex-1 border border-dashed border-gray-300 rounded-lg py-16 flex items-center justify-center`}
          >
            <div className={`h-16 w-16 rounded-full ${shimmer}`} />
          </div>
        </div>

        {/* Reports Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 flex flex-col gap-4">
          <div className={`h-5 w-36 rounded-md ${shimmer}`} />
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-gray-100 rounded-lg"
              >
                <div className="flex flex-col gap-2 w-2/3">
                  <div className={`h-4 w-32 rounded-md ${shimmer}`} />
                  <div className={`h-3 w-24 rounded-md ${shimmer}`} />
                </div>
                <div className={`h-5 w-16 rounded-full ${shimmer}`} />
              </div>
            ))}
          </div>
          <div className={`w-full h-9 rounded-lg mt-2 ${shimmer}`} />
        </div>
      </section>
    </div>
  );
}
