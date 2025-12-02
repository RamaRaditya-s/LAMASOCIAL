// src/types/user.ts
export type User = {
  id: number;
  username: string;
  name: string | null;
  surname: string | null;
  avatar: string | null;
  cover: string | null;
  description: string | null;
  city: string | null;
  school: string | null;
  work: string | null;
  website: string | null;
  created_at: string;
  followers: number;
};
