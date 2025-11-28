// src/app/api/videos/route.ts
import { NextResponse } from "next/server";
import { getVideosService } from "@/services/videos.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const sort = (searchParams.get("sort") || "created_at") as
      | "created_at"
      | "title"
      | "views";
    const order = (searchParams.get("order") || "DESC") as "ASC" | "DESC";

    const result = await getVideosService({
      page,
      limit,
      sort,
      order,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Video GET error:", err);
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
