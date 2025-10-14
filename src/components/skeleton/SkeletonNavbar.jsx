"use client";
import React from "react";

export default function SkeletonNavbar() {
  const shimmer =
    "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse";

  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between border border-gray-100 rounded-lg">
      {/* Search bar skeleton */}
      <div className={`h-9 w-64 rounded-lg ${shimmer}`} />

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Notification icon placeholder */}
        <div className={`h-6 w-6 rounded-full ${shimmer}`} />

        {/* Profile skeleton */}
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full ${shimmer}`} />
          <div className={`h-4 w-16 rounded-md ${shimmer}`} />
        </div>
      </div>
    </header>
  );
}
