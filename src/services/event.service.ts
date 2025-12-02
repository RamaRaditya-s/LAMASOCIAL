import { createConnection } from "@/lib/db";
import { Event } from "@/types/event";

export async function getEvents(
  limit: number,
  offset: number
): Promise<Event[]> {
  const db = await createConnection();

  const sql = `
    SELECT 
      id,
      title,
      date,
      location,
      cover,
      category,
      description,
      attendees
    FROM events
    ORDER BY date DESC
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.query(sql, [limit, offset]);

  return rows as Event[];
}
