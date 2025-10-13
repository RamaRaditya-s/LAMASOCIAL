import React from "react";

export default function StatCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string;
  value: number;
  icon: any;
  color: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-2">
            {value.toLocaleString()}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
          <Icon />
        </div>
      </div>
    </div>
  );
}
