"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";
export default function VideosPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-10">
        {/* Header Skeleton */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="w-32 h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-40 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </section>

        {/* My Videos Section Skeleton */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-7 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(2)].map((_, index) => (
              <VideoCardSkeleton key={index} isShort />
            ))}
          </div>
        </section>

        {/* Explore Videos Section Skeleton */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-40 h-7 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, index) => (
              <VideoCardSkeleton key={index} showUploader />
            ))}
          </div>
        </section>
      </main>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}

// Video Card Skeleton Component
function VideoCardSkeleton({ isShort, showUploader }: { isShort?: boolean; showUploader?: boolean }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      {/* Video Thumbnail Skeleton */}
      <div
        className={`w-full ${
          isShort ? "h-72" : "h-44"
        } bg-gray-300`}
      ></div>
      
      {/* Video Info Skeleton */}
      <div className="p-4 space-y-3">
        {/* Title Skeleton */}
        <div className="w-full h-5 bg-gray-300 rounded"></div>
        
        {/* Views & Date Skeleton */}
        <div className="flex items-center justify-between">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
        </div>
        
        {/* Uploader Skeleton (conditional) */}
        {showUploader && (
          <div className="w-24 h-3 bg-gray-300 rounded"></div>
        )}
      </div>
    </div>
  );
}