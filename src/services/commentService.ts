import { CommentType } from "@/components/feed/CommentList";
import { Comment } from "@/types/comment";

let dummyComments: CommentType[] = [
  {
    id: 1,
    desc: "Great post!",
    user: { id: "1", username: "Alice", avatar: "/noAvatar.png" },
  },
  {
    id: 2,
    desc: "Amazing!",
    user: { id: "2", username: "Bob", avatar: "/noAvatar.png" },
  },
];

// Simulate API call
export const getComments = async (): Promise<CommentType[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyComments);
    }, 2000);
  });
};

export const addComment = async (desc: string): Promise<CommentType> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComment = {
        id: dummyComments.length + 1,
        desc,
        user: { id: "3", username: "Charlie", avatar: "/noAvatar.png" }, // Assuming a logged in user
      };
      dummyComments.push(newComment);
      resolve(newComment);
    }, 2000);
  });
};

export const updateComment = async (id: number, desc: string): Promise<CommentType | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const comment = dummyComments.find((c) => c.id === id);
      if (comment) {
        comment.desc = desc;
      }
      resolve(comment);
    }, 2000);
  });
};

export const deleteComment = async (id: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      dummyComments = dummyComments.filter((c) => c.id !== id);
      resolve({ success: true });
    }, 2000);
  });
};
