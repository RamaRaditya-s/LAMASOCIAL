"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User, Story, Suggestion, Friend, FeedPost } from "@/types/friends";

/* === PLACEHOLDERS === */

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

/* === DYNAMIC IMPORTS === */

const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);

const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((mod) => mod.default ?? mod),
  { ssr: false, loading: () => <RightMenuPlaceholder /> }
);

const FriendsPageSkeleton = dynamic(
  () => import("@/components/skeleton/FriendsPageSkeleton").then((mod) => mod.default ?? mod),
  { ssr: false }
);

/* === FRIEND STORIES === */

function FriendStories({ stories }: { stories: Story[] }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Friend Stories</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-xs text-gray-500">Story</span>
            </div>
            <span className="text-xs text-gray-500 mt-1">
              User #{story.user_id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* === SUGGESTIONS === */

function FriendSuggestions({ suggestions }: { suggestions: Suggestion[] }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">People You May Know</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {suggestions.map((friend) => (
          <div
            key={friend.id}
            className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm cursor-pointer min-w-[120px]"
          >
            <Image
              src={friend.avatar_url}
              alt={friend.name}
              width={80}
              height={80}
              className="rounded-full object-cover aspect-square"
            />
            <span className="text-sm font-medium mt-1">{friend.name}</span>
            <span className="text-xs text-gray-500">@{friend.username}</span>
            <button className="mt-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === TOP FRIENDS === */

function TopFriends({ topFriends }: { topFriends: Friend[] }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Top Friends</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {topFriends.map((friend) => (
          <div
            key={friend.id}
            className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer min-w-[140px]"
          >
            <Image
              src={friend.avatar_url}
              alt={friend.name}
              width={100}
              height={100}
              className="rounded-full object-cover aspect-square"
            />
            <span className="font-medium mt-2">{friend.name}</span>
            <span className="text-gray-500 text-sm">@{friend.username}</span>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === FEED === */

function FriendsFeed({ feed }: { feed: FeedPost[] }) {
  return (
    <div>
      <h2 className="font-semibold mb-2">Friends Feed</h2>
      <div className="space-y-3">
        {feed.map((post) => (
          <div
            key={post.id}
            className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-start gap-3"
          >
            <Image
              src={post.avatar_url}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full object-cover aspect-square"
            />
            <div>
              <span className="font-medium">User #{post.user_id}</span>
              <p className="text-sm">{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === FULL FRIENDS LIST === */

function FriendsFullList({ friends }: { friends: Friend[] }) {
  const [search, setSearch] = useState("");

  const filtered = friends.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="font-semibold mb-2">All Friends</h2>

      <input
        type="text"
        placeholder="Search friends..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filtered.map((friend) => (
          <div
            key={friend.id}
            className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm cursor-pointer"
          >
            <Image
              src={friend.avatar_url}
              width={80}
              height={80}
              alt={friend.name}
              className="rounded-full object-cover aspect-square"
            />
            <span className="font-medium mt-2">{friend.name}</span>
            <span className="text-gray-500 text-sm">@{friend.username}</span>
            <button className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* === MAIN PAGE === */

export default function FriendsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<{
    user: User;
    stories: Story[];
    suggestions: Suggestion[];
    topFriends: Friend[];
    feed: FeedPost[];
    friends: Friend[];
  } | null>(null);

  useEffect(() => {
    fetch("/api/friends?limit=10&page=1")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !data) {
    return <FriendsPageSkeleton />;
  }

  const { user, stories, suggestions, topFriends, feed, friends } = data;

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-64 relative">
            <Image
              src={user.cover_url || "/noCover.png"}
              alt="cover"
              fill
              className="rounded-md object-cover"
            />
            <Image
              src={user.avatar_url || "/noAvatar.png"}
              alt="avatar"
              width={128}
              height={128}
              className="w-32 h-32 rounded-full aspect-square absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
            />
          </div>

          <h1 className="mt-20 mb-4 text-2xl font-medium">
            {user.name && user.surname
              ? `${user.name} ${user.surname}`
              : user.username}
          </h1>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-6">
          <FriendStories stories={stories} />
          <FriendSuggestions suggestions={suggestions} />
          <TopFriends topFriends={topFriends} />
          <FriendsFeed feed={feed} />
          <FriendsFullList friends={friends} />
        </div>
      </div>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}