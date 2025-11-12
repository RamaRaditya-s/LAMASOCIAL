import { createConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();
    const [events] = await db.query("SELECT * FROM events ORDER BY date DESC");
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
