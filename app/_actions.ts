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

export async function GetLeases() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leases = await db.lease.findMany({
    include: {
      user: true,
    },
  });

  return leases;
}

export async function GetMyLeases() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const leases = await db.lease.findMany({
    where: {
      userId: session.user.id,
    },

    include: {
      user: true,
    },
  });

  return leases;
}

export async function GetLeaseById(id: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const lease = await db.lease.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return lease;
  } catch (error) {
    throw new Error("Failed to fetch lease data");
  }
}

export async function DeleteLease(id: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const lease = await db.lease.findUnique({
    where: {
      id,
    },
  });

  if (!lease) {
    return "lease not found";
  }

  if (lease.userId !== session.user.id) {
    return "unauthorized";
  }

  await db.lease.delete({
    where: {
      id,
    },
  });

  return { message: "Lease deleted" };
}

export async function UpdateLease(id: string, data: LeaseInput) {
  const session = await getServerSession(authOptions);
  const lease = leaseSchema.safeParse(data);

  if (!lease.success) {
    return NextResponse.json({ error: "Invalid lease data" }, { status: 400 });
  }

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const existingLease = await db.lease.findUnique({
    where: {
      id,
    },
  });

  if (!existingLease) {
    return NextResponse.json({ error: "Lease not found" }, { status: 404 });
  }

  if (existingLease.userId !== session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedLease = await db.lease.update({
    where: {
      id,
    },
    data: lease.data,
  });

  return updatedLease;
}

export async function ShareLease(id: string, email: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: true, message: "Unauthorized" };
  }

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return { error: true, message: "User not found" };
  }

  //disallow share to self
  if (user.id === session.user.id) {
    return { error: true, message: "Can not share to self" };
  }

  const lease = await db.lease.findUnique({
    where: {
      id,
    },
  });

  if (!lease) {
    return { error: true, message: "Lease not found" };
  }

  if (lease.userId !== session.user.id) {
    return { error: true, message: "Can not share others lease" };
  }

  const shareLink = await db.sharedLease.create({
    data: {
      userId: user.id,
      leaseId: id,
    },
  });

  return shareLink;
}

export async function GetSharedLeases() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sharedLeases = await db.sharedLease.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      lease: {
        include: {
          user: true,
        },
      },
      user: true,
    },
  });

  return sharedLeases;
}
