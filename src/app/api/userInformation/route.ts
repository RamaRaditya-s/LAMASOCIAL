import { NextResponse } from "next/server";
import { getUserByUsername } from "@/services/userInformation.service";

export async function GET(req: Request, context: any) {
  const username = context.params.username;

  const user = await getUserByUsername(username);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}
