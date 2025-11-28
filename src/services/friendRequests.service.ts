import { createConnection } from "@/lib/db";
import { FriendRequest } from "@/types/friendRequests";

export async function getFriendRequests(limit: number = 10, page: number = 1): Promise<FriendRequest[]> {
  const db = await createConnection();

  const offset = (page - 1) * limit;

  const [rows] = await db.query(
    `
      SELECT 
        id,
        sender_id,
        sender_username,
        sender_name,
        sender_surname,
        sender_avatar
      FROM friendrequests
      ORDER BY id DESC
      LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  return rows as FriendRequest[];
}
