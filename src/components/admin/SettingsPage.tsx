"use client";

import React, { useState, useEffect } from "react";
import SettingsSkeleton from "@/components/skeleton/SettingsSkeleton";

type FormData = {
  name: string;
  email: string;
  theme: string;
  twoFactorAuth: boolean;
};

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    name: "Rama Raditya",
    email: "admin@smartscript.ai",
    theme: "light",
    twoFactorAuth: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    if (target instanceof HTMLInputElement) {
      const { name, type, value, checked } = target;
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
      return;
    }
    const { name, value } = target as HTMLSelectElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <SettingsSkeleton />;

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">
          Account Information
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fec107]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fec107]"
            />
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">Preferences</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Theme</label>
            <select
              name="theme"
              value={formData.theme}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#fec107]"
            >
              <option value="light">☀️ Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">💻 System Default</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Enable 2FA</label>
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
              className="h-5 w-5 accent-[#fec107]"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => console.log("Saving settings:", formData)}
          className="bg-[#fec107] hover:bg-[#e6b006] text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
