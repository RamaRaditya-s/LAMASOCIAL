import { createConnection } from "@/lib/db";
import type { Ad } from "@/types/ads";

export const getAds = async (
  limit: number,
  offset: number
): Promise<Ad[]> => {
  const db = await createConnection();

  const sql = `
    SELECT 
      id,
      title,
      description,
      image,
      logo,
      button_text,
      size
    FROM ads
    ORDER BY id DESC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.query(sql, [limit, offset]);
  return rows as Ad[];
};
