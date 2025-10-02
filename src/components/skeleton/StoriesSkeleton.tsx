export default function StoriesSkeleton() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex gap-4 overflow-x-auto">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 rounded-full bg-gray-300 animate-pulse" />
            <div className="h-3 w-12 bg-gray-300 animate-pulse" />
          </div>
        ))}
    </div>
  );
}