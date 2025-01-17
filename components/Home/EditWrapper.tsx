import { LeaseCalculationResult } from "@/types/lease";
import React, { useState } from "react";
import LeaseInfo from "./LeaseInfo";
import LeaseForm from "./LeaseForm";

const EditWrapper = ({ id }: { id: string }) => {
  const [leaseInfo, setLeaseInfo] = useState<LeaseCalculationResult>();

  return (
    <>
      <LeaseInfo leaseInfo={leaseInfo} />

      <LeaseForm id={id} setLeaseInfo={setLeaseInfo} />
      
    </>
  );
};

export default EditWrapper;
