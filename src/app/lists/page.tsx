"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ListsPageSkeleton, { ListModalSkeleton } from "@/components/skeleton/ListsPageSkeleton";
import RightMenuSkeleton from "@/components/skeleton/RightMenuSkeleton";
import LeftMenuSkeleton from "@/components/skeleton/LeftMenuSkeleton";

/* ------------------ Dynamic Menus with Skeleton Loading ------------------ */
const LeftMenu = dynamic(() => import("@/components/leftMenu/LeftMenu").then((m) => m.default ?? m), { 
  ssr: false,
  loading: () => <LeftMenuSkeleton />
});

const RightMenu = dynamic(() => import("@/components/rightMenu/RightMenu").then((m) => m.default ?? m), { 
  ssr: false,
  loading: () => <RightMenuSkeleton />
});

/* ------------------ Dummy Data ------------------ */
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

const dummyLists: WatchList[] = [
  {
    id: "l1",
    name: "Inspiration Board",
    cover: "/dummyCover.png",
    privacy: "Private",
    updatedAt: "2025-09-22",
    items: [
      { id: "i1", type: "photo", title: "Bali Sunrise", thumb: "/dummyCover.png", meta: "photo • 12 likes" },
      { id: "i2", type: "video", title: "Cinematic Travel Vlog", thumb: "/dummyCover.png", meta: "video • 1:24" },
      { id: "i3", type: "post", title: "UI/UX tips", thumb: "/dummyCover.png", meta: "post • 5 comments" },
    ],
  },
  {
    id: "l2",
    name: "Watch Later",
    cover: "/dummyCover.png",
    privacy: "Public",
    updatedAt: "2025-09-20",
    items: [
      { id: "i4", type: "video", title: "Quick Home Workout", thumb: "/dummyCover.png", meta: "video • 6:10" },
      { id: "i5", type: "video", title: "Easy Recipes", thumb: "/dummyCover.png", meta: "video • 3:40" },
      { id: "i6", type: "photo", title: "Street Food", thumb: "/dummyCover.png", meta: "photo • 30 saves" },
    ],
  },
  {
    id: "l3",
    name: "Product Ideas",
    cover: "/dummyCover.png",
    privacy: "Private",
    updatedAt: "2025-09-18",
    items: [
      { id: "i7", type: "post", title: "Market analysis", thumb: "/dummyCover.png", meta: "post • 2 comments" },
      { id: "i8", type: "photo", title: "Packaging mockup", thumb: "/dummyCover.png", meta: "photo • 4 likes" },
    ],
  },
];

/* ------------------ Helpers & Small UI Pieces ------------------ */
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

/* ------------------ Main Page ------------------ */
export default function ListsPage() {
  const router = useRouter();
  const [lists, setLists] = useState<WatchList[]>(dummyLists);
  const [selected, setSelected] = useState<WatchList | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    // Simulate loading delay for lists data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Simulate modal loading when a list is selected
  useEffect(() => {
    if (selected) {
      setModalLoading(true);
      const timer = setTimeout(() => {
        setModalLoading(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  const filtered = useMemo(() => {
    if (!query.trim()) return lists;
    const q = query.toLowerCase();
    return lists.filter((l) => l.name.toLowerCase().includes(q) || l.items.some((it) => it.title.toLowerCase().includes(q)));
  }, [lists, query]);

  function handleDeleteList(id: string) {
    if (!confirm("Delete this list? This action cannot be undone.")) return;
    setLists((prev) => prev.filter((l) => l.id !== id));
    if (selected?.id === id) setSelected(null);
  }

  function handleCreateList() {
    const name = prompt("New list name");
    if (!name) return;
    const newList: WatchList = {
      id: `l${Date.now()}`,
      name,
      cover: "/dummyCover.png",
      privacy: "Private",
      updatedAt: new Date().toISOString().slice(0, 10),
      items: [],
    };
    setLists((p) => [newList, ...p]);
  }

  // Function to handle album click
  function handleAlbumClick(list: WatchList) {
    // Navigate to list detail page
    router.push(`/lists/${list.id}`);
  }

  // Function to handle open button click (to prevent event bubbling)
  function handleOpenClick(e: React.MouseEvent, list: WatchList) {
    e.stopPropagation();
    setSelected(list);
  }

  if (loading) {
    return <ListsPageSkeleton />;
  }

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-8">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-semibold text-lg">Lists</h2>
            <p className="text-sm text-gray-500">Save content to themed lists — watch later, curate ideas, or share with others.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search lists or saved items..."
                className="w-64 pl-3 pr-10 py-2 rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-300"
                aria-label="Search lists"
              />
              <svg className="w-4 h-4 absolute right-3 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z" />
              </svg>
            </div>

            <button onClick={handleCreateList} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              + New List
            </button>
          </div>
        </section>

        {/* Lists Grid */}
        <section>
          <h3 className="font-semibold mb-4">My Lists</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((l) => (
              <article 
                key={l.id} 
                className="bg-white rounded-md shadow-sm hover:shadow-md transition cursor-pointer group"
                onClick={() => handleAlbumClick(l)}
              >
                {/* Cover */}
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-md">
                  <Image src={l.cover} alt={l.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                  {/* Privacy badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${l.privacy === "Public" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                      {l.privacy}
                    </span>
                  </div>
                  {/* item count */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-xs bg-black/50 text-white px-2 py-1 rounded-md">{l.items.length} items</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-semibold truncate">{l.name}</h4>
                    <div className="flex items-center gap-2">
                      <button
                        aria-label={`open ${l.name}`}
                        onClick={(e) => handleOpenClick(e, l)}
                        className="text-sm bg-amber-50 text-amber-700 px-2 py-1 rounded-md hover:bg-amber-100"
                      >
                        Open
                      </button>
                      <button
                        aria-label={`delete ${l.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteList(l.id);
                        }}
                        className="text-sm bg-red-50 text-red-700 px-2 py-1 rounded-md hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500">{l.updatedAt} • {l.privacy === "Public" ? "Shared" : "Private"}</p>

                  <div className="flex items-center gap-2 overflow-hidden">
                    {l.items.slice(0, 4).map((it) => (
                      <div key={it.id} className="relative w-14 h-14 rounded-md overflow-hidden border border-gray-100">
                        <Image src={it.thumb} alt={it.title} fill className="object-cover" />
                        <div className="absolute bottom-1 left-1">
                          <span className="text-xs bg-black/40 text-white px-1 rounded-sm">{it.type}</span>
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

            {filtered.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-10">No lists found.</div>
            )}
          </div>
        </section>
      </main>

      {/* Right Menu */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>

      {/* Detail Modal (when a list is selected) */}
      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} />

          <div className="relative bg-white rounded-t-xl md:rounded-xl w-full md:w-11/12 lg:w-3/4 max-h-[90vh] overflow-auto shadow-2xl p-4 md:p-6 z-10">
            {modalLoading ? (
              <ListModalSkeleton />
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-md overflow-hidden border border-gray-100">
                      <Image src={selected.cover} alt={selected.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selected.name}</h3>
                      <p className="text-sm text-gray-500">{selected.items.length} items • updated {selected.updatedAt}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button onClick={() => setSelected(null)} className="text-sm px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200">
                      Close
                    </button>
                  </div>
                </div>

                <hr className="my-4" />

                {/* Filters for items inside the list */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <TypeFilter />
                  </div>
                  <div className="text-sm text-gray-500">Showing {selected.items.length} item(s)</div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {selected.items.map((it) => (
                    <div key={it.id} className="bg-white rounded-md shadow-sm overflow-hidden">
                      <div className="relative w-full aspect-[9/16] bg-gray-100">
                        <Image src={it.thumb} alt={it.title} fill className="object-cover" />
                        <div className="absolute top-3 left-3">
                          <TypeBadge type={it.type} />
                        </div>
                      </div>

                      <div className="p-3">
                        <h4 className="font-semibold truncate">{it.title}</h4>
                        <p className="text-xs text-gray-500">{it.meta}</p>

                        <div className="mt-3 flex items-center gap-2">
                          <button className="text-xs px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700">Open</button>
                          <button className="text-xs px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">Remove</button>
                          <button className="ml-auto text-xs px-2 py-1 rounded-md bg-amber-50 text-amber-700">Share</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------ Small filter control used in modal (stateless visual only) ------------------ */
function TypeFilter() {
  return (
    <div className="flex items-center gap-2">
      <button className="text-xs px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">All</button>
      <button className="text-xs px-3 py-1 rounded-md bg-indigo-50 text-indigo-700">Photos</button>
      <button className="text-xs px-3 py-1 rounded-md bg-red-50 text-red-700">Videos</button>
      <button className="text-xs px-3 py-1 rounded-md bg-amber-50 text-amber-700">Posts</button>
    </div>
  );
}