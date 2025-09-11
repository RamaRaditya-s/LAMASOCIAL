"use client";

import Image from "next/image";
import { useState } from "react";

type User = {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  avatar?: string;
};

type CommentType = {
  id: number;
  desc: string;
  user: User;
};

const CommentList = ({ comments }: { comments: CommentType[] }) => {
  const [desc, setDesc] = useState("");
  const [commentState, setCommentState] = useState(comments);

  const add = () => {
    if (!desc) return;
    const newComment: CommentType = {
      id: Math.random(),
      desc,
      user: {
        id: "guest",
        username: "Guest",
        avatar: "/noAvatar.png",
      },
    };
    setCommentState([newComment, ...commentState]);
    setDesc("");
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Image
          src="/noAvatar.png"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            add();
          }}
          className="flex-1 flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
        >
          <input
            type="text"
            placeholder="Write a comment..."
            className="bg-transparent outline-none flex-1"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Image
            src="/emoji.png"
            alt=""
            width={16}
            height={16}
            className="cursor-pointer"
          />
        </form>
      </div>

      <div>
        {commentState.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? `${comment.user.name} ${comment.user.surname}`
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="flex items-center gap-4">
                  <Image
                    src="/like.png"
                    alt=""
                    width={12}
                    height={12}
                    className="cursor-pointer w-4 h-4"
                  />
                  <span className="text-gray-300">|</span>
                  <span className="text-gray-500">0 Likes</span>
                </div>
                <div>Reply</div>
              </div>
            </div>
            <Image
              src="/more.png"
              alt=""
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
