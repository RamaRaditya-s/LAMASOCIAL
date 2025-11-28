"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import SettingsPageSkeleton from "@/components/skeleton/SettingsPageSkeleton";

/* ------------------ Dummy User ------------------ */
const dummyUser = {
  username: "john_doe",
  name: "John Doe",
  email: "john@example.com",
  avatar: "/dummyCover.png",
  _count: { posts: 12, followers: 340, followings: 180 },
};

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
  { 
    ssr: false,
    loading: () => <LeftMenuPlaceholder />
  }
);

const RightMenu = dynamic(
  () => import("@/components/rightMenu/RightMenu").then((m) => m.default ?? m),
  { 
    ssr: false,
    loading: () => <RightMenuPlaceholder user={dummyUser} />
  }
);

/* ------------------ Settings Tabs ------------------ */
const tabs = ["Account", "Privacy", "Notifications", "Appearance", "Connections"];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Account");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SettingsPageSkeleton />;
  }

  return (
    <div className="flex gap-6 pt-6">
      {/* LEFT MENU */}
      <LeftMenu type={"home"} />

      {/* MAIN CONTENT */}
      <main className="w-full lg:w-[70%] xl:w-[60%] flex flex-col gap-6">
        {/* Header */}
        <section className="bg-white rounded-md shadow-sm p-4">
          <h2 className="font-semibold text-lg">Settings</h2>
          <p className="text-sm text-gray-500">
            Manage your account and privacy preferences
          </p>
        </section>

        {/* Tabs + Content */}
        <div className="flex flex-col md:flex-row bg-white rounded-md shadow-sm">
          {/* Tabs Sidebar */}
          <aside className="md:w-1/4 border-b md:border-b-0 md:border-r">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                  activeTab === t ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {t}
              </button>
            ))}
          </aside>

          {/* Tab Content */}
          <div className="flex-1 p-6 space-y-6">
            {activeTab === "Account" && (
              <div>
                <h3 className="font-semibold mb-4">Account Information</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      defaultValue={dummyUser.name}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    <input
                      type="text"
                      defaultValue={dummyUser.username}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={dummyUser.email}
                      className="w-full border rounded-md p-2"
                    />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {activeTab === "Privacy" && (
              <div>
                <h3 className="font-semibold mb-4">Privacy & Security</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    Make my profile private
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" />
                    Enable two-factor authentication
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div>
                <h3 className="font-semibold mb-4">Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" defaultChecked />
                    Email notifications
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" />
                    Push notifications
                  </label>
                </div>
              </div>
            )}

            {activeTab === "Appearance" && (
              <div>
                <h3 className="font-semibold mb-4">Appearance</h3>
                <label className="flex items-center gap-3">
                  <input type="checkbox" />
                  Dark Mode
                </label>
              </div>
            )}

            {activeTab === "Connections" && (
              <div>
                <h3 className="font-semibold mb-4">Connections</h3>
                <p className="text-sm text-gray-600">
                  Link or unlink your other social media accounts.
                </p>
                {/* Tambahkan tombol connect ke Twitter/Instagram dsb */}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* RIGHT MENU */}
      <div className="hidden lg:block w-[30%]">
        <RightMenu  />
      </div>
    </div>
  );
}