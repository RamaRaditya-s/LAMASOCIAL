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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/videos');
        if (!response.ok) throw new Error("Failed to fetch videos");

        const resJson = await response.json();
        const allVideos: Video[] = resJson.data || [];

        // ✅ Ambil semua video dari semua uploader
        setMyVideos(allVideos);

      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load videos");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (loading) return <VideosPageSkeleton />;

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
                Explore, upload, and watch videos.
              </p>
            </div>

            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Upload Video
            </button>
          </div>
        </section>

        {/* Video List (VERTIKAL) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-xl text-gray-900">All Videos</h3>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {myVideos.length} videos
            </span>
          </div>

          {/* Video List Vertical */}
          <div className="flex flex-col gap-6">
            {myVideos.map(v => (
              <VideoCard key={v.id} data={v} showUploader />
            ))}

            {myVideos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No videos uploaded yet.</p>
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

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden flex flex-col"
      onClick={() => router.push(`/videos/${data.id}`)}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={data.thumb || "/dummyCover.png"}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col gap-1">
        <h4 className="font-semibold text-gray-900 line-clamp-2 text-sm">
          {data.title}
        </h4>

        <div className="flex justify-between text-xs text-gray-500">
          <span>{data.views.toLocaleString()} views</span>
          <span>{new Date(data.created_at).toLocaleDateString()}</span>
        </div>

        {showUploader && (
          <p className="text-xs text-gray-400 mt-1">by {data.uploaderName || data.uploader}</p>
        )}
      </div>
    </div>
  );
}
