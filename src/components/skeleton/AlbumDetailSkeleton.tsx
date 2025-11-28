"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function AlbumDetailSkeleton() {
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
            <div className="w-40 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="w-32 h-10 bg-gray-300 rounded animate-pulse"></div>
        </section>

        {/* Photos Grid Skeleton */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, index) => (
            <PhotoCardSkeleton key={index} />
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

// Photo Card Skeleton Component
function PhotoCardSkeleton() {
  return (
    <div className="w-full h-40 bg-gray-300 rounded-md animate-pulse overflow-hidden">
      {/* Photo placeholder dengan variasi tinggi untuk efek natural */}
      <div 
        className="w-full h-full bg-gray-400"
        style={{ 
          height: `${80 + Math.random() * 40}%`,
          marginTop: `${Math.random() * 20}%`
        }}
      ></div>
    </div>
  );
}