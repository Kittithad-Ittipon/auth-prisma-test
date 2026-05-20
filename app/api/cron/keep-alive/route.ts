import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 401 },
    );
  }
  try {
    await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        isActive: true,
        provider: true,
      },
      orderBy: { id: "asc" },
    });
    return NextResponse.json({
      success: true,
      message: "Database connection is healthy",
    });
  } catch (error) {
    console.error("Keep-alive failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to database",
      },
      { status: 500 },
    );
  }
}
