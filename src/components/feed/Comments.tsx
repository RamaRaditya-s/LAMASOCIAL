"use client";
import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import { getComments } from "@/services/commentService";
import { Comment } from "@/types/comment";

const Comments = () => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments: Comment[] = await getComments();
      setComments(fetchedComments);
    };
    fetchComments();
  }, []);

  return (
    <div>
      <CommentList comments={comments} />
    </div>
  );
};

export default Comments;
