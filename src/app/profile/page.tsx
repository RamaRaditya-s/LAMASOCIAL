"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ProfilePageSkeleton from "@/components/skeleton/ProfilePageSkeleton";

function FeedPlaceholder({ username }: { username?: string }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      <h2 className="font-semibold mb-3">Feed — {username ?? "user"}</h2>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-3 border rounded">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-12 bg-gray-100 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}

function RightMenuPlaceholder({ user }: { user: any }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-6">
      <h3 className="font-medium mb-2">About {user.name ?? user.username}</h3>
      <p className="text-sm text-gray-600">Followers: {user._count.followers}</p>
      <p className="text-sm text-gray-600">Following: {user._count.followings}</p>
    </div>
  );
}

function LeftMenuPlaceholder() {
  return (
    <div className="hidden xl:block w-[20%]">
      <div className="p-4 bg-white rounded-md shadow-sm">Left Menu</div>
    </div>
  );
}

const Feed = dynamic(
  () => import("@/components/feed/Feed").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <FeedPlaceholder /> }
);

const RightMenu = dynamic(
  () =>
    import("@/components/rightMenu/RightMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <RightMenuPlaceholder user={{ _count: {} }} /> }
);

const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/users/john_doe");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading || !user) {
    return <ProfilePageSkeleton />;
  }

  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT MENU */}
      <LeftMenu type={"home"} />

      {/* MAIN CONTENT */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* COVER & AVATAR */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image
                src={user.cover || "/noCover.png"}
                alt="cover"
                fill
                className="rounded-md object-cover"
              />
              <Image
                src={user.avatar || "/noAvatar.png"}
                alt="avatar"
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>

            <h1 className="mt-20 mb-4 text-2xl font-medium">
              {user.name && user.surname
                ? `${user.name} ${user.surname}`
                : user.username}
            </h1>

            <div className="flex items-center justify-center gap-12 mb-4">
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.posts}</span>
                <span className="text-sm">Posts</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followers}</span>
                <span className="text-sm">Followers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-medium">{user._count.followings}</span>
                <span className="text-sm">Following</span>
              </div>
            </div>
          </div>

          {/* FEED (dynamic) */}
          <Feed username={user.username} />
        </div>
      </div>

      {/* RIGHT MENU */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
