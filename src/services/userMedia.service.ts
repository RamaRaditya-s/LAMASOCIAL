// src/services/userMedia.service.ts
import { createConnection } from "@/lib/db";
import { UserMedia } from "@/types/userMedia";

export const getUserMedia = async (
  userId: number,
  limit: number,
  offset: number
): Promise<UserMedia[]> => {
  const db = await createConnection();

  const sql = `
    SELECT 
      id,
      user_id,
      image_url,
      created_at
    FROM user_media
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.query(sql, [userId, limit, offset]);
  return rows as UserMedia[];
};
