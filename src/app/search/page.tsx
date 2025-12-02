"use client";

import { useEffect, useState } from "react";
import Post from "@/components/feed/Post";
import dynamic from "next/dynamic";
import Image from "next/image";

// Placeholder LeftMenu ketika dynamic loading
function LeftMenuPlaceholder() {
  return (
    <div className="hidden xl:block w-[20%]">
      <div className="p-4 bg-white rounded-md shadow-sm">Left Menu</div>
    </div>
  );
}

// Placeholder RightMenu
function RightMenuPlaceholder() {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-6">
      <h3 className="font-medium mb-2">Search Info</h3>
      <p className="text-sm text-gray-600">Searching posts...</p>
    </div>
  );
}

// Dynamic import
const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((m) => m.default || m),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);

const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((m) => m.default || m),
  { ssr: false, loading: () => <RightMenuPlaceholder /> }
);

export default function SearchPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query") || "";

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const res = await fetch(`/api/posts?search=${query}`);
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT MENU */}
      <LeftMenu type={"home"} />

      {/* MAIN CONTENT */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">

        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center gap-4">
          <Image
            src="/dummyCover.png"
            alt="avatar"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold">Search Results</h2>
            <p className="text-sm text-gray-500">
              Showing posts for: <span className="font-medium">"{query}"</span>
            </p>
          </div>
        </section>

        {/* Loading */}
        {loading && (
          <section className="bg-white rounded-md shadow-sm p-4 text-gray-500">
            Loading...
          </section>
        )}

        {/* No posts */}
        {!loading && posts.length === 0 && (
          <section className="bg-white rounded-md shadow-sm p-6 text-center text-gray-500">
            No posts found for: "{query}"
          </section>
        )}

        {/* Posts */}
        {!loading && posts.length > 0 && (
          <section className="bg-gray-50 rounded-md p-4 flex flex-col gap-4">
            {posts.map((p: any) => (
              <Post key={p.id} {...p} />
            ))}
          </section>
        )}
      </main>

      {/* RIGHT MENU */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
