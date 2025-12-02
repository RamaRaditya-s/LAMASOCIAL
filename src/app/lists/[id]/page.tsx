"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";
import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";

const LeftMenu = dynamic(() => import("@/components/leftMenu/LeftMenu"), {
  ssr: false,
  loading: () => <LeftMenuSkeleton />,
});

const RightMenu = dynamic(() => import("@/components/rightMenu/RightMenu"), {
  ssr: false,
  loading: () => <RightMenuSkeleton />,
});

type ItemType = "video" | "photo" | "post";

type ListItem = {
  id: string;
  type: ItemType;
  title: string;
  thumb: string;
  meta?: string;
};

type ListDetail = {
  id: string;
  name: string;
  cover: string;
  privacy: string;
  updatedAt: string;
  items: ListItem[];
};

export default function ListDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [list, setList] = useState<ListDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetch(`/api/lists/${id}`);
        const data = await res.json();
        setList(data);
      } catch (err) {
        console.error("Failed to fetch list:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchList();
  }, [id]);

  if (loading)
    return (
      <div className="flex gap-6 pt-6">
        <LeftMenu type={"home"} />
        <main className="w-full lg:w-[70%] xl:w-[60%] flex items-center justify-center">
          <p className="text-gray-500 text-sm">Loading list...</p>
        </main>
        <div className="hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    );

  if (!list)
    return (
      <div className="flex gap-6 pt-6">
        <LeftMenu type={"home"} />
        <main className="w-full lg:w-[70%] xl:w-[60%] flex items-center justify-center">
          <p className="text-gray-500 text-sm">List not found.</p>
        </main>
        <div className="hidden lg:block w-[30%]">
          <RightMenu />
        </div>
      </div>
    );

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header list */}
        <div className="bg-white rounded-md shadow-sm overflow-hidden">
          <div className="relative w-full h-56">
            <Image src={list.cover} alt={list.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl font-semibold">{list.name}</h2>
              <p className="text-sm opacity-80">
                {list.privacy} • Updated {new Date(list.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Item grid */}
        <section>
          <h3 className="font-semibold mb-4 text-gray-700">Saved Items</h3>

          {list.items.length === 0 ? (
            <p className="text-sm text-gray-500">No items in this list yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {list.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-md shadow-sm overflow-hidden hover:shadow-md transition"
                >
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.thumb}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-2 left-2 text-xs bg-black/40 text-white px-2 py-1 rounded">
                      {item.type}
                    </span>
                  </div>
                  <div className="p-3">
                    <h4 className="text-sm font-medium truncate">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
