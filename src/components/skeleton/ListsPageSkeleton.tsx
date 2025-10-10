"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function ListsPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-8">
        {/* Header Skeleton */}
        <section className="bg-white rounded-md shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-2">
            <div className="w-24 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="space-y-1">
              <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-48 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input Skeleton */}
            <div className="w-64 h-10 bg-gray-300 rounded-md animate-pulse"></div>
            {/* New List Button Skeleton */}
            <div className="w-32 h-10 bg-gray-300 rounded-md animate-pulse"></div>
          </div>
        </section>

        {/* Lists Grid Skeleton */}
        <section>
          <div className="w-32 h-6 bg-gray-300 rounded mb-4 animate-pulse"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ListCardSkeleton key={index} />
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

// List Card Skeleton Component
function ListCardSkeleton() {
  return (
    <div className="bg-white rounded-md shadow-sm animate-pulse">
      {/* Cover Skeleton */}
      <div className="relative w-full aspect-[4/3] bg-gray-300 rounded-t-md overflow-hidden">
        {/* Privacy Badge Skeleton */}
        <div className="absolute top-3 left-3 w-16 h-6 bg-gray-400 rounded-full"></div>
        {/* Item Count Skeleton */}
        <div className="absolute bottom-3 left-3 w-12 h-6 bg-gray-400 rounded-md"></div>
      </div>

      {/* Body Skeleton */}
      <div className="p-4 space-y-3">
        {/* Header with Title and Buttons */}
        <div className="flex items-center justify-between">
          <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
          <div className="flex gap-2">
            <div className="w-12 h-6 bg-gray-300 rounded-md"></div>
            <div className="w-12 h-6 bg-gray-300 rounded-md"></div>
          </div>
        </div>

        {/* Date and Privacy Info */}
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>

        {/* Thumbnails Grid */}
        <div className="flex gap-2 overflow-hidden">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-14 h-14 bg-gray-300 rounded-md"></div>
          ))}
          {/* Extra Items Count */}
          <div className="w-14 h-14 bg-gray-200 rounded-md flex items-center justify-center">
            <div className="w-6 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Modal Skeleton Component (for when list is selected)
export function ListModalSkeleton() {
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative bg-white rounded-t-xl md:rounded-xl w-full md:w-11/12 lg:w-3/4 max-h-[90vh] overflow-auto shadow-2xl p-4 md:p-6 z-10">
        {/* Modal Header Skeleton */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-md"></div>
            <div className="space-y-2">
              <div className="w-48 h-6 bg-gray-300 rounded"></div>
              <div className="w-32 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
        </div>

        <div className="w-full h-px bg-gray-200 my-4"></div>

        {/* Filters Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <div className="flex gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="w-16 h-6 bg-gray-300 rounded-md"></div>
            ))}
          </div>
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
        </div>

        {/* Items Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, index) => (
            <ListItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

// List Item Skeleton Component (for modal)
function ListItemSkeleton() {
  return (
    <div className="bg-white rounded-md shadow-sm overflow-hidden animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="relative w-full aspect-[9/16] bg-gray-300">
        {/* Type Badge Skeleton */}
        <div className="absolute top-3 left-3 w-12 h-5 bg-gray-400 rounded-full"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-3 space-y-2">
        <div className="w-full h-5 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
        
        {/* Actions Skeleton */}
        <div className="flex gap-2 mt-3">
          <div className="w-12 h-6 bg-gray-300 rounded-md"></div>
          <div className="w-16 h-6 bg-gray-300 rounded-md"></div>
          <div className="ml-auto w-12 h-6 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
}