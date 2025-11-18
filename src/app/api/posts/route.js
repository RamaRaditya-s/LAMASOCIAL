    import { NextResponse } from "next/server";
    import { getPost } from "@/services/post.service";

export async function GET() {
    try {
        const posts = await getPost(10, 0);
        return NextResponse.json(posts);
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
