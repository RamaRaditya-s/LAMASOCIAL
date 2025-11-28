"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserMedia } from "@/types/userMedia";

const UserMediaCard = ({ user }: { user: any }) => {
  const [media, setMedia] = useState<UserMedia[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await fetch(
          `/api/userMedia?userId=${user?.id || 1}&limit=5&page=1`,
          { cache: "no-store" }
        );

        const result = await res.json();
        setMedia(result.data);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedia();
  }, [user]);

  if (loading) return <p className="text-gray-400 text-center">Loading...</p>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Media</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* Content */}
      <div className="flex gap-4 justify-between flex-wrap">
        {media.length ? (
          media.map((post) => (
            <div key={post.id} className="relative w-1/5 h-24">
              <Image
                src={post.image_url}
                alt=""
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center w-full">No media found!</p>
        )}
      </div>
    </div>
  );
};

export default UserMediaCard;
