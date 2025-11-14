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

function RightMenuPlaceholder() {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-6">
      <h3 className="font-medium mb-2">About Creator</h3>
      <p className="text-sm text-gray-600">Loading user data...</p>
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
  loading: () => <RightMenuPlaceholder />
});

// Interface untuk data video
interface Video {
  id: number;
  title: string;
  url: string;
  thumb: string;
  uploader: string;
  views: number;
  duration: string;
  created_at: string;
  uploaderName?: string;
}

export default function VideosPage() {
  const [loading, setLoading] = useState(true);
  const [myVideos, setMyVideos] = useState<Video[]>([]);
  const [exploreVideos, setExploreVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        
        // Fetch all videos
        const response = await fetch('/api/videos');
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const allVideos: Video[] = await response.json();
        
        // For demo purposes, assume current user is "john_doe"
        // In real app, you would get this from authentication context
        const currentUser = "john_doe";
        
        // Split videos into "My Videos" and "Explore Videos"
        const myVideosData = allVideos.filter(video => video.uploader === currentUser);
        const exploreVideosData = allVideos.filter(video => video.uploader !== currentUser);
        
        setMyVideos(myVideosData);
        setExploreVideos(exploreVideosData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load videos');
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) {
    return <VideosPageSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Videos</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
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
            {myVideos.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500 mb-4">You haven't uploaded any videos yet.</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Upload Your First Video
                </button>
              </div>
            )}
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
            {exploreVideos.length === 0 && (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-500">No videos available to explore.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}

function VideoCard({
  data,
  showUploader,
}: {
  data: Video;
  showUploader?: boolean;
}) {
  const router = useRouter();

  const handleVideoClick = () => {
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
          src={data.thumb || "/dummyCover.png"}
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
          <span>{new Date(data.created_at).toLocaleDateString()}</span>
        </div>
        
        {showUploader && (
          <p className="text-xs text-gray-400">by {data.uploaderName || data.uploader}</p>
        )}
      </div>
    </div>
  );
}