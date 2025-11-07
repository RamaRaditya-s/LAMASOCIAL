import { createConnection } from "../../../../lib/db.js";

import { NextResponse } from "next/server";

export async function GET() {
    try {
        const db =  await createConnection();
        const sql = 'SELECT * FROM posts';
        const [posts] = await db.query(sql);
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}