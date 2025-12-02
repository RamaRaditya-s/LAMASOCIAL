"use client";

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

  // === STORY HARD-CODE 4 ITEM ===
  const stories: Story[] = [
    {
      id: 1,
      img: "/story1.jpg",
      createdAt: new Date(),
      expiresAt: new Date(),
      userId: "1",
      user: {
        id: "1",
        username: "john",
        avatar: "/story1.jpg",
        cover: "",
        description: "",
        name: "John",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(),
      },
    },
    {
      id: 2,
      img: "/story2.jpg",
      createdAt: new Date(),
      expiresAt: new Date(),
      userId: "2",
      user: {
        id: "2",
        username: "maria",
        avatar: "/story2.jpg",
        cover: "",
        description: "",
        name: "Maria",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(),
      },
    },
    {
      id: 3,
      img: "/story3.jpg",
      createdAt: new Date(),
      expiresAt: new Date(),
      userId: "3",
      user: {
        id: "3",
        username: "alex",
        avatar: "/story3.jpg",
        cover: "",
        description: "",
        name: "Alex",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(),
      },
    },
    {
      id: 4,
      img: "/story4.jpg",
      createdAt: new Date(),
      expiresAt: new Date(),
      userId: "4",
      user: {
        id: "4",
        username: "sarah",
        avatar: "/story4.jpg",
        cover: "",
        description: "",
        name: "Sarah",
        surname: "",
        city: "",
        work: "",
        school: "",
        website: "",
        createdAt: new Date(),
      },
    },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md overflow-scroll text-xs scrollbar-hide">
      <div className="flex gap-8 w-max">
        <StoryList stories={stories} userId={currentUserId} />
      </div>
    </div>
  );
};

export default Stories;
