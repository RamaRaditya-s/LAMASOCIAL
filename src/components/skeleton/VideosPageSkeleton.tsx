"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function VideosPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">

      {/* LEFT MENU */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* MAIN CONTENT */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-10">

        {/* HEADER */}
        <section className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            
            {/* Title & Description */}
            <div className="flex-1 space-y-3">
              <div className="w-40 h-7 bg-gray-300 rounded animate-pulse"></div>

              <div className="space-y-2 max-w-xl">
                <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Upload Button */}
            <div className="w-40 h-12 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </section>

        {/* MY VIDEOS - VERTICAL LIST */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-20 h-6 bg-gray-300 rounded-full animate-pulse"></div>
          </div>

          {/* Vertical stacked video cards */}
          <div className="flex flex-col gap-6">
            {[...Array(3)].map((_, i) => (
              <VerticalVideoSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>

      {/* RIGHT MENU */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}

/* ---------------- VIDEO CARD (VERTICAL) ---------------- */
function VerticalVideoSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden animate-pulse">

      {/* THUMBNAIL (aspect-video) */}
      <div className="w-full aspect-video bg-gray-300"></div>

      {/* TEXT AREA */}
      <div className="p-4 space-y-3">

        {/* Title */}
        <div className="w-full h-5 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>

        {/* Views + Date */}
        <div className="flex items-center justify-between pt-2">
          <div className="w-20 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>

      </div>
    </div>
  );
}
