import { NextRequest, NextResponse } from "next/server";
import { resetDatabase } from "@/lib/engine";
import { getAuthenticatedUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(_request: NextRequest) {
  try {
    const currentUserId = await getAuthenticatedUserId();
    await resetDatabase(currentUserId);

    return NextResponse.json(
      { success: true, message: "Database reset to initial demo state" },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error: any) {
    console.error("POST /api/reset error:", error);
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
