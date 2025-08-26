import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Invalid code provided" },
        { status: 400 }
      );
    }

    const component = await prisma.component.create({
      data: { code },
      select: { id: true },
    });

    return NextResponse.json({ id: component.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving component:", error);
    return NextResponse.json(
      { error: "Failed to save component" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "Component API endpoint" });
}
