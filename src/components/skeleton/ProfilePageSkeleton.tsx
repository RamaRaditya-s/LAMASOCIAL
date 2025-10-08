"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function ProfilePageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          {/* Cover & Avatar Skeleton */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              {/* Cover Skeleton */}
              <div className="w-full h-full bg-gray-300 rounded-md animate-pulse"></div>
              {/* Avatar Skeleton */}
              <div className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white bg-gray-400 animate-pulse"></div>
            </div>

            {/* Name Skeleton */}
            <div className="mt-20 mb-4 w-48 h-8 bg-gray-300 rounded animate-pulse"></div>

            {/* Stats Skeleton */}
            <div className="flex items-center justify-center gap-12 mb-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-8 h-6 bg-gray-300 rounded animate-pulse mb-1"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Feed Skeleton */}
          <FeedSkeleton />
        </div>
      </div>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}

// Feed Skeleton Component
function FeedSkeleton() {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm">
      {/* Feed Title Skeleton */}
      <div className="w-32 h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
      
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="p-4 border rounded-lg animate-pulse">
            {/* Post Header Skeleton */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="space-y-1">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
              </div>
            </div>
            
            {/* Post Content Skeleton */}
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
            </div>
            
            {/* Post Image Skeleton */}
            <div className="w-full h-48 bg-gray-200 rounded mt-3"></div>
            
            {/* Post Actions Skeleton */}
            <div className="flex gap-4 mt-3">
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
              <div className="w-16 h-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}