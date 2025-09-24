"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";

/* ------------------ Dummy Data ------------------ */
// Sementara data contoh, nanti bisa diganti fetch API/database
const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 },
};

const dummyPhotos = [
  { id: "p1", url: "/dummyCover.png" },
  { id: "p2", url: "/dummyCover.png" },
  { id: "p3", url: "/dummyCover.png" },
  { id: "p4", url: "/dummyCover.png" },
];

/* ------------------ Dynamic Imports ------------------ */
const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((m) => m.default ?? m),
  { ssr: false }
);
const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((m) => m.default ?? m),
  { ssr: false }
);

/* ------------------ Album Detail Page ------------------ */
export default function AlbumDetailPage() {
  const { id } = useParams();

  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT MENU */}
      <LeftMenu />

      {/* MAIN CONTENT */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold">Album Details</h2>
            <p className="text-sm text-gray-500">
              Viewing all photos in album <span className="font-medium">{id}</span>
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Add Photo
          </button>
        </section>

        {/* Photos Grid */}
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {dummyPhotos.map((photo) => (
            <div key={photo.id} className="group relative w-full h-40 rounded-md overflow-hidden bg-gray-100 shadow-sm hover:shadow-md">
              <Image
                src={photo.url}
                alt={`Photo ${photo.id}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          ))}

          {dummyPhotos.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-10">
              No photos in this album.
            </div>
          )}
        </section>
      </main>

      {/* RIGHT MENU */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu user={dummyUser} />
      </div>
    </div>
  );
}
