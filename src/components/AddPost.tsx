"use client";

import Image from "next/image";
import { useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { CldUploadWidget } from "next-cloudinary";

const AddPost = () => {
  const [desc, setDesc] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [img, setImg] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);

  // dummy user (karena tidak ambil dari Clerk)
  const user = {
    imageUrl: "/noAvatar.png",
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setDesc((prev) => prev + emojiData.emoji);
    setShowEmoji(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      `Post terkirim (dummy):\nText: ${desc}\nImage: ${
        img?.secure_url || "-"
      }\nVideo: ${video?.secure_url || "-"}`
    );

    // reset state
    setDesc("");
    setImg(null);
    setVideo(null);
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm relative">
      {/* AVATAR */}
      <Image
        src={user.imageUrl}
        alt="avatar"
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />

      {/* POST */}
      <div className="flex-1">
        {/* TEXT INPUT */}
        <form onSubmit={handleSubmit} className="flex gap-4">
          <textarea
            placeholder="What's on your mind?"
            className="flex-1 bg-slate-100 rounded-lg p-2"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
          <div className="flex flex-col items-center justify-between">
            {/* EMOJI BUTTON */}
            <Image
              src="/emoji.png"
              alt="emoji"
              width={20}
              height={20}
              className="w-5 h-5 cursor-pointer"
              onClick={() => setShowEmoji((prev) => !prev)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-3 py-1 text-xs rounded-md mt-2"
            >
              Post
            </button>
          </div>
        </form>

        {/* EMOJI PICKER */}
        {showEmoji && (
          <div className="absolute top-full left-0 mt-2 z-20">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}

        {/* PREVIEW UPLOADED FILES */}
        <div className="mt-2 flex gap-2 flex-wrap">
          {img && (
            <Image
              src={img.secure_url}
              alt="uploaded"
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
          )}
          {video && (
            <video
              src={video.secure_url}
              controls
              className="w-40 rounded-md"
            ></video>
          )}
        </div>

        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          {/* UPLOAD IMAGE */}
          <CldUploadWidget
            uploadPreset="social"
            onSuccess={(result, { widget }) => {
              setImg(result.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/addimage.png" alt="" width={20} height={20} />
                Photo
              </div>
            )}
          </CldUploadWidget>

          {/* UPLOAD VIDEO */}
          <CldUploadWidget
            uploadPreset="social"
            options={{ resourceType: "video" }}
            onSuccess={(result, { widget }) => {
              setVideo(result.info);
              widget.close();
            }}
          >
            {({ open }) => (
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => open()}
              >
                <Image src="/addVideo.png" alt="" width={20} height={20} />
                Video
              </div>
            )}
          </CldUploadWidget>

          {/* POLL & EVENT (dummy) */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/poll.png" alt="" width={20} height={20} />
            Poll
          </div>
          <div className="flex items-center gap-2 cursor-pointer">
            <Image src="/addevent.png" alt="" width={20} height={20} />
            Event
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
