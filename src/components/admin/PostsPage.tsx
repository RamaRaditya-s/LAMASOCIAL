"use client";
import React, { useEffect, useState } from "react";
import PostsSkeleton from "@/components/skeleton/PostsSkeleton";

interface Post {
  id: string;
  title: string;
  author: string;
  category: string;
  status: string;
  created: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 2; // jumlah post per halaman

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPosts([
        {
          id: "p1",
          title: "Understanding Next.js App Router",
          author: "John Doe",
          category: "Tech",
          status: "Published",
          created: "2025-01-10",
        },
        {
          id: "p2",
          title: "The Future of AI in Education",
          author: "Sarah Connor",
          category: "Education",
          status: "Draft",
          created: "2025-01-12",
        },
        {
          id: "p3",
          title: "Top 10 UI Frameworks in 2025",
          author: "David Kim",
          category: "Design",
          status: "Pending Review",
          created: "2025-01-14",
        },
        {
          id: "p4",
          title: "Sustainable Tech for the Future",
          author: "Alicia Grey",
          category: "Environment",
          status: "Published",
          created: "2025-01-15",
        },
      ]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  if (!posts) {
    return <PostsSkeleton />;
  }

  // Hitung total halaman
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Tentukan post yang ditampilkan di halaman saat ini
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  // Fungsi navigasi halaman
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
        <h1 className="text-2xl font-bold text-gray-900">Post Management</h1>
        <p className="text-gray-600 mt-1">Manage blog posts, drafts, and categories</p>
      </section>

      {/* Posts Table */}
      <section className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
        <div className="p-4 flex justify-between items-center border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">All Posts</h3>
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition">
            + Add New Post
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3 font-semibold text-gray-700">Title</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Author</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Category</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 font-semibold text-gray-700">Created</th>
                <th className="px-6 py-3 font-semibold text-gray-700 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-gray-50 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">{post.title}</td>
                  <td className="px-6 py-4 text-gray-600">{post.author}</td>
                  <td className="px-6 py-4 text-gray-600">{post.category}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : post.status === "Draft"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{post.created}</td>
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
            Showing {startIndex + 1}–{Math.min(startIndex + postsPerPage, posts.length)} of{" "}
            {posts.length} posts
          </p>
          <div className="flex gap-2">
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
