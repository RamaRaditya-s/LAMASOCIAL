const AdSkeleton = ({ size }: { size?: "sm" | "md" | "lg" }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm animate-pulse">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-4 bg-gray-200 rounded"></div>
      </div>

      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${
          size === "sm" ? "gap-2" : "gap-4"
        }`}
      >
        {/* IMAGE */}
        <div
          className={`relative w-full ${
            size === "sm"
              ? "h-24"
              : size === "md"
              ? "h-36"
              : "h-48"
          } bg-gray-200 rounded-lg`}
        ></div>

        {/* AVATAR + NAME */}
        <div className="flex items-center gap-4 mt-2">
          <div className="w-6 h-6 rounded-full bg-gray-200"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>

        {/* TEXT */}
        <div className="flex flex-col gap-2">
          <div className="h-3 w-full bg-gray-200 rounded"></div>
          {size !== "sm" && (
            <div className="h-3 w-3/4 bg-gray-200 rounded"></div>
          )}
          {size === "lg" && (
            <div className="h-3 w-2/3 bg-gray-200 rounded"></div>
          )}
        </div>

        {/* BUTTON */}
        <div className="h-8 w-24 bg-gray-200 rounded-lg mt-2"></div>
      </div>
    </div>
  );
};

export default AdSkeleton;
