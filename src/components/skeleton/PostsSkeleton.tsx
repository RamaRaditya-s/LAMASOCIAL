"use client";
import React from "react";

export default function PostsSkeleton() {
  const shimmer =
    "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse";

  return (
    <div className="flex flex-col gap-6">
      {/* Header Skeleton */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className={`h-6 w-52 rounded-md ${shimmer}`} />
        <div className={`h-4 w-72 rounded-md mt-3 ${shimmer}`} />
      </section>

      {/* Table Skeleton */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <div className={`h-5 w-32 rounded-md ${shimmer}`} />
          <div className={`h-9 w-28 rounded-lg ${shimmer}`} />
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-gray-100">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="flex justify-between items-center px-6 py-4"
            >
              <div className="flex flex-col gap-2 w-2/3">
                <div className={`h-4 w-3/4 rounded-md ${shimmer}`} />
                <div className={`h-3 w-1/2 rounded-md ${shimmer}`} />
              </div>
              <div className={`h-5 w-20 rounded-full ${shimmer}`} />
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <div className={`h-4 w-32 rounded-md ${shimmer}`} />
          <div className="flex gap-2">
            <div className={`h-8 w-12 rounded-md ${shimmer}`} />
            <div className={`h-8 w-12 rounded-md ${shimmer}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
