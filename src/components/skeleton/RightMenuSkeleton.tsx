export default function RightMenuSkeleton() {
  return (
    <div className="flex flex-col gap-6 animate-pulse">
      {/* User Info Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="h-24 w-full bg-gray-200 rounded-md mb-4"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
      </div>

      {/* User Media Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-3 gap-2">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Friend Requests Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="flex-1">
            <div className="h-3 w-2/3 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Birthdays Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Ad Skeleton */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <div className="h-24 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}