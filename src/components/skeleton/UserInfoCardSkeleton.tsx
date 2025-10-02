const UserInfoCardSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center font-medium">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-6 w-6 bg-gray-200 rounded"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 text-gray-500">
        {/* Name + username */}
        <div className="flex items-center gap-2">
          <div className="h-5 w-32 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
        </div>

        {/* City */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 rounded"></div>
        </div>

        {/* Joined date */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCardSkeleton;
