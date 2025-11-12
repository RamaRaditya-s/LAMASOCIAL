import { createConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const db = await createConnection();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId") || 1; // default: user 1

    const [media] = await db.query(
      "SELECT * FROM user_media WHERE user_id = ? ORDER BY id DESC LIMIT 5",
      [userId]
    );

    return NextResponse.json(media);
  } catch (error) {
    console.error("❌ Error fetching user media:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
