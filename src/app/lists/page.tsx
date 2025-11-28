"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListsPageSkeleton, { ListModalSkeleton } from "@/components/skeleton/ListsPageSkeleton";
import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

const LeftMenu = dynamic(() => import("@/components/leftMenu/LeftMenu"), { ssr: false, loading: () => <LeftMenuSkeleton /> });
const RightMenu = dynamic(() => import("@/components/rightMenu/RightMenu"), { ssr: false, loading: () => <RightMenuSkeleton /> });

type ItemType = "video" | "photo" | "post";
type SavedItem = {
  id: string;
  type: ItemType;
  title: string;
  thumb: string;
  meta?: string;
};

type WatchList = {
  id: string;
  name: string;
  cover: string;
  items: SavedItem[];
  privacy: "Private" | "Public";
  updatedAt: string;
};

function TypeBadge({ type }: { type: ItemType }) {
  const label = type === "video" ? "Video" : type === "photo" ? "Photo" : "Post";
  const base =
    type === "video"
      ? "bg-red-50 text-red-700"
      : type === "photo"
      ? "bg-indigo-50 text-indigo-700"
      : "bg-amber-50 text-amber-700";
  return <span className={`text-xs font-semibold px-2 py-1 rounded-full ${base}`}>{label}</span>;
}

export default function ListsPage() {
  const router = useRouter();
  const [lists, setLists] = useState<WatchList[]>([]);
  const [selected, setSelected] = useState<WatchList | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    async function fetchLists() {
      try {
        const res = await fetch("/api/lists");
        const data = await res.json();
        setLists(data);
      } catch (err) {
        console.error("Failed to fetch lists:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchLists();
  }, []);

  useEffect(() => {
    if (selected) {
      setModalLoading(true);
      const timer = setTimeout(() => setModalLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  const filtered = useMemo(() => {
    if (!query.trim()) return lists;
    const q = query.toLowerCase();
    return lists.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.items.some((it) => it.title.toLowerCase().includes(q))
    );
  }, [lists, query]);

  function handleAlbumClick(list: WatchList) {
    router.push(`/lists/${list.id}`);
  }

  if (loading) return <ListsPageSkeleton />;

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-8">
        <section className="bg-white rounded-md shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-lg">Lists</h2>
            <p className="text-sm text-gray-500">
              Save content to themed lists — watch later, curate ideas, or share with others.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lists or saved items..."
              className="w-64 pl-3 pr-10 py-2 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
          </div>
        </section>

        <section>
          <h3 className="font-semibold mb-4">My Lists</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l) => (
              <article
                key={l.id}
                className="bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer group"
                onClick={() => handleAlbumClick(l)}
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-md">
                  <Image src={l.cover} alt={l.name} fill className="object-cover" />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        l.privacy === "Public"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {l.privacy}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md">
                      {l.items.length} items
                    </span>
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <h4 className="font-semibold truncate">{l.name}</h4>
                  <p className="text-xs text-gray-500">{l.updatedAt}</p>

                  <div className="flex items-center gap-2 overflow-hidden">
                    {l.items.slice(0, 4).map((it) => (
                      <div key={it.id} className="relative w-14 h-14 rounded-md overflow-hidden border border-gray-100">
                        <Image src={it.thumb} alt={it.title} fill className="object-cover" />
                        <div className="absolute bottom-1 left-1">
                          <span className="text-xs bg-black/40 text-white px-1 rounded-sm">
                            {it.type}
                          </span>
                        </div>
                      </div>
                    ))}
                    {l.items.length > 4 && (
                      <div className="w-14 h-14 rounded-md bg-gray-50 flex items-center justify-center text-sm text-gray-600 border border-gray-100">
                        +{l.items.length - 4}
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
