import Image from "next/image";

export default async function Ad({ size }: { size: "sm" | "md" | "lg" }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const res = await fetch(`${baseUrl}/api/ads`, { cache: "no-store" });
  const ads = await res.json();

  // Ambil 1 iklan pertama saja
  const ad = ads[0];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm ">
      {/* TOP */}
      <div className="flex items-center justify-between text-gray-500 font-medium">
        <span>Sponsored Ads</span>
        <Image src="/more.png" alt="" width={16} height={16} />
      </div>

      {/* BOTTOM */}
      <div
        className={`flex flex-col mt-4 ${size === "sm" ? "gap-2" : "gap-4"}`}
      >
        <div
          className={`relative w-full ${
            size === "sm" ? "h-24" : size === "md" ? "h-36" : "h-48"
          }`}
        >
          <Image
            src={ad.image_url}
            alt={ad.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="flex items-center gap-4">
          <Image
            src={ad.avatar_url}
            alt={ad.advertiser_name}
            width={24}
            height={24}
            className="rounded-full w-6 h-6 object-cover"
          />
          <span className="text-blue-500 font-medium">{ad.advertiser_name}</span>
        </div>

        <p className={size === "sm" ? "text-xs" : "text-sm"}>
          {ad.description}
        </p>

        <button className="bg-gray-200 text-gray-500 p-2 text-xs rounded-lg">
          Learn more
        </button>
      </div>
    </div>
  );
}
