import { NextResponse } from "next/server";
import { getAds } from "@/services/ad.service";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "10");
    const page = parseInt(searchParams.get("page") || "1");
    const offset = (page - 1) * limit;

    const ads = await getAds(limit, offset);

    return NextResponse.json({
      page,
      limit,
      count: ads.length,
      data: ads,
    });
  } catch (error) {
    console.error("ADS API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch ads" },
      { status: 500 }
    );
  }
}
