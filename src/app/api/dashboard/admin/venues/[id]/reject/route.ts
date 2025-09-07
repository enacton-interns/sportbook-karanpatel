// src/app/api/dashboard/admin/venues/[id]/reject/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const venueId = parseInt(params.id, 10);

    const venue = await prisma.venue.update({
      where: { id: venueId },
      data: { approved: false }, // explicitly reject
    });

    return NextResponse.json({ message: "Venue rejected", venue });
  } catch (error) {
    console.error("Venue Reject Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
