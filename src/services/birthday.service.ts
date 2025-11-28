import { createConnection } from "@/lib/db";
import type { User } from "@/types/users";

export const getTodayBirthdays = async (): Promise<User[]> => {
  const db = await createConnection();

  const query = `
    SELECT id, name, surname, avatar_url, birthday
    FROM users
    WHERE DATE_FORMAT(birthday, '%m-%d') = DATE_FORMAT(NOW(), '%m-%d')
  `;

  const [rows] = await db.query(query);
  return rows as User[];
};

export const getUpcomingBirthdays = async (
  limit: number,
  offset: number
): Promise<User[]> => {
  const db = await createConnection();

  const query = `
    SELECT id, name, surname, avatar_url, birthday
    FROM users
    WHERE DATE_FORMAT(birthday, '%m-%d') > DATE_FORMAT(NOW(), '%m-%d')
    ORDER BY DATE_FORMAT(birthday, '%m-%d')
    LIMIT ? OFFSET ?
  `;

  const [rows] = await db.query(query, [limit, offset]);
  return rows as User[];
};
