import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { recordSwipe } from "@/lib/engine";
import { getAuthenticatedUserId } from "@/lib/auth";

export const dynamic = "force-dynamic";

const swipeSchema = z.object({
  targetId: z.string().min(1),
  direction: z.enum(["like", "pass"]),
});

export async function POST(request: NextRequest) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Malformed JSON payload" },
      {
        status: 400,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }

  const parseResult = swipeSchema.safeParse(body);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: "Invalid request payload. Required: targetId (string), direction ('like' | 'pass')" },
      {
        status: 400,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }

  const currentUserId = await getAuthenticatedUserId();
  const { targetId, direction } = parseResult.data;

  if (targetId === currentUserId) {
    return NextResponse.json(
      { error: "Self-swipe is not allowed" },
      {
        status: 400,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }

  try {
    const result = await recordSwipe(currentUserId, targetId, direction);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error: any) {
    if (error.message === "Profile already swiped") {
      return NextResponse.json(
        { error: "Profile already swiped" },
        {
          status: 409,
          headers: { "Cache-Control": "no-store, max-age=0" },
        }
      );
    }

    if (error.message === "Target profile not found") {
      return NextResponse.json(
        { error: "Profile not found" },
        {
          status: 404,
          headers: { "Cache-Control": "no-store, max-age=0" },
        }
      );
    }

    if (error.message === "Self-swipe is not allowed") {
      return NextResponse.json(
        { error: "Self-swipe is not allowed" },
        {
          status: 400,
          headers: { "Cache-Control": "no-store, max-age=0" },
        }
      );
    }

    console.error("POST /api/swipe error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      {
        status: 500,
        headers: { "Cache-Control": "no-store, max-age=0" },
      }
    );
  }
}
