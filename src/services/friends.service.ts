import { createConnection } from "@/lib/db";
import type { User, Story, Suggestion, Friend, FeedPost } from "@/types/friends";

// GET USER
export const getUserById = async (id: number): Promise<User | null> => {
  const db = await createConnection();
  const [rows] = await db.query(
    `
    SELECT 
      id, username, name, surname, avatar_url, cover_url,
      posts_count, followers_count, followings_count,
      birthday
    FROM users
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  return rows[0] || null;
};

// GET STORIES (PERBAIKAN SANGAT PENTING)
export const getStories = async (): Promise<Story[]> => {
  const db = await createConnection();
  const [rows] = await db.query(`
    SELECT 
      s.id,
      s.user_id,
      s.media,
      s.created_at
    FROM stories s
    ORDER BY s.id DESC
  `);

  return rows as Story[];
};

// GET SUGGESTIONS
export const getSuggestions = async (): Promise<Suggestion[]> => {
  const db = await createConnection();
  const [rows] = await db.query(`
    SELECT id, name, username, avatar_url
    FROM suggestions
  `);

  return rows as Suggestion[];
};

// GET TOP FRIENDS
export const getTopFriends = async (): Promise<Friend[]> => {
  const db = await createConnection();
  const [rows] = await db.query(`
    SELECT id, name, username, avatar_url
    FROM friends
    ORDER BY id DESC
    LIMIT 3
  `);

  return rows as Friend[];
};

// GET FEED
export const getFeed = async (
  limit: number,
  offset: number
): Promise<FeedPost[]> => {
  const db = await createConnection();
  const [rows] = await db.query(
    `
    SELECT 
      f.id,
      f.user_id,
      f.text,
      f.avatar_url,
      f.created_at
    FROM feed_posts f
    ORDER BY f.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  return rows as FeedPost[];
};

// GET FRIEND LIST
export const getFriendsList = async (): Promise<Friend[]> => {
  const db = await createConnection();
  const [rows] = await db.query(`
    SELECT id, name, username, avatar_url
    FROM friends
    ORDER BY id ASC
  `);

  return rows as Friend[];
};
