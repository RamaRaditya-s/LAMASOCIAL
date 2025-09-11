import { Story } from "@/types/story";

// dummy data
const stories: Story[] = [
  {
    id: 1,
    img: "/dummycover.png",
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    userId: "123",
    user: {
      id: "123",
      username: "demo_user1",
      avatar: "/dummycover.png",
      cover: "/dummycover.png",
      description: "",
      name: "Demo",
      surname: "User1",
      city: "Jakarta",
      work: "",
      school: "",
      website: "",
      createdAt: new Date(),
    },
  },
  {
    id: 2,
    img: "/dummycover.png",
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    userId: "456",
    user: {
      id: "456",
      username: "demo_user2",
      avatar: "/dummycover.png",
      cover: "/dummycover.png",
      description: "",
      name: "Demo",
      surname: "User2",
      city: "Bandung",
      work: "",
      school: "",
      website: "",
      createdAt: new Date(),
    },
  },
  {
    id: 3,
    img: "/dummycover.png",
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    userId: "789",
    user: {
      id: "789",
      username: "demo_user3",
      avatar: "/dummycover.png",
      cover: "/dummycover.png",
      description: "",
      name: "Demo",
      surname: "User3",
      city: "Surabaya",
      work: "",
      school: "",
      website: "",
      createdAt: new Date(),
    },
  },
];

export const getStories = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stories);
    }, 1000);
  });
};

