import { createConnection } from "../../../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const db = await createConnection();
    const { id } = params;

    const [lists] = await db.query("SELECT * FROM lists WHERE id = ?", [id]);
    if (lists.length === 0) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    const list = lists[0];
    const [items] = await db.query("SELECT * FROM list_items WHERE list_id = ?", [id]);

    const result = {
      id: list.id,
      name: list.name,
      cover: list.cover,
      privacy: list.privacy,
      updatedAt: list.updated_at,
      items,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching list:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
