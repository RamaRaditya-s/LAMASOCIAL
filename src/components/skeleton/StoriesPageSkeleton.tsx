"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function StoriesPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-8">
        {/* Profile Header Skeleton */}
        <div className="flex flex-col items-center">
          <div className="w-full h-56 relative">
            {/* Cover Skeleton */}
            <div className="w-full h-full bg-gray-300 rounded-md animate-pulse"></div>
            {/* Avatar Skeleton */}
            <div className="w-28 h-28 rounded-full absolute left-0 right-0 m-auto -bottom-12 ring-4 ring-white bg-gray-400 animate-pulse"></div>
          </div>
          {/* Name Skeleton */}
          <div className="mt-16 mb-4 w-48 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>

        {/* Story Carousel Skeleton */}
        <StoryCarouselSkeleton />
        
        {/* Story Viewer Skeleton */}
        <StoryViewerSkeleton />
      </div>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}

// Story Carousel Skeleton Component
function StoryCarouselSkeleton() {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="w-32 h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
      <div className="flex gap-4 overflow-x-auto py-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[100px]"
          >
            {/* Story Circle Skeleton */}
            <div className="w-20 h-20 rounded-full bg-gray-300 animate-pulse ring-2 ring-gray-200"></div>
            {/* Username Skeleton */}
            <div className="w-16 h-4 bg-gray-300 rounded mt-1 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Story Viewer Skeleton Component
function StoryViewerSkeleton() {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="w-36 h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-md"
          >
            {/* Story Image Skeleton */}
            <div className="w-full h-60 bg-gray-300 animate-pulse"></div>
            {/* Story Footer Skeleton */}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-400 p-2">
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}