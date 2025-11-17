import { createConnection } from "../../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();

    // USER ID
    const [userRows] = await db.query(`
      SELECT 
        id,
        username,
        name,
        surname,
        avatar_url,
        cover_url,
        posts_count,
        followers_count,
        followings_count
      FROM users
      WHERE id = 1
      LIMIT 1
    `);

    const user = userRows[0];

    // STORIES
    const [stories] = await db.query(`
      SELECT 
        s.id,
        s.media,
        CONCAT(u.name, ' ', u.surname) AS name,
        u.avatar_url AS avatar
      FROM stories s
      JOIN users u ON u.id = s.user_id
      ORDER BY s.id DESC
    `);

    // SUGGESTIONS
    const [suggestions] = await db.query(`
      SELECT id, name, username, avatar_url AS avatar
      FROM suggestions
    `);

    // TOP FRIENDS
    const [topFriends] = await db.query(`
      SELECT id, name, username, avatar_url AS avatar
      FROM friends
      ORDER BY id DESC
      LIMIT 3
    `);

    // FEED
    const [feed] = await db.query(`
      SELECT 
         f.id,
         CONCAT(u.name, ' ', u.surname) AS name,
         f.text,
         f.avatar_url AS avatar
      FROM feed_posts f
      JOIN users u ON u.id = f.user_id
      ORDER BY f.id DESC
    `);

    // FULL FRIENDS LIST
    const [friends] = await db.query(`
      SELECT id, name, username, avatar_url AS avatar
      FROM friends
      ORDER BY id ASC
    `);

    return NextResponse.json({
      user,
      stories,
      suggestions,
      topFriends,
      feed,
      friends,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
