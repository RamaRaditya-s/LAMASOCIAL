"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import VideosPageSkeleton from "@/components/skeleton/VideosPageSkeleton";

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
      <p className="text-sm text-gray-600">Followers: {user._count?.followers}</p>
      <p className="text-sm text-gray-600">Following: {user._count?.followings}</p>
    </div>
  );
}

/* ------------------ Dynamic Imports ------------------ */
const LeftMenu = dynamic(() => import("@/components/leftMenu/LeftMenu"), { 
  ssr: false,
  loading: () => <LeftMenuPlaceholder />
});

const RightMenu = dynamic(() => import("@/components/rightMenu/RightMenu"), { 
  ssr: false,
  loading: () => <RightMenuPlaceholder user={dummyUser} />
});

const dummyUser = { 
  username: "john_doe", 
  name: "John Doe", 
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 }
};

const myVideos = [
  { id: "m1", title: "My Travel Vlog - Amazing journey through mountains and beaches", thumb: "/dummyCover.png", views: 980, createdAt: "2025-09-21", duration: "15:30" },
  { id: "m2", title: "Workout Routine - Full body exercise for beginners", thumb: "/dummyCover.png", views: 650, createdAt: "2025-09-22", duration: "08:15" },
];

const exploreVideos = [
  { id: "e1", title: "Nature Documentary - Wildlife in the Amazon rainforest", thumb: "/dummyCover.png", uploader: "alice", views: 5230, createdAt: "2025-09-20", duration: "22:45" },
  { id: "e2", title: "Street Food Tour - Exploring delicious food around Asia", thumb: "/dummyCover.png", uploader: "bob", views: 4310, createdAt: "2025-09-19", duration: "18:20" },
  { id: "e3", title: "Tech Review - Latest smartphone features and performance", thumb: "/dummyCover.png", uploader: "charlie", views: 2120, createdAt: "2025-09-18", duration: "12:10" },
  { id: "e4", title: "Funny Cats Compilation - Hilarious moments with cute cats", thumb: "/dummyCover.png", uploader: "dina", views: 6700, createdAt: "2025-09-18", duration: "09:45" },
];

export default function VideosPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <VideosPageSkeleton />;
  }

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-10">
        {/* Header */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <h1 className="font-bold text-2xl text-gray-900 mb-2">Videos</h1>
              <p className="text-gray-600 leading-relaxed max-w-2xl">
                Explore, upload, and watch videos from you and creators worldwide. 
                Share your stories and discover amazing content.
              </p>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-sm hover:shadow-md flex items-center justify-center gap-2 whitespace-nowrap">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Video
            </button>
          </div>
        </section>

        {/* My Videos */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl text-gray-900">My Videos</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {myVideos.length} videos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {myVideos.map((v) => (
              <VideoCard key={v.id} data={v} />
            ))}
          </div>
        </section>

        {/* Explore Videos */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl text-gray-900">Explore Videos</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {exploreVideos.length} videos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {exploreVideos.map((v) => (
              <VideoCard key={v.id} data={v} showUploader />
            ))}
          </div>
        </section>
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}

type VideoType = {
  id: string;
  title: string;
  thumb: string;
  views: number;
  createdAt: string;
  uploader?: string;
  duration?: string;
};

function VideoCard({
  data,
  showUploader,
}: {
  data: VideoType;
  showUploader?: boolean;
}) {
  const router = useRouter();

  const handleVideoClick = () => {
    // Navigate to video player page
    router.push(`/videos/${data.id}`);
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden"
      onClick={handleVideoClick}
    >
      {/* Thumbnail Container - Horizontal/Landscape */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={data.thumb}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Duration Badge */}
        {data.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {data.duration}
          </div>
        )}
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="bg-black bg-opacity-70 rounded-full p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-75 group-hover:scale-100">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="p-4">
        <h4 className="font-semibold text-gray-900 line-clamp-2 mb-2 leading-tight text-sm">
          {data.title}
        </h4>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>{data.views.toLocaleString()} views</span>
          <span>{new Date(data.createdAt).toLocaleDateString()}</span>
        </div>
        
        {showUploader && (
          <p className="text-xs text-gray-400">by {data.uploader}</p>
        )}
      </div>
    </div>
  );
}