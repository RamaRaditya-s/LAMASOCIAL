"use client";


import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function SettingsPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6">
      {/* Left Menu Skeleton */}
      <div className="w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header Skeleton */}
        <section className="bg-white rounded-md shadow-sm p-4">
          <div className="w-32 h-6 bg-gray-300 rounded animate-pulse mb-2"></div>
          <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
        </section>

        {/* Tabs + Content Skeleton */}
        <div className="flex flex-col md:flex-row bg-white rounded-md shadow-sm animate-pulse">
          {/* Tabs Sidebar Skeleton */}
          <aside className="md:w-1/4 border-b md:border-b-0 md:border-r p-4 space-y-2">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-full h-10 bg-gray-200 rounded"></div>
            ))}
          </aside>

          {/* Tab Content Skeleton */}
          <div className="flex-1 p-6 space-y-6">
            {/* Tab Title Skeleton */}
            <div className="w-48 h-6 bg-gray-300 rounded"></div>

            {/* Form Fields Skeleton */}
            <div className="space-y-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                  <div className="w-full h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>

            {/* Save Button Skeleton */}
            <div className="w-32 h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </main>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}