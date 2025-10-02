const BirthdaysSkeleton = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4 animate-pulse">
      {/* TOP */}
      <div className="h-4 bg-gray-200 rounded w-20"></div>

      {/* USER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
        </div>
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
      </div>

      {/* UPCOMING */}
      <div className="p-4 bg-slate-100 rounded-lg flex items-center gap-4">
        <div className="w-6 h-6 bg-gray-200 rounded"></div>
        <div className="flex flex-col gap-1 w-full">
          <div className="h-3 w-28 bg-gray-200 rounded"></div>
          <div className="h-3 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BirthdaysSkeleton;
