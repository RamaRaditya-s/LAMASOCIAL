const UserMediaCardSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center font-medium">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-3 w-12 bg-gray-200 rounded"></div>
      </div>

      {/* Grid skeleton */}
      <div
        className="
          grid gap-4
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {/* Dummy squares (5 item minimal) */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-full aspect-video bg-gray-200 rounded-md"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default UserMediaCardSkeleton;
