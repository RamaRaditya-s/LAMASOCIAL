"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md text-center p-8">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center 
                        rounded-full bg-blue-100">
          <Image
            src="/notfound.png"
            alt="Not found icon"
            width={40}
            height={40}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          This page is unavailable
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          The page you’re looking for has been deleted or the link is invalid.
        </p>

        {/* Button */}
        <button
          onClick={() => router.back()}
          className="w-full rounded-lg bg-blue-500 px-6 py-3
                     text-white font-medium hover:bg-blue-600
                     transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}
