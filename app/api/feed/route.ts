import { NextRequest, NextResponse } from "next/server";
import { getFeed } from "@/lib/engine";
import { getAuthenticatedUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest) {
  try {
    const currentUserId = await getAuthenticatedUserId();
    const profiles = await getFeed(currentUserId);

    return NextResponse.json(
      { profiles },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("GET /api/feed error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error?.message },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  }
}
