import Skeleton from "./Skeleton";

export default function FeedSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-4 w-full" /> {/* post text */}
      <Skeleton className="h-48 w-full" /> {/* post image */}
    </div>);
}