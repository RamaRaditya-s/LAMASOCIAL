export type User = {
  id: number;
  username: string;
  avatar_url: string;
  name: string;
  surname: string;
  birthday: string;       // DATE → string
  cover_url: string;
  posts_count: number;
  followers_count: number;
  followings_count: number;
};

export type Story = {
  id: number;
  user_id: number;
  media: string;
  created_at: string; // atau Date jika kamu parse menjadi objek Date
};

export type Suggestion = {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
};

export type Friend = {
  id: number;
  name: string;
  username: string;
  avatar_url: string;
};

export type FeedPost = {
  id: number;
  user_id: number;
  text: string;
  avatar_url: string;
  created_at: string; // gunakan string karena format datetime dari MySQL
};

