"use client";

import Image from "next/image";
import { useState } from "react";

type StoryWithUser = {
  id: number;
  img?: string;
  createdAt: Date;
  expiresAt: Date;
  userId: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    cover: string;
    description: string;
    name: string;
    surname: string;
    city: string;
    work: string;
    school: string;
    website: string;
    createdAt: Date;
  };
};

const StoryList = ({
  stories,
  userId,
}: {
  stories: StoryWithUser[];
  userId: string;
}) => {
  const [storyList] = useState(stories);

  return (
    <>
      {/* Tombol Add Story dummy */}
      <div className="flex flex-col items-center gap-2 cursor-pointer relative">
        <Image
          src={"/noAvatar.png"}
          alt=""
          width={80}
          height={80}
          className="w-20 h-20 rounded-full ring-2 object-cover"
        />
        <span className="font-medium">Add a Story</span>
        <div className="absolute text-6xl text-gray-200 top-1">+</div>
      </div>

      {/* Daftar story */}
      {storyList.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
        >
          <Image
            src={story.user.avatar || "/noAvatar.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2"
          />
          <span className="font-medium">
            {story.user.name || story.user.username}
          </span>
        </div>
      ))}
    </>
  );
};

export default StoryList;
