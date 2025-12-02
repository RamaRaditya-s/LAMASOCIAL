// src/app/api/userMedia/route.ts
import { NextResponse } from "next/server";
import { getUserMedia } from "@/services/userMedia.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const userId = parseInt(searchParams.get("userId") || "1");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "5");

    const offset = (page - 1) * limit;

    const media = await getUserMedia(userId, limit, offset);

    return NextResponse.json({
      page,
      limit,
      count: media.length,
      data: media,
    });
  } catch (error) {
    console.error("❌ Error fetching user media:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
