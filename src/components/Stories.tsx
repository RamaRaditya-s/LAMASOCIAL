"use client";
import { getStories } from "@/services/storyService";
import { useEffect, useState } from "react";
import StoryList from "./StoryList";

// Definisikan tipe untuk Story dan User
type User = {
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

type Story = {
  id: number;
  img: string;
  createdAt: Date;
  expiresAt: Date;
  userId: string;
  user: User;
};

const Stories = () => {
  const currentUserId = "123";
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const fetchedStories = (await getStories()) as Story[];
        setStories(fetchedStories);
      } catch (error) {
        console.error("Failed to fetch stories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <StoryList stories={stories} userId={currentUserId} />
        )}
      </div>
    </div>
  );
};

export default Stories;
