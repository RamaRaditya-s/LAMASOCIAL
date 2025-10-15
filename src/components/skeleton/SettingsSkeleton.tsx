import React from "react";

export default function SettingsSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
          <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-100 rounded"></div>
        </div>
      ))}
    </div>
  );
}
