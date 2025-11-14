import { NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db.js";

export async function GET() {
  try {
    const db = await createConnection();

    const [rows] = await db.query(
      "SELECT * FROM videos ORDER BY id DESC"
    );

    return NextResponse.json(rows);
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
