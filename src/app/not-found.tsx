"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ApiStatusPage() {
  
  const [status, setStatus] = useState<
    "loading" | "largeData" | "longText" | "shortText" | "error"
  >("loading");

  useEffect(() => {
    const timer = setTimeout(() => setStatus("error"), 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (status) {
      case "loading":
        return {
          title: "Processing Request",
          desc: "API is still working on your request. This may take a while...",
          icon: "/not-found-icon.png",
        };
      case "largeData":
        return {
          title: "Huge Data Received",
          desc: "API returned a very large dataset (thousands of items).",
          icon: "/not-found-icon.png",
        };
      case "longText":
        return {
          title: "Long Text Item",
          desc: "One of the items contains very long text (≈1000 chars).",
          icon: "/not-found-icon.png",
        };
      case "shortText":
        return {
          title: "Short Text Item",
          desc: "API returned items with extremely short text (1 char).",
          icon: "/not-found-icon.png",
        };
      case "error":
        return {
          title: "API Error",
          desc: "The server responded with an error or invalid data.",
          icon: "/not-found-icon.png",
        };
    }
  };

  const { title, desc, icon } = renderContent();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md text-center p-8">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">
          <Image
            src={icon}
            alt="Status icon"
            width={40}
            height={40}
          />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {title}
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8 break-words">
          {desc}
        </p>

        {/* Single "Go Back" button */}
        <button
          onClick={() => window.history.back()}
          className="w-full rounded-lg bg-blue-500 px-6 py-3
                     text-white font-medium hover:bg-blue-600
                     transition-colors duration-300"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}
