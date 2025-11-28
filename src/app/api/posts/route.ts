import { NextResponse } from "next/server";
import { getPosts } from "@/services/post.service";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const limit = Number(url.searchParams.get("limit")) || 10;
    const page = Number(url.searchParams.get("page")) || 1;
    const search = url.searchParams.get("search") || "";
    const offset = (page - 1) * limit;

    const posts = await getPosts(limit, offset, search);

    return NextResponse.json(posts);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
