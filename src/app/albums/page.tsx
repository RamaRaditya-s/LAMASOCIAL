"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AlbumsPageSkeleton from "@/components/skeleton/AlbumsPageSkeleton";

/* ------------------ Dummy Data ------------------ */
const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 },
};

const dummyAlbums = [
  { id: "a1", name: "Album 1", cover: "/dummyCover.png", count: 24, createdAt: "2025-09-01" },
  { id: "a2", name: "Album 2", cover: "/dummyCover.png", count: 12, createdAt: "2025-08-15" },
  { id: "a3", name: "Album 3", cover: "/dummyCover.png", count: 30, createdAt: "2025-07-20" },
];

/* ------------------ Placeholders ------------------ */
function LeftMenuPlaceholder() {
  return (
    <div className="hidden xl:block w-[20%]">
      <div className="p-4 bg-white rounded-md shadow-sm">Left Menu</div>
    </div>
  );
}

function RightMenuPlaceholder({ user }: { user: any }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-6">
      <h3 className="font-medium mb-2">About {user.name}</h3>
      <p className="text-sm text-gray-600">Followers: {user._count.followers}</p>
      <p className="text-sm text-gray-600">Following: {user._count.followings}</p>
    </div>
  );
}

/* ------------------ Dynamic Imports ------------------ */
const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then(m => m.default ?? m), 
  { 
    ssr: false, 
    loading: () => <LeftMenuPlaceholder /> 
  }
);

const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then(m => m.default ?? m), 
  { 
    ssr: false, 
    loading: () => <RightMenuPlaceholder user={dummyUser} /> 
  }
);

/* ------------------ Album Card ------------------ */
function AlbumCard({
  id,
  name,
  cover,
  count,
  createdAt,
}: {
  id: string;
  name: string;
  cover: string;
  count: number;
  createdAt: string;
}) {
  return (
    <Link href={`/albums/${id}`}>
      <div className="group bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
        <div className="relative w-full h-44 rounded-t-md overflow-hidden">
          <Image
            src={cover}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold truncate">{name}</h3>
          <p className="text-xs text-gray-500">
            {count} photos • {createdAt}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ------------------ Main Page ------------------ */
export default function AlbumsPage() {
  const [albums] = useState(dummyAlbums);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <AlbumsPageSkeleton />;
  }

  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT MENU */}
      <LeftMenu type={"home"} />

      {/* MAIN CONTENT */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Photo Albums</h2>
            <p className="text-sm text-gray-500">
              Browse and manage all your photo & video collections
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + New Album
          </button>
        </section>

        {/* Albums Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {albums.map((a) => (
            <AlbumCard
              key={a.id}
              id={a.id}
              name={a.name}
              cover={a.cover}
              count={a.count}
              createdAt={a.createdAt}
            />
          ))}
          {albums.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No albums yet.
            </div>
          )}
        </section>
      </main>

      {/* RIGHT MENU */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}