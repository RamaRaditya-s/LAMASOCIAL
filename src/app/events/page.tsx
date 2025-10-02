"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

/* ------------------ Dummy Data ------------------ */
const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 },
};

const events = [
  {
    id: "e1",
    title: "EVENT 1",
    date: "2025-10-12T18:00:00",
    location: "Taman Sari, Yogyakarta",
    cover: "/dummyCover.png",
    category: "Festival",
    description:
      "Ini adalah Event acara Menonton Film Bersama di Bisokop",
    attendees: 128,
  },
  {
    id: "e2",
    title: "EVENT 2",
    date: "2025-11-05T13:00:00",
    location: "Online Event",
    cover: "/dummyCover.png",
    category: "Technology",
    description:
      "Ini adalah Event acara Menonton Film Bersama di Bisokop",
    attendees: 210,
  },
  {
    id: "e3",
    title: "EVENT 3",
    date: "2025-09-30T06:00:00",
    location: "GBK Senayan, Jakarta",
    cover: "/dummyCover.png",
    category: "Sports",
    description: "Ini adalah Event acara Menonton Film Bersama di Bisokop",
    attendees: 60,
  },
];

/* ------------------ Helpers ------------------ */
function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}

/* ------------------ Placeholders ------------------ */
function LeftMenuPlaceholder() {
  return (
    <div className="hidden xl:block w-[20%]">
      <div className="p-4 bg-white rounded-md shadow-sm">Left Menu</div>
    </div>
  );
}
function RightMenuPlaceholder({ user }: { user: any }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm sticky top-6">
      <h3 className="font-medium mb-2">About {user.name}</h3>
      <p className="text-sm text-gray-600">Followers: {user._count.followers}</p>
      <p className="text-sm text-gray-600">Following: {user._count.followings}</p>
    </div>
  );
}

/* ------------------ Dynamic Imports ------------------ */
const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((m) => m.default ?? m),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);
const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((m) => m.default ?? m),
  { ssr: false, loading: () => <RightMenuPlaceholder user={dummyUser} /> }
);

/* ------------------ Event List ------------------ */
function EventCard({
  event,
  onSelect,
}: {
  event: (typeof events)[0];
  onSelect: (e: (typeof events)[0]) => void;
}) {
  return (
    <div
      onClick={() => onSelect(event)}
      className="cursor-pointer flex gap-4 p-4 rounded-md hover:bg-white shadow-sm transition"
    >
      <Image
        src={event.cover}
        alt={event.title}
        width={96}
        height={96}
        className="rounded-md object-cover"
      />
      <div className="flex-1 text-sm">
        <h4 className="font-semibold text-base">{event.title}</h4>
        <div className="text-gray-500 text-xs">{formatDate(event.date)}</div>
        <div className="text-gray-600">{event.location}</div>
        <div className="text-xs mt-1">
          {event.attendees} attending • {event.category}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Detail Modal ------------------ */
function EventDetail({
  event,
  onClose,
}: {
  event: (typeof events)[0];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-md max-w-lg w-full shadow-xl overflow-auto max-h-[90vh]">
        <Image
          src={event.cover}
          alt={event.title}
          width={800}
          height={400}
          className="rounded-t-md object-cover"
        />
        <div className="p-6 space-y-3">
          <h3 className="font-bold text-xl">{event.title}</h3>
          <p className="text-gray-500">{formatDate(event.date)}</p>
          <p className="text-gray-600">{event.location}</p>
          <p className="text-gray-700">{event.description}</p>
          <p className="text-sm text-gray-500">
            {event.attendees} people interested
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------ Main Page ------------------ */
export default function EventPage() {
  const [selected, setSelected] = useState<(typeof events)[0] | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  const filteredEvents =
    categoryFilter === "All"
      ? events
      : events.filter((e) => e.category === categoryFilter);

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center gap-4">
          <Image
            src={dummyUser.avatar}
            alt="avatar"
            width={64}
            height={64}
            className="rounded-full"
          />
          <div>
            <h2 className="font-semibold">Events</h2>
            <p className="text-sm text-gray-500">
              Discover and join upcoming events
            </p>
          </div>
        </section>

        {/* Filter */}
        <section className="bg-white rounded-md shadow-sm p-4 flex flex-wrap gap-3">
          <button
            onClick={() => setCategoryFilter("All")}
            className={`px-3 py-1 rounded border ${
              categoryFilter === "All"
                ? "bg-blue-500 text-white"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            All
          </button>
          {["Festival", "Technology", "Sports"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded border ${
                categoryFilter === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </section>

        {/* Event List */}
        <section className="bg-gray-50 rounded-md p-4 flex flex-col gap-4">
          {filteredEvents.map((ev) => (
            <EventCard key={ev.id} event={ev} onSelect={setSelected} />
          ))}
          {filteredEvents.length === 0 && (
            <div className="text-center text-gray-500 py-6">
              No events found.
            </div>
          )}
        </section>
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu  />
      </div>

      {selected && (
        <EventDetail event={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
