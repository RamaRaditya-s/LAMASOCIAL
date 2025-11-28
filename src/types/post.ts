export type Post = {
  id: number;
  user_name: string;
  user_avatar: string;
  image_url: string | null;
  description: string | null;
  created_at: Date;
};

export type CreatePostDTO = {
  user_name: string;
  user_avatar: string;
  image_url?: string | null;
  description?: string | null;
};
