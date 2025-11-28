import { NextResponse } from "next/server";

import {
  getUserById,
  getStories,
  getSuggestions,
  getTopFriends,
  getFeed,
  getFriendsList
} from "@/services/friends.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;
    const offset = (page - 1) * limit;

    const user = await getUserById(1);
    const stories = await getStories();
    const suggestions = await getSuggestions();
    const topFriends = await getTopFriends();
    const feed = await getFeed(limit, offset);
    const friends = await getFriendsList();

    return NextResponse.json({
      user,
      stories,
      suggestions,
      topFriends,
      feed,
      friends,
      pagination: { limit, page, offset }
    });

  } catch (error) {
    console.error("Friends API Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
