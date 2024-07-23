"use client";
import React, { useState } from "react";
import EditWrapper from "@/components/Home/EditWrapper";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className="relative bg-white">
        <h2 className="sr-only">Edit Lease</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Lease information */}
          <EditWrapper id={params.id} />
        </div>
      </div>
    </>
  );
};

export default page;
