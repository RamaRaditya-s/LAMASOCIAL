import { NextResponse } from "next/server";
import { getTodayBirthdays, getUpcomingBirthdays } from "@/services/birthday.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const today = await getTodayBirthdays();
    const upcoming = await getUpcomingBirthdays(limit, offset);

    return NextResponse.json({
      today,
      upcoming,
      pagination: {
        page,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("BIRTHDAYS API ERROR:", error);

    return NextResponse.json(
      { error: "Failed to load birthdays" },
      { status: 500 }
    );
  }
}
