
import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { username } = params;

  try {
    const db = await createConnection();
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = rows[0];
    const formattedUser = {
      username: user.username,
      name: user.name,
      surname: user.surname,
      cover: user.cover_url,
      avatar: user.avatar_url,
      _count: {
        posts: user.posts_count,
        followers: user.followers_count,
        followings: user.followings_count,
      },
    };

    return NextResponse.json(formattedUser);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
