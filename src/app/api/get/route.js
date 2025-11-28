import { createConnection } from "@/lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db = await createConnection();

        // Ambil user id
        const [users] = await db.query(
            `SELECT 
                id, username, name, surname, avatar_url, cover_url,
                followers_count, followings_count 
            FROM users 
            WHERE id = 1`
        );

        const user = users[0];

        const [stories] = await db.query(
            `SELECT 
                s.id,
                s.media,
                u.username AS user,
                u.avatar_url AS avatar
            FROM stories s
            JOIN users u ON u.id = s.user_id
            ORDER BY s.id DESC`
        );

        return NextResponse.json({
            user: {
                username: user.username,
                name: `${user.name} ${user.surname}`,
                cover: user.cover_url,
                avatar: user.avatar_url,
                _count: {
                    followers: user.followers_count,
                    followings: user.followings_count,
                },
            },
            stories: stories.map((s) => ({
                id: s.id,
                user: s.user,
                avatar: s.avatar,
                media: s.media,
            })),
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
