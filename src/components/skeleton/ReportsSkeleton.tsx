"use client";
import React from "react";

export default function ReportsSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </section>

      {/* Table Section */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <div className="h-5 bg-gray-200 rounded w-32"></div>
          <div className="h-8 bg-gray-200 rounded w-28"></div>
        </div>

        {/* Table Rows */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {["Reporter", "Reported User", "Reason", "Status", "Date", "Actions"].map(
                  (header, i) => (
                    <th key={i} className="px-6 py-3">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
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
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-28"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-40"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-5 bg-gray-200 rounded-full w-16"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                      <div className="h-6 bg-gray-200 rounded w-12"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="flex gap-2">
            <div className="h-8 bg-gray-200 rounded w-12"></div>
            <div className="h-8 bg-gray-200 rounded w-12"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
