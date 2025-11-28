"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FriendRequest } from "@/types/friendRequests";

const FriendRequests = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const res = await fetch("/api/friendrequests?limit=10&page=1");
        const data = await res.json();
        if (data.success) setRequests(data.data);
      } catch (err) {
        console.error("Failed to load friend requests", err);
      } finally {
        setLoading(false);
      }
    };

    loadRequests();
  }, []);

  if (loading) return null;
  if (requests.length === 0) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">Friend Requests</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>
<div>
  {requests.map((req) => (
    <div
      className="flex items-center justify-between py-1"
      key={req.id}
    >
      <div className="flex items-center gap-3">
        <Image
          src={req.sender_avatar}
          alt=""
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-semibold">
          {req.sender_name + " " + req.sender_surname}
        </span>
      </div>

      <div className="flex gap-2 justify-end">
        <button>
          <Image src="/accept.png" alt="" width={20} height={20} />
        </button>
        <button>
          <Image src="/reject.png" alt="" width={20} height={20} />
        </button>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default FriendRequests;
