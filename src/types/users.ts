export type User = {
  id: number;
  username: string;
  avatar_url: string;
  name: string;
  surname: string;
  birthday: string;      // DATE → string
  cover_url: string;
  posts_count: number;
  followers_count: number;
  followings_count: number;
};
