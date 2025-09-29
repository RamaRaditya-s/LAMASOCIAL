"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

const LeftMenu = dynamic(() => import("@/components/leftMenu/LeftMenu"), { ssr: false });
const RightMenu = dynamic(() => import("@/components/rightMenu/RightMenu"), { ssr: false });

const dummyUser = { username: "john_doe", name: "John Doe", avatar: "/dummyCover.png" };

const myVideos = [
  { id: "m1", title: "My Travel Vlog", thumb: "/dummyCover.png", views: 980, createdAt: "2025-09-21" },
  { id: "m2", title: "Workout Routine", thumb: "/dummyCover.png", views: 650, createdAt: "2025-09-22" },
];

const exploreVideos = [
  { id: "e1", title: "Nature Documentary", thumb: "/dummyCover.png", uploader: "alice", views: 5230, createdAt: "2025-09-20" },
  { id: "e2", title: "Street Food Tour", thumb: "/dummyCover.png", uploader: "bob", views: 4310, createdAt: "2025-09-19" },
  { id: "e3", title: "Tech Review", thumb: "/dummyCover.png", uploader: "charlie", views: 2120, createdAt: "2025-09-18" },
  { id: "e4", title: "Funny Cats Compilation", thumb: "/dummyCover.png", uploader: "dina", views: 6700, createdAt: "2025-09-18" },
];

export default function VideosPage() {
  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-10">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">Videos</h2>
            <p className="text-sm text-gray-500">
              Explore, upload, and watch videos from you and creators worldwide
            </p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            + Upload Video
          </button>
        </section>

        {/* My Videos */}
        <section>
          <h3 className="font-semibold mb-4">My Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myVideos.map((v) => (
              <VideoCard key={v.id} data={v} isShort />
            ))}
          </div>
        </section>

        {/* Explore Videos */}
        <section>
          <h3 className="font-semibold mb-4">Explore Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreVideos.map((v) => (
              <VideoCard key={v.id} data={v} isShort showUploader />
            ))}
          </div>
        </section>
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu user={dummyUser} />
      </div>
    </div>
  );
}

type VideoType = {
  id: string;
  title: string;
  thumb: string;
  views: number;
  createdAt: string;
  uploader?: string;
};

function VideoCard({
  data,
  isShort,
  showUploader,
}: {
  data: VideoType;
  isShort?: boolean;
  showUploader?: boolean;
}) {
  return (
    <div className="group bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer">
      <div
        className={`relative w-full overflow-hidden rounded-t-md ${
          isShort ? "h-72" : "h-44"
        }`}
      >
        <Image
          src={data.thumb}
          alt={data.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>
      <div className="p-4">
        <h4 className="font-semibold truncate">{data.title}</h4>
        <p className="text-xs text-gray-500">
          {data.views} views • {data.createdAt}
        </p>
        {showUploader && (
          <p className="text-xs text-gray-400">by {data.uploader}</p>
        )}
      </div>
    </div>
  );
}
