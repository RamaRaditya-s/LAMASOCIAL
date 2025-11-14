"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import StoriesPageSkeleton from "@/components/skeleton/StoriesPageSkeleton";

// Placeholder
function LeftMenuPlaceholder() {
  return (
    <div className="hidden xl:block w-[20%]">
      <div className="p-4 bg-white rounded-md shadow-sm">Left Menu</div>
    </div>
  );
}

function RightMenuPlaceholder() {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-6">
      <h3 className="font-medium mb-2">Loading...</h3>
      <p className="text-sm text-gray-600">Followers: ...</p>
      <p className="text-sm text-gray-600">Following: ...</p>
    </div>
  );
}

// Dynamic Routes
const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);

const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <RightMenuPlaceholder /> }
);

export default function StoriesPage() {
  const [user, setUser] = useState<any>(null);
  const [stories, setStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<number | null>(null);

  // Fetch from API
  useEffect(() => {
    async function loadData() {
      const res = await fetch("/api/stories/get");
      const data = await res.json();

      setUser(data.user);
      setStories(data.stories);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading || !user) return <StoriesPageSkeleton />;

  return (
    <div className="flex gap-6 pt-6">

      <LeftMenu type={"home"} />

      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-8">
        
        {/* PROFILE HEADER */}
        <div className="flex flex-col items-center">
          <div className="w-full h-56 relative">
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
              className="w-28 h-28 rounded-full absolute left-0 right-0 m-auto -bottom-12 ring-4 ring-white object-cover"
            />
          </div>
          <h1 className="mt-16 mb-4 text-2xl font-medium">
            {user.name || user.username}
          </h1>
        </div>

        {/* STORY CAROUSEL */}
        <div>
          <h2 className="font-semibold mb-3">Latest Stories</h2>
          <div className="flex gap-4 overflow-x-auto py-2">
            {stories.map((story) => (
              <div key={story.id} className="flex flex-col items-center min-w-[100px]">
                <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-400">
                  <Image
                    src={story.avatar}
                    alt={story.user}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <span className="text-sm mt-1">{story.user}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STORY VIEWER */}
        <div>
          <h2 className="font-semibold mb-3">Watch Stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stories.map((story) => (
              <div
                key={story.id}
                onClick={() => setActive(story.id)}
                className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <Image
                  src={story.media}
                  alt={`${story.user}-story`}
                  width={400}
                  height={600}
                  className="object-cover w-full h-60"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
                  {story.user}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FULL SCREEN VIEW */}
        {active && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative max-w-sm w-full">
              <button
                onClick={() => setActive(null)}
                className="absolute top-2 right-2 bg-white rounded-full p-1 text-black"
              >
                ✕
              </button>
              <Image
                src={stories.find((s) => s.id === active)?.media || ""}
                alt="story"
                width={400}
                height={600}
                className="object-contain w-full h-auto rounded-lg"
              />
            </div>
          </div>
        )}

      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu/>
      </div>
    </div>
  );
}
