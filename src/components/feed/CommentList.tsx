"use client";

import Image from "next/image";
import { useState } from "react";
import {
  addComment,
  deleteComment,
  updateComment,
} from "@/services/commentService";

type User = {
  id: string;
  username: string;
  name?: string;
  surname?: string;
  avatar?: string;
};

export type CommentType = {
  id: number;
  desc: string;
  user: User;
};

const CommentList = ({ comments }: { comments: CommentType[] }) => {
  const [desc, setDesc] = useState("");
  const [commentState, setCommentState] = useState<CommentType[]>(comments);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingDesc, setEditingDesc] = useState("");

  const handleAddComment = async () => {
    if (!desc) return;
    const newComment = await addComment(desc);
    setCommentState([newComment, ...commentState]);
    setDesc("");
  };

  const handleUpdateComment = async (id: number) => {
    if (!editingDesc) return;
    const updatedComment = await updateComment(id, editingDesc);
    if (updatedComment) {
      setCommentState(
        commentState.map((c) => (c.id === id ? updatedComment : c))
      );
    }
    setEditingCommentId(null);
    setEditingDesc("");
  };

  const handleDeleteComment = async (id: number) => {
    await deleteComment(id);
    setCommentState(commentState.filter((c) => c.id !== id));
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
            handleAddComment();
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
              {editingCommentId === comment.id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    className="bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
                    value={editingDesc}
                    onChange={(e) => setEditingDesc(e.target.value)}
                  />
                  <div className="flex gap-2">
                    <button
                      className="text-xs text-green-500"
                      onClick={() => handleUpdateComment(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="text-xs text-red-500"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p>{comment.desc}</p>
              )}
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
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setEditingCommentId(comment.id);
                    setEditingDesc(comment.desc);
                  }}
                >
                  Edit
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </div>
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
