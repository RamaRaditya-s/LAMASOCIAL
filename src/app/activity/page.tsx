"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";

/* ------------------ Dummy Data & Helpers ------------------ */
const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 },
};

const dummyActivity = [
  {
    id: "a1",
    type: "post",
    verb: "created",
    title: "Photo: Sunset at Parangtritis",
    actor: "john_doe",
    time: "2025-09-21T18:34:00",
    meta: { device: "iPhone 14", location: "Yogyakarta, ID", ip: "103.24.12.44" },
  },
  {
    id: "a2",
    type: "profile",
    verb: "updated",
    title: "Bio changed",
    actor: "john_doe",
    time: "2025-09-17T09:15:00",
    meta: { device: "Safari on iPad", location: "Surabaya, ID", ip: "103.5.23.98" },
    diff: { from: "Loves running.", to: "Fitness trainer & coffee lover." },
  },
];

const activityPerDay = [
  { day: "Sep 15", events: 8 },
  { day: "Sep 16", events: 12 },
  { day: "Sep 17", events: 6 },
  { day: "Sep 18", events: 14 },
  { day: "Sep 19", events: 20 },
  { day: "Sep 20", events: 9 },
  { day: "Sep 21", events: 16 },
];

function formatTime(iso: string) {
  return new Date(iso).toLocaleString();
}
function iconForType(t: string) {
  return { post: "🖼️", profile: "✏️" }[t] ?? "🔔";
}

/* ------------------ Sub Components ------------------ */
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

const LeftMenu = dynamic(
  () => import("@/components/leftMenu/LeftMenu").then((m) => m.default ?? m),
  { ssr: false, loading: () => <LeftMenuPlaceholder /> }
);
const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((m) => m.default ?? m),
  { ssr: false, loading: () => <RightMenuPlaceholder user={dummyUser} /> }
);

/* ---- Timeline Section ---- */
function Timeline({
  activities,
  expandedId,
  setExpandedId,
}: {
  activities: typeof dummyActivity;
  expandedId: string | null;
  setExpandedId: (id: string | null) => void;
}) {
  return (
    <div className="space-y-3 max-h-[420px] overflow-auto pr-2">
      {activities.map((a) => (
        <div key={a.id} className="flex gap-3 p-3 rounded-md hover:bg-white shadow-sm">
          <div className="w-10 text-lg">{iconForType(a.type)}</div>
          <div className="flex-1 text-sm">
            <div className="flex justify-between">
              <div>
                <span className="font-medium">{a.actor}</span>{" "}
                {a.verb} <span className="font-medium">{a.title}</span>
                <div className="text-xs text-gray-500">{formatTime(a.time)}</div>
              </div>
              <button
                className="text-xs px-2 py-1 border rounded"
                onClick={() => setExpandedId(expandedId === a.id ? null : a.id)}
              >
                {expandedId === a.id ? "Collapse" : "Details"}
              </button>
            </div>

            {expandedId === a.id && (
              <div className="mt-2 bg-white border p-3 rounded-md">
                <div><strong>Device:</strong> {a.meta.device}</div>
                <div><strong>Location:</strong> {a.meta.location}</div>
                <div><strong>IP:</strong> {a.meta.ip}</div>
                {a.diff && (
                  <div className="mt-2 text-xs">
                    <strong>From:</strong> {a.diff.from}<br />
                    <strong>To:</strong> {a.diff.to}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
      {activities.length === 0 && (
        <div className="text-center text-gray-500 py-6">No activity found.</div>
      )}
    </div>
  );
}

/* ---- Analytics Section ---- */
function MiniAnalytics() {
  return (
    <div>
      <h3 className="font-medium mb-2">Mini Analytics</h3>

      {/* Area Chart */}
      <div className="w-full h-44">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={activityPerDay} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="events" stroke="#3b82f6" fill="url(#colorEvents)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-32 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activityPerDay} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" hide />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="events" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ---- Security Section ---- */
function SecurityLogs() {
  return (
    <div className="bg-white rounded-md shadow-sm p-4">
      <h3 className="font-medium mb-2">Device & Security Logs</h3>
      <ul className="text-sm space-y-2">
        <li>Chrome on Windows · Jakarta · Sep 21</li>
        <li>iPhone 14 · Yogyakarta · Sep 21</li>
        <li>Safari on iPad · Surabaya · Sep 17</li>
      </ul>
    </div>
  );
}

/* ------------------ Main Page ------------------ */
export default function ActivityPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => dummyActivity.sort((a, b) => +new Date(b.time) - +new Date(a.time)),
    []
  );

  return (
    <div className="flex gap-6 pt-6">
      <LeftMenu type={"home"} />

      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4 flex items-center gap-4">
          <Image src={dummyUser.avatar} alt="avatar" width={64} height={64} className="rounded-full" />
          <div>
            <h2 className="font-semibold">Activity Center</h2>
            <p className="text-sm text-gray-500">Detailed timeline & analytics</p>
          </div>
        </section>

        {/* Timeline + Analytics */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-2 bg-gray-50 p-4 rounded-md">
            <h3 className="font-medium mb-2">Timeline</h3>
            <Timeline activities={filtered} expandedId={expandedId} setExpandedId={setExpandedId} />
          </div>
          <div className="bg-white p-4 rounded-md">
            <MiniAnalytics />
          </div>
        </section>

        {/* Security Logs */}
        <SecurityLogs />
      </main>

      <div className="hidden lg:block w-[30%]">
        <RightMenu />
      </div>
    </div>
  );
}
