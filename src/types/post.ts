export type Post = {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreatePostDTO = {
  userId: string;
  title: string;
  content: string;
};