"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

// ---- Dummy Data ----
const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  cover: "/dummyCover.png",
  avatar: "/dummyCover.png",
  _count: { stories: 8, followers: 340, followings: 180 },
};

const dummyStories = [
  { id: 1, user: "Alice", avatar: "/noAvatar.png", media: "/story1.jpg" },
  { id: 2, user: "Bob", avatar: "/noAvatar.png", media: "/story2.jpg" },
  { id: 3, user: "Charlie", avatar: "/noAvatar.png", media: "/story3.jpg" },
  { id: 4, user: "Diana", avatar: "/noAvatar.png", media: "/story4.jpg" },
];

// ---- Left & Right Menu Dynamic Import ----
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

const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);

const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <RightMenuPlaceholder user={dummyUser} /> }
);

// ---- Stories Components ----
function StoryCarousel() {
  return (
    <div>
      <h2 className="font-semibold mb-3">Latest Stories</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {dummyStories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer min-w-[100px]"
          >
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
  );
}

function StoryViewer() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <h2 className="font-semibold mb-3">Watch Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyStories.map((story) => (
          <div
            key={story.id}
            onClick={() => setActive(story.id)}
            className="relative cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <Image
              src={story.media}
              alt={`story-${story.user}`}
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
              src={dummyStories.find((s) => s.id === active)?.media || ""}
              alt="story"
              width={400}
              height={600}
              className="object-contain w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Main Page ----
export default function StoriesPage() {
  const user = dummyUser;

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-8">
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

        <StoryCarousel />
        <StoryViewer />
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
