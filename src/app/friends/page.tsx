"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  surname: "",
  cover: "/dummyCover.png",
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 },
};

const dummyStories = [
  { id: 1, name: "John Doe", avatar: "/noAvatar.png" },
  { id: 2, name: "John Doe", avatar: "/noAvatar.png" },
  { id: 3, name: "John Doe", avatar: "/noAvatar.png" },
  { id: 4, name: "John Doe", avatar: "/noAvatar.png" },
  { id: 5, name: "John Doe", avatar: "/noAvatar.png" },
];

const dummySuggestions = [
  { id: 1, name: "John Doe", username: "john_01", avatar: "/noAvatar.png" },
  { id: 2, name: "John Doe", username: "john_02", avatar: "/noAvatar.png" },
  { id: 3, name: "John Doe", username: "john_03", avatar: "/noAvatar.png" },
];

const dummyTopFriends = [
  { id: 1, name: "John Doe", username: "john_04", avatar: "/noAvatar.png" },
  { id: 2, name: "John Doe", username: "john_05", avatar: "/noAvatar.png" },
  { id: 3, name: "John Doe", username: "john_06", avatar: "/noAvatar.png" },
];

const dummyFeed = [
  { id: 1, name: "John Doe", text: "Just finished my workout!", avatar: "/noAvatar.png" },
  { id: 2, name: "John Doe", text: "Loving the new movie release", avatar: "/noAvatar.png" },
  { id: 3, name: "John Doe", text: "Reading a great book today.", avatar: "/noAvatar.png" },
];

const dummyFriends = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  name: "John Doe",
  username: `john_${i + 1}`,
  avatar: "/noAvatar.png",
}));

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
      <h3 className="font-medium mb-2">About {user.name ?? user.username}</h3>
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

const FriendsPageSkeleton = dynamic(
  () => import("@/components/skeleton/FriendsPageSkeleton").then((mod) => mod.default ?? mod),
  { ssr: false }
);

function FriendStories() {
  return (
    <div>
      <h2 className="font-semibold mb-2">Friend Stories</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {dummyStories.map((story) => (
          <div key={story.id} className="flex flex-col items-center cursor-pointer">
            <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-blue-400">
              <Image src={story.avatar} alt={story.name} width={80} height={80} className="object-cover" />
            </div>
            <span className="text-sm mt-1">{story.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FriendSuggestions() {
  return (
    <div>
      <h2 className="font-semibold mb-2">People You May Know</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {dummySuggestions.map((friend) => (
          <div key={friend.id} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm cursor-pointer min-w-[120px]">
            <Image src={friend.avatar} alt={friend.name} width={80} height={80} className="rounded-full object-cover" />
            <span className="text-sm font-medium mt-1">{friend.name}</span>
            <span className="text-xs text-gray-500">@{friend.username}</span>
            <button className="mt-1 px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600">Add Friend</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopFriends() {
  return (
    <div>
      <h2 className="font-semibold mb-2">Top Friends</h2>
      <div className="flex gap-4 overflow-x-auto py-2">
        {dummyTopFriends.map((friend) => (
          <div key={friend.id} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm cursor-pointer min-w-[140px]">
            <Image src={friend.avatar} alt={friend.name} width={100} height={100} className="rounded-full object-cover" />
            <span className="font-medium mt-2">{friend.name}</span>
            <span className="text-gray-500 text-sm">@{friend.username}</span>
            <button className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Message</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function FriendsFeed() {
  return (
    <div>
      <h2 className="font-semibold mb-2">Friends Feed</h2>
      <div className="space-y-3">
        {dummyFeed.map((post) => (
          <div key={post.id} className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-start gap-3">
            <Image src={post.avatar} alt={post.name} width={50} height={50} className="rounded-full object-cover" />
            <div>
              <span className="font-medium">{post.name}</span>
              <p className="text-sm">{post.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FriendsFullList() {
  const [search, setSearch] = useState("");

  const filteredFriends = dummyFriends.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.username.toLowerCase().includes(search.toLowerCase())
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
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="flex flex-col items-center bg-gray-50 p-3 rounded-lg shadow-sm cursor-pointer">
            <Image src={friend.avatar} alt={friend.name} width={80} height={80} className="rounded-full object-cover" />
            <span className="font-medium mt-2">{friend.name}</span>
            <span className="text-gray-500 text-sm">@{friend.username}</span>
            <button className="mt-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">Message</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FriendsPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading state - in real app, you'd set this based on data fetching
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  });

  const user = dummyUser;

  if (isLoading) {
    return <FriendsPageSkeleton />;
  }

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-64 relative">
            <Image src={user.cover || "/noCover.png"} alt="cover" fill className="rounded-md object-cover" />
            <Image src={user.avatar || "/noAvatar.png"} alt="avatar" width={128} height={128} className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover" />
          </div>
          <h1 className="mt-20 mb-4 text-2xl font-medium">
            {user.name && user.surname ? `${user.name} ${user.surname}` : user.username}
          </h1>
        </div>
        <div className="flex flex-col gap-6">
          <FriendStories />
          <FriendSuggestions />
          <TopFriends />
          <FriendsFeed />
          <FriendsFullList />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}