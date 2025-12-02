// src/services/user.service.ts
import { createConnection } from "@/lib/db";
import type { User } from "@/types/user";

export async function getUserByUsername(username: string): Promise<User | null> {
  const db = await createConnection();

  const [rows]: any = await db.execute(
    `
      SELECT 
        u.id,
        u.username,
        u.name,
        u.surname,
        u.avatar,
        u.cover,
        u.description,
        u.city,
        u.school,
        u.work,
        u.website,
        u.created_at,
        COUNT(f.following_id) AS followers
      FROM UserInformation u
      LEFT JOIN Followers f ON f.following_id = u.id
      WHERE u.username = ?
      GROUP BY u.id
      LIMIT 1
    `,
    [username]
  );

  await db.end();
  return rows.length > 0 ? rows[0] : null;
}

// pagination service
export async function getAllUsers(
  page: number = 1,
  limit: number = 10,
  sort: "latest" | "oldest" = "latest"
): Promise<User[]> {
  const db = await createConnection();

  const offset = (page - 1) * limit;
  const order = sort === "latest" ? "DESC" : "ASC";

  const [rows]: any = await db.execute(
    `
      SELECT 
        u.id,
        u.username,
        u.name,
        u.surname,
        u.avatar,
        u.cover,
        u.description,
        u.city,
        u.school,
        u.work,
        u.website,
        u.created_at,
        COUNT(f.following_id) AS followers
      FROM UserInformation u
      LEFT JOIN Followers f ON f.following_id = u.id
      GROUP BY u.id
      ORDER BY u.created_at ${order}
      LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  await db.end();
  return rows;
}
