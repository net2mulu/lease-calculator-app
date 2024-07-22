// pages/api/leases/create.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { z } from "zod";

export const leaseSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  monthlyRent: z.number().positive(),
  securityDeposit: z.number().positive(),
  additionalCharges: z.number().positive(),
  annualRentIncrease: z.number().positive(),
  leaseType: z.enum(["RESIDENTIAL", "COMMERCIAL"]),
  utilitiesIncluded: z.boolean(),
  maintenanceFees: z.number().positive(),
  latePaymentPenalty: z.number().positive(),
});

export type LeaseInput = z.infer<typeof leaseSchema>;

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leaseData = await request.json();
    const validatedLeaseData = await leaseSchema.parseAsync(leaseData);

    const createdLease = await db.lease.create({
      data: {
        ...validatedLeaseData,
        userId: session.user.id,
      },
    });

    return NextResponse.json(createdLease);
  } catch (error) {
    console.error("Error creating lease:", error);
    return NextResponse.json(
      { error: "Failed to create lease" },
      { status: 500 }
    );
  }
}
