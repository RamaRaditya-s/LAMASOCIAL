import { NextResponse } from "next/server";
import { getListByIdService } from "@/services/lists.service";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    const list = await getListByIdService(id);

    if (!list) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(list);
  } catch (err) {
    console.error("Error GET /lists/:id", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
