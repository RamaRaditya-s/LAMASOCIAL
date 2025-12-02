"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function AlbumsPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header Skeleton */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
          <div className="space-y-2">
            <div className="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
        </section>

        {/* Albums Grid Skeleton */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <AlbumCardSkeleton key={index} />
          ))}
        </section>
      </main>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}

// Album Card Skeleton Component
function AlbumCardSkeleton() {
  return (
    <div className="bg-white rounded-md shadow-sm animate-pulse">
      {/* Album Cover Skeleton */}
      <div className="w-full h-44 bg-gray-300 rounded-t-md"></div>
      
      {/* Album Info Skeleton */}
      <div className="p-4 space-y-2">
        {/* Album Name Skeleton */}
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        
        {/* Album Meta Skeleton */}
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}