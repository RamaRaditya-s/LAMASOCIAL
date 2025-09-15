"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">

      <Image
        src="/not-found-icon.png"
        alt="Page not found"
        width={200}
        height={200}
        className="mb-6"
        priority
      />

      <h1 className="text-3xl font-bold mb-2">Oops! Page Not Found</h1>

      <p className="text-gray-600 mb-6 max-w-md">
        Halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
      </p>

      <button
        onClick={() => router.back()}
        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
      >
        Go Back
      </button>
    </main>
  );
}
