import { createConnection } from "../../../../lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await createConnection();

    const todayQuery = `
      SELECT id, name, surname, avatar_url, birthday
      FROM users
      WHERE DATE_FORMAT(birthday, '%m-%d') = DATE_FORMAT(NOW(), '%m-%d')
    `;
    const [today] = await db.query(todayQuery);

    const upcomingQuery = `
      SELECT id, name, surname, avatar_url, birthday
      FROM users
      WHERE DATE_FORMAT(birthday, '%m-%d') > DATE_FORMAT(NOW(), '%m-%d')
      ORDER BY DATE_FORMAT(birthday, '%m-%d')
      LIMIT 10
    `;
    const [upcoming] = await db.query(upcomingQuery);

    return NextResponse.json({
      today,
      upcoming,
    });

  } catch (error) {
    console.error("BIRTHDAYS API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to load birthdays" },
      { status: 500 }
    );
  }
}