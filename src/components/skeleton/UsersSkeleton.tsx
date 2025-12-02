"use client";
import React from "react";

export default function UsersSkeleton() {
  const shimmer =
    "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse";

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className={`h-6 w-48 rounded-md ${shimmer}`} />
        <div className={`h-4 w-72 rounded-md mt-3 ${shimmer}`} />
      </section>

      {/* Table Section */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {/* Header Bar */}
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <div className={`h-5 w-40 rounded-md ${shimmer}`} />
          <div className={`h-9 w-32 rounded-lg ${shimmer}`} />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Name", "Email", "Role", "Status", "Joined", "Actions"].map(
                  (col, i) => (
                    <th key={i} className="px-6 py-3">
                      <div className={`h-4 w-20 rounded-md ${shimmer}`} />
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-50 hover:bg-slate-50 transition"
                >
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-6 py-4">
                      <div
                        className={`h-4 w-full max-w-[120px] rounded-md ${shimmer}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <div className={`h-4 w-40 rounded-md ${shimmer}`} />
          <div className="flex gap-2">
            <div className={`h-8 w-16 rounded-lg ${shimmer}`} />
            <div className={`h-8 w-16 rounded-lg ${shimmer}`} />
          </div>
        </div>
      </section>
    </div>
  );
}
