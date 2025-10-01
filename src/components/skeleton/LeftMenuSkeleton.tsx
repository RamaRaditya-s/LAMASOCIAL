import Skeleton from "./Skeleton";

export default function LeftMenuSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* ProfileCard skeleton */}
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center gap-2">
        <Skeleton className="h-16 w-16 rounded-full" /> {/* avatar */}
        <Skeleton className="h-4 w-24" /> {/* name */}
        <Skeleton className="h-3 w-16" /> {/* subtitle */}
      </div>

      {/* Navigation skeleton */}
      <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-5 w-5 rounded" /> {/* icon */}
              <Skeleton className="h-4 w-24" /> {/* label */}
            </div>
          ))}
      </div>

      {/* Ads skeleton */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
