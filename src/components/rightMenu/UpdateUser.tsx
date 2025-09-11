"use client";

import Image from "next/image";
import { useState } from "react";

const UpdateUser = ({ user }: { user: any }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <span
        className="text-blue-500 text-xs cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 flex items-center justify-center z-50 ">
          <div className="p-12 bg-white rounded-lg shadow-md flex flex-col gap-2 w-full md:w-1/2 xl:w-1/3 relative">
            <h1>Update Profile (Demo)</h1>
            <div className="mt-4 text-xs text-gray-500">
              Static preview only
            </div>
            <div className="flex flex-col gap-4 my-4">
              <label>Cover Picture</label>
              <div className="flex items-center gap-2">
                <Image
                  src={user.cover || "/noCover.png"}
                  alt=""
                  width={48}
                  height={32}
                  className="w-12 h-8 rounded-md object-cover"
                />
                <span className="text-xs underline text-gray-600">Change</span>
              </div>
            </div>
            {/* input contoh */}
            <input
              type="text"
              placeholder={user.name || "John"}
              className="ring-1 ring-gray-300 p-[13px] rounded-md text-sm"
            />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
