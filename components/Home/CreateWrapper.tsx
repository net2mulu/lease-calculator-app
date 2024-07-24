"use client";
import React, { useState } from "react";
import LeaseInfo from "./LeaseInfo";
import LeaseForm from "./LeaseForm";
import { LeaseCalculationResult } from "@/types/lease";

const CreateWrapper = () => {
  const [leaseInfo, setLeaseInfo] = useState<LeaseCalculationResult>();

  return (
    <>
      <LeaseInfo leaseInfo={leaseInfo} />
      <LeaseForm setLeaseInfo={setLeaseInfo} />
    </>
  );
};

export default CreateWrapper;
