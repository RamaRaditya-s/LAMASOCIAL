"use client";
import React, { useEffect, useState } from "react";
import UsersSkeleton from "@/components/skeleton/UsersSkeleton";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  joined: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2; // tampilkan 2 user per halaman

  useEffect(() => {
    const timeout = setTimeout(() => {
      setUsers([
        {
          id: "u1",
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          status: "Active",
          joined: "2024-12-20",
        },
        {
          id: "u2",
          name: "Sarah Connor",
          email: "sarah@example.com",
          role: "Moderator",
          status: "Suspended",
          joined: "2024-12-21",
        },
        {
          id: "u3",
          name: "David Kim",
          email: "david@example.com",
          role: "User",
          status: "Active",
          joined: "2024-12-23",
        },
        {
          id: "u4",
          name: "Alicia Grey",
          email: "alicia@example.com",
          role: "User",
          status: "Pending",
          joined: "2024-12-25",
        },
      ]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!users) {
    return <UsersSkeleton />;
  }

  // --- Pagination Logic ---
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Section */}
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="text-gray-600 mt-1">Manage users, roles, and permissions</p>
      </section>

      {/* Users Table */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">All Users</h3>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            + Add New User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Role</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Joined</th>
                <th className="px-6 py-3 font-semibold text-gray-700 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-50 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.role === "Admin"
                          ? "bg-blue-100 text-blue-700"
                          : user.role === "Moderator"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{user.joined}</td>
                  <td className="px-6 py-4 text-right flex justify-end gap-2">
                    <button className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition">
                      Edit
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
            {Math.min(startIndex + usersPerPage, users.length)} of {users.length} users
          </p>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm border rounded-lg transition ${
                currentPage === 1
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm border rounded-lg transition ${
                currentPage === totalPages
                  ? "text-gray-300 cursor-not-allowed"
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
