"use client";
import React, { useEffect, useState } from "react";
import ReportsSkeleton from "@/components/skeleton/ReportsSkeleton";

interface Report {
  id: string;
  reporter: string;
  reportedUser: string;
  reason: string;
  status: string;
  date: string;
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 2; // jumlah laporan per halaman

  useEffect(() => {
    const timeout = setTimeout(() => {
      setReports([
        {
          id: "r1",
          reporter: "John Doe",
          reportedUser: "David Kim",
          reason: "Inappropriate Content",
          status: "Pending",
          date: "2024-12-21",
        },
        {
          id: "r2",
          reporter: "Sarah Connor",
          reportedUser: "Alicia Grey",
          reason: "Harassment",
          status: "Resolved",
          date: "2024-12-22",
        },
        {
          id: "r3",
          reporter: "Michael Lee",
          reportedUser: "John Doe",
          reason: "Spam",
          status: "Rejected",
          date: "2024-12-25",
        },
      ]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!reports) {
    return <ReportsSkeleton />;
  }

  // Hitung total halaman
  const totalPages = Math.ceil(reports.length / reportsPerPage);

  // Ambil data sesuai halaman aktif
  const startIndex = (currentPage - 1) * reportsPerPage;
  const currentReports = reports.slice(startIndex, startIndex + reportsPerPage);

  // Fungsi tombol navigasi
  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">Reports Management</h1>
        <p className="text-gray-600 mt-1">
          Review and manage user reports and actions
        </p>
      </section>

      {/* Reports Table */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">All Reports</h3>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            Export Reports
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Reporter
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">
                  Reported User
                </th>
                <th className="px-6 py-3 font-semibold text-gray-700">Reason</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report) => (
                <tr
                  key={report.id}
                  className="border-b border-gray-50 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {report.reporter}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {report.reportedUser}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{report.reason}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        report.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : report.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{report.date}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      View
                    </button>
                    <button className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Showing {startIndex + 1}–
            {Math.min(startIndex + reportsPerPage, reports.length)} of{" "}
            {reports.length} reports
          </p>
          <div className="flex gap-2 items-center">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm border rounded-lg transition ${
                currentPage === 1
                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            <span className="text-sm text-gray-500">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm border rounded-lg transition ${
                currentPage === totalPages
                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
