import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; 

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const component = await prisma.component.findUnique({
      where: { id },
    });

    if (!component) {
      return NextResponse.json(
        { error: "Component not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ code: component.code }, { status: 200 });
  } catch (error) {
    console.error("Error fetching component:", error);
    return NextResponse.json(
      { error: "Failed to fetch component" },
      { status: 500 }
    );
  }
}
