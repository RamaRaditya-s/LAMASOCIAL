"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Ad as AdType } from "@/types/ads";

interface AdProps {
  size: "sm" | "md" | "lg";
}

const Ad = ({ size }: AdProps) => {
  const [ad, setAd] = useState<AdType | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch("/api/ads?limit=20&page=1");
        const result = await res.json();
        const ads: AdType[] = result.data;

        const filtered = ads.filter((item) => item.size === size);
        setAd(filtered[0] || ads[0] || null);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAd();
  }, [size]);

  if (!ad) return <div className="p-4">Loading ad...</div>;

  const imageHeight =
    size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48";

  const textSize = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="more options" width={16} height={16} />
      </div>

      <div className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
        <div className={`relative w-full ${imageHeight}`}>
          <Image
            src={ad.image}
            alt="ad image"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center gap-4">
          <Image
            src={ad.logo}
            alt={`${ad.title} logo`}
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">{ad.title}</span>
        </div>

        <p className={textSize}>{ad.description}</p>

        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          {ad.button_text}
        </button>
      </div>
    </div>
  );
};

export default Ad;
