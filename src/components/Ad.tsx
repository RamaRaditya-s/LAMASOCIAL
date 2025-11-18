"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface AdProps {
  size: "sm" | "md" | "lg";
}

interface AdData {
  id: number;
  title: string;
  description: string;
  image: string;
  logo: string;
  button_text: string;
  size: "sm" | "md" | "lg";
}

const Ad = ({ size }: AdProps) => {
  const [ad, setAd] = useState<AdData | null>(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch("/api/ads");
        const data: AdData[] = await res.json();

        // pilih ads yang ukurannya sama
        const filtered = data.filter((item) => item.size === size);

        // jika tidak ada, ambil data pertama
        setAd(filtered[0] || data[0]);
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
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="more options" width={16} height={16} />
      </div>

      {/* BOTTOM */}
      <div className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}>
        {/* IMAGE */}
        <div className={`relative w-full ${imageHeight}`}>
          <Image
            src={ad.image}
            alt="Advertisement banner"
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* AD INFO */}
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

        {/* DESCRIPTION */}
        <p className={textSize}>{ad.description}</p>

        {/* BUTTON */}
        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          {ad.button_text}
        </button>
      </div>
    </div>
  );
};

export default Ad;
