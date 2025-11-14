import { NextResponse } from "next/server";
import { createConnection } from "../../../../lib/db.js";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const db = await createConnection();

    const [rows] = await db.query("SELECT * FROM videos WHERE id = ?", [id]);

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Video not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error("Database Error:", err);
    return NextResponse.json(
      { error: "Database error" },
      { status: 500 }
    );
  }
}
