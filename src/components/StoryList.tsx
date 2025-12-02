"use client";

import { Story } from "@/types/story";
import Image from "next/image";

const StoryList = ({
  stories,
  userId,
}: {
  stories: Story[];
  userId: string;
}) => {
  return (
    <>
      {/* Add Story */}
      <div className="flex flex-col items-center gap-2 cursor-pointer relative">
        <Image
          src={"/user.png"}
          alt=""
          width={80}
          height={80}
          className="w-20 h-20 rounded-full ring-2 object-cover"
        />
        <span className="font-medium">Add a Story</span>
        <div className="absolute text-6xl text-gray-200 top-1">+</div>
      </div>

      {/* Story Items */}
      {stories.map((story) => (
        <div
          className="flex flex-col items-center gap-2 cursor-pointer"
          key={story.id}
        >
          <Image
            src={story.user.avatar || "/user.png"}
            alt=""
            width={80}
            height={80}
            className="w-20 h-20 rounded-full ring-2 object-cover"
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
