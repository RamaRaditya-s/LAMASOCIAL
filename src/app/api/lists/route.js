import { createConnection } from "../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();

    const [lists] = await db.query("SELECT * FROM lists ORDER BY updated_at DESC");

    const result = [];
    for (const list of lists) {
      const [items] = await db.query(
        "SELECT * FROM list_items WHERE list_id = ?",
        [list.id]
      );

      result.push({
        id: list.id,
        name: list.name,
        cover: list.cover,
        privacy: list.privacy,
        updatedAt: list.updated_at,
        items,
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching lists:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
