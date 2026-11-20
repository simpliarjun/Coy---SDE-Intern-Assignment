import { NextRequest, NextResponse } from "next/server";
import { getMatches } from "@/lib/engine";
import { getAuthenticatedUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  try {
    const currentUserId = await getAuthenticatedUserId();
    const matches = await getMatches(currentUserId);

    return NextResponse.json(
      { matches },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/matches error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
