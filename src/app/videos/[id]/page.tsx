"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

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

const VideoPlayerComponent = dynamic(() => import("@/app/videos/VideoPlayer"), {
  ssr: false,
  loading: () => <VideoPlayerSkeleton />
});

/* ------------------ Skeleton Components ------------------ */
function VideoPlayerSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg aspect-video w-full animate-pulse">
      <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
        <div className="text-white">Loading video...</div>
      </div>
    </div>
  );
}

function RelatedVideoSkeleton() {
  return (
    <div className="flex gap-3 animate-pulse">
      <div className="w-40 h-24 bg-gray-300 rounded-md"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
      </div>
    </div>
  );
}

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
  description?: string;
  uploaderName?: string;
  uploaderAvatar?: string;
  likes?: number;
  comments?: number;
}

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        setLoading(true);
        const videoId = params.id as string;
        
        // Fetch video data
        const videoResponse = await fetch(`/api/videos/${videoId}`);
        if (!videoResponse.ok) {
          throw new Error('Video not found');
        }
        const videoData = await videoResponse.json();
        setVideo(videoData);

        // Fetch related videos (videos from same uploader)
        const relatedResponse = await fetch(`/api/videos?uploader=${videoData.uploader}&exclude=${videoId}&limit=4`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedVideos(relatedData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load video');
        console.error('Error fetching video:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [params.id]);

  if (loading) {
    return <VideoPageSkeleton />;
  }

  if (error || !video) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Video Not Found"}
          </h2>
          <button 
            onClick={() => router.push('/videos')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Back to Videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Video Player */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <VideoPlayerComponent 
            videoUrl={video.url}
            title={video.title}
            autoPlay={true}
          />
          
          {/* Video Info */}
          <div className="p-6">
            <h1 className="font-bold text-2xl text-gray-900 mb-3">{video.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                  <Image 
                    src={video.uploaderAvatar || "/dummyCover.png"} 
                    alt={video.uploaderName || video.uploader}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{video.uploaderName || video.uploader}</p>
                  <p className="text-sm text-gray-500">{video.views.toLocaleString()} views</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  <span>{video.likes || 0}</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>{video.comments || 0}</span>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Follow
                </button>
              </div>
            </div>
            
            {/* Video Description */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700 whitespace-pre-line">
                {video.description || "No description available."}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Uploaded on {new Date(video.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-semibold text-xl text-gray-900 mb-4">
            Comments ({video.comments || 0})
          </h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
              <div className="flex-1">
                <textarea 
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <div className="flex justify-end mt-2">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Related Videos Sidebar */}
      <div className="hidden lg:block w-[30%]">
        <div className="sticky top-6 space-y-6">
          <RightMenu />
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Related Videos</h3>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <div 
                  key={relatedVideo.id}
                  className="flex gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                  onClick={() => router.push(`/videos/${relatedVideo.id}`)}
                >
                  <div className="w-40 h-24 relative rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={relatedVideo.thumb || "/dummyCover.png"}
                      alt={relatedVideo.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                      {relatedVideo.duration}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 text-sm line-clamp-2 mb-1">
                      {relatedVideo.title}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {relatedVideo.uploaderName || relatedVideo.uploader}
                    </p>
                    <p className="text-xs text-gray-500">
                      {relatedVideo.views.toLocaleString()} views
                    </p>
                  </div>
                </div>
              ))}
              {relatedVideos.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  No related videos found
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Skeleton for Video Page ------------------ */
function VideoPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      <LeftMenuPlaceholder />
      
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Video Player Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <VideoPlayerSkeleton />
          <div className="p-6 space-y-4">
            <div className="h-8 bg-gray-300 rounded animate-pulse w-3/4"></div>
            <div className="flex gap-4">
              <div className="h-10 bg-gray-300 rounded animate-pulse w-32"></div>
              <div className="h-10 bg-gray-300 rounded animate-pulse w-32"></div>
            </div>
            <div className="h-20 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Comments Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="h-6 bg-gray-300 rounded animate-pulse w-32 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-3">
                <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="hidden lg:block w-[30%]">
        <div className="sticky top-6 space-y-6">
          <RightMenuPlaceholder />
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
            <div className="h-6 bg-gray-300 rounded animate-pulse w-32 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <RelatedVideoSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}