"use client";
import React, { useState } from "react";
import CreateWrapper from "@/components/Home/CreateWrapper";

const page = () => {
  return (
    <>
      <div className="relative bg-white">
        <h2 className="sr-only">create Lease</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Lease information */}
          <CreateWrapper />
        </div>
      </div>
    </>
  );
};

export default page;
