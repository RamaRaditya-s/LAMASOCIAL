import { NextResponse } from "next/server";
import { getEvents } from "@/services/event.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const events = await getEvents(limit, offset);

    return NextResponse.json({
      page,
      limit,
      count: events.length,
      data: events,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
