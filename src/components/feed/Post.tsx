"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Comments from "./Comments";
import PostInteraction from "./PostInteraction";

interface PostData {
  id: number;
  user_name: string;
  user_avatar: string | null;
  image_url: string | null;
  description: string | null;
}

export default function Post() {
  const [posts, setPosts] = useState<PostData[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts?limit=10&page=1");
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("❌ Failed to load posts:", error);
      }
    };

    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return <p className="text-gray-500">Loading posts...</p>;
  }

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="flex flex-col gap-4">
          {/* USER */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image
                src={post.user_avatar || "/noAvatar.png"}
                width={40}
                height={40}
                alt={post.user_name}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-medium">{post.user_name || "Guest User"}</span>
            </div>
          </div>

          {/* DESC */}
          <div className="flex flex-col gap-4">
            <div className="w-full min-h-96 relative">
              <Image
                src={post.image_url || "/dummycover.png"}
                fill
                className="object-cover rounded-md"
                alt="Post image"
              />
            </div>

            <p>{post.description || "This is a sample post description."}</p>
          </div>

          <PostInteraction />
          <Comments />
        </div>
      ))}
    </>
  );
}
