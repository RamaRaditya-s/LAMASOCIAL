"use client";

import Image from "next/image";
import { useState } from "react";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState<string | null>(null);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Image
        src={"/noAvatar.png"}
        alt="avatar"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Posting: ${desc}${img ? " with image" : ""}`);
            setDesc("");
            setImg(null);
          }}
          className="flex gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          {/* Emoji + Button */}
          <div className="flex flex-col justify-between items-center gap-2">
            <Image
              src="/emoji.png"
              alt="emoji"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-md text-xs"
            >
              Post
            </button>
          </div>
        </form>

        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setImg("/noAvatar.png")} // dummy image upload
          >
            <Image src="/addimage.png" alt="add image" width={20} height={20} />
            Photo
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addVideo.png" alt="add video" width={20} height={20} />
            Video
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="poll" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="event" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
