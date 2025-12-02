"use client";

import Image from "next/image";
import { useState } from "react";

export default function PostInteraction() {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked((p) => !p);
    setLikeCount((c) => (isLiked ? c - 1 : c + 1));
  };

  return (
    <div className="flex items-center justify-between text-sm my-4">
      <div className="flex gap-8">
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <button onClick={toggleLike}>
            <Image
              src={isLiked ? "/liked.png" : "/like.png"}
              width={16}
              height={16}
              alt=""
              className="cursor-pointer"
            />
          </button>
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">{likeCount} Likes</span>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/comment.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">0 Comments</span>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image
            src="/share.png"
            width={16}
            height={16}
            alt=""
            className="cursor-pointer"
          />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">Share</span>
        </div>
      </div>
    </div>
  );
}
