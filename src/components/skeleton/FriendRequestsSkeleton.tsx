// components/skeleton/FriendRequestsSkeleton.tsx

const FriendRequestsSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 animate-pulse">
      {/* Header */}
      <div className="flex justify-between items-center font-medium">
        <div className="h-4 w-28 bg-gray-200 rounded"></div>
        <div className="h-3 w-12 bg-gray-200 rounded"></div>
      </div>

      {/* Request Item */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          {/* Name */}
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
          <div className="w-6 h-6 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsSkeleton;
