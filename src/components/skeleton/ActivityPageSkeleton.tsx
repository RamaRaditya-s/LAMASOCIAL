"use client";

import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

export default function ActivityPageSkeleton() {
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
          <div className="w-16 h-16 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="space-y-2">
            <div className="w-48 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </section>

        {/* Timeline + Analytics Grid Skeleton */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Timeline Skeleton - Colspan 2 */}
          <div className="col-span-2 bg-gray-50 p-4 rounded-md">
            <div className="w-24 h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
            <TimelineSkeleton />
          </div>

          {/* Analytics Skeleton */}
          <div className="bg-white p-4 rounded-md">
            <AnalyticsSkeleton />
          </div>
        </section>

        {/* Security Logs Skeleton */}
        <SecurityLogsSkeleton />
      </main>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}

// Timeline Skeleton Component
function TimelineSkeleton() {
  return (
    <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="flex gap-3 p-3 rounded-md bg-white shadow-sm animate-pulse">
          {/* Icon Skeleton */}
          <div className="w-10 h-10 bg-gray-300 rounded"></div>
          
          {/* Content Skeleton */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <div className="space-y-1">
                <div className="w-48 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-3 bg-gray-300 rounded"></div>
              </div>
              <div className="w-16 h-6 bg-gray-300 rounded"></div>
            </div>
            
            {/* Expanded Details Skeleton */}
            <div className="mt-2 bg-gray-100 border p-3 rounded-md space-y-2">
              <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
              <div className="w-2/3 h-3 bg-gray-300 rounded"></div>
              <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Analytics Skeleton Component
function AnalyticsSkeleton() {
  return (
    <div>
      {/* Title Skeleton */}
      <div className="w-32 h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>

      {/* Area Chart Skeleton */}
      <div className="w-full h-44 bg-gray-100 rounded-md animate-pulse flex items-end justify-between p-2">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="w-6 bg-gray-300 rounded-t"
            style={{ height: `${20 + Math.random() * 60}%` }}
          ></div>
        ))}
      </div>

      {/* Bar Chart Skeleton */}
      <div className="w-full h-32 mt-4 bg-gray-100 rounded-md animate-pulse flex items-end justify-between p-2">
        {[...Array(7)].map((_, index) => (
          <div
            key={index}
            className="w-4 bg-gray-300 rounded-t"
            style={{ height: `${30 + Math.random() * 50}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}

// Security Logs Skeleton Component
function SecurityLogsSkeleton() {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      {/* Title Skeleton */}
      <div className="w-48 h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
      
      <div className="space-y-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
            <div className="w-64 h-4 bg-gray-300 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}