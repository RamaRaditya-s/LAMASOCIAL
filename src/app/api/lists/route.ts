import { NextResponse } from "next/server";
import { getListsService } from "@/services/lists.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const lists = await getListsService(limit, offset);

    return NextResponse.json({
      page,
      limit,
      data: lists,
    });
  } catch (err) {
    console.error("Error GET /lists:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
