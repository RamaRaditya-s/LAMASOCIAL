export default function AddPostSkeleton() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-4">
      <div className="h-12 w-full bg-gray-300 animate-pulse" />
      <div className="h-48 w-full bg-gray-300 animate-pulse" />
    </div>
  );
}