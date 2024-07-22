"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import { z } from "zod";

const leaseSchema = z.object({
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

export async function SaveLease(data: LeaseInput) {
  const session = await getServerSession(authOptions);
  const lease = leaseSchema.safeParse(data);

  if (!lease.success) {
    return NextResponse.json({ error: "Invalid lease data" }, { status: 400 });
  }

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const createdLease = await db.lease.create({
      data: {
        ...lease.data,
        userId: session.user.id,
      },
    });

    return createdLease;
  } catch (error) {
    return error;
  }
}
