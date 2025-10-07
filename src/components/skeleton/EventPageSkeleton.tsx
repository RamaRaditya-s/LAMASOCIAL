"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function EventPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header Skeleton */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 animate-pulse"></div>
          <div className="space-y-2">
            <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </section>

        {/* Filter Skeleton */}
        <section className="bg-white rounded-md shadow-sm p-4 flex flex-wrap gap-3">
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="w-20 h-8 bg-gray-300 rounded animate-pulse"
            ></div>
          ))}
        </section>

        {/* Event List Skeleton */}
        <section className="bg-gray-50 rounded-md p-4 flex flex-col gap-4">
          {[...Array(3)].map((_, index) => (
            <EventCardSkeleton key={index} />
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

// Event Card Skeleton Component
function EventCardSkeleton() {
  return (
    <div className="flex gap-4 p-4 rounded-md bg-white shadow-sm">
      {/* Event Image Skeleton */}
      <div className="w-24 h-24 bg-gray-300 rounded-md animate-pulse"></div>
      
      {/* Event Content Skeleton */}
      <div className="flex-1 space-y-2">
        {/* Title */}
        <div className="w-3/4 h-5 bg-gray-300 rounded animate-pulse"></div>
        
        {/* Date */}
        <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse"></div>
        
        {/* Location */}
        <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
        
        {/* Meta Info */}
        <div className="w-1/2 h-3 bg-gray-300 rounded animate-pulse"></div>
      </div>
    </div>
  );
}