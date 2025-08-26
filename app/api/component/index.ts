import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code } = req.body;

  if (!code || typeof code !== "string") {
    return res.status(400).json({ error: "Invalid code provided" });
  }

  try {
    const component = await prisma.component.create({
      data: { code },
      select: { id: true },
    });

    res.status(201).json({ id: component.id });
  } catch (error) {
    console.error("Error saving component:", error);
    res.status(500).json({ error: "Failed to save component" });
  }
}
