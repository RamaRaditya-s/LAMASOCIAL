import { createConnection } from "@/lib/db";
import type { List } from "@/types/lists";
import type { ListItem } from "@/types/listItems";

export async function getListsService(limit: number, offset: number) {
  const db = await createConnection();

  const [lists] = await db.query<List[]>(
    `
    SELECT *
    FROM lists
    ORDER BY updated_at DESC
    LIMIT ? OFFSET ?
  `,
    [limit, offset]
  );

  const result = [];

  for (const list of lists) {
    const [items] = await db.query<ListItem[]>(
      `SELECT * FROM list_items WHERE list_id = ? ORDER BY id DESC`,
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

  return result;
}

export async function getListByIdService(id: number) {
  const db = await createConnection();

  const [rows] = await db.query<List[]>(
    `SELECT * FROM lists WHERE id = ? LIMIT 1`,
    [id]
  );

  if (rows.length === 0) return null;

  const list = rows[0];

  const [items] = await db.query<ListItem[]>(
    `SELECT * FROM list_items WHERE list_id = ? ORDER BY id DESC`,
    [id]
  );

  return {
    id: list.id,
    name: list.name,
    cover: list.cover,
    privacy: list.privacy,
    updatedAt: list.updated_at,
    items,
  };
}
