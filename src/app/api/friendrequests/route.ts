import { NextResponse } from "next/server";
import { getFriendRequests } from "@/services/friendRequests.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = Number(searchParams.get("limit")) || 10;
    const page = Number(searchParams.get("page")) || 1;

    const requests = await getFriendRequests(limit, page);

    return NextResponse.json({
      success: true,
      data: requests,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Failed to load friend requests" },
      { status: 500 }
    );
  }
}
