import { createConnection } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const [ads] = await db.query("SELECT * FROM ads ORDER BY id DESC");
    return NextResponse.json(ads);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch ads" }, { status: 500 });
  }
}
