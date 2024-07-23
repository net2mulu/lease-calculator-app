"use client";
import { LeaseCalculationResult } from "@/types/lease";
import React, { useState } from "react";
import LeaseForm from "@/components/Home/LeaseForm";
import LeaseInfo from "@/components/Home/LeaseInfo";

const page = () => {
  const [leaseInfo, setLeaseInfo] = useState<LeaseCalculationResult>();

  return (
    <>
      <div className="relative bg-white">
        <h2 className="sr-only">create Lease</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Lease information */}
          <LeaseInfo leaseInfo={leaseInfo} />
          <LeaseForm setLeaseInfo={setLeaseInfo} />
        </div>
      </div>
    </>
  );
};

export default page;
