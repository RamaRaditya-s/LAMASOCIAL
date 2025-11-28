import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";
import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";

export default function FriendsPageSkeleton() {
  return (
    <div className="flex gap-6 pt-6 animate-pulse">
      {/* Left Menu Skeleton */}
      <div className="hidden xl:block w-[20%]">
        <LeftMenuSkeleton />
      </div>

      {/* Main Content Skeleton */}
      <div className="w-full lg:w-[70%] xl:w-[50%] flex flex-col gap-6">
        {/* Profile Header Skeleton */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-64 relative bg-gray-200 rounded-md">
            {/* Avatar position fixed - sama seperti di komponen asli */}
            <div className="w-32 h-32 rounded-full bg-gray-300 absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white"></div>
          </div>
          {/* Nama user - posisi disesuaikan */}
          <div className="mt-20 mb-4 w-48 h-8 bg-gray-300 rounded"></div>
        </div>

        {/* Content Sections Skeleton */}
        <div className="flex flex-col gap-6">
          {/* Friend Stories Skeleton */}
          <div>
            <div className="w-40 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="flex gap-4 overflow-x-auto py-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded mt-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Friend Suggestions Skeleton */}
          <div>
            <div className="w-48 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="flex gap-4 overflow-x-auto py-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center bg-gray-100 p-3 rounded-lg min-w-[120px]">
                  <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded mt-2"></div>
                  <div className="w-12 h-3 bg-gray-300 rounded mt-1"></div>
                  <div className="w-full h-6 bg-gray-400 rounded mt-2"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Friends Skeleton */}
          <div>
            <div className="w-32 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="flex gap-4 overflow-x-auto py-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg min-w-[140px]">
                  <div className="w-24 h-24 rounded-full bg-gray-300"></div>
                  <div className="w-20 h-5 bg-gray-300 rounded mt-3"></div>
                  <div className="w-16 h-3 bg-gray-300 rounded mt-1"></div>
                  <div className="w-full h-8 bg-gray-400 rounded mt-3"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Friends Feed Skeleton */}
          <div>
            <div className="w-32 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-100 p-3 rounded-lg flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300"></div>
                  <div className="flex-1">
                    <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="w-full h-3 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Friends Full List Skeleton */}
          <div>
            <div className="w-32 h-6 bg-gray-300 rounded mb-4"></div>
            <div className="w-full h-10 bg-gray-200 rounded-lg mb-4"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex flex-col items-center bg-gray-100 p-3 rounded-lg">
                  <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded mt-3"></div>
                  <div className="w-12 h-3 bg-gray-300 rounded mt-1"></div>
                  <div className="w-full h-8 bg-gray-400 rounded mt-2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Menu Skeleton */}
      <div className="hidden lg:block w-[30%]">
        <RightMenuSkeleton />
      </div>
    </div>
  );
}