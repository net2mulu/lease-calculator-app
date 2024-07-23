"use client";
import React from "react";
import { DateTime } from "luxon";
import { LeaseData } from "@/types/lease";
import { calculateLease, getDurationInMonths } from "@/utils/leaseFunc";
import Link from "next/link";

const LeaseCard = ({ data }: { data: LeaseData }) => {
  const res = calculateLease(
    data.startDate.toString(),
    data.endDate.toString(),
    data.monthlyRent,
    data.securityDeposit,
    data.additionalCharges,
    data.annualRentIncrease,
    data.leaseType,
    data.utilitiesIncluded,
    data.maintenanceFees,
    data.latePaymentPenalty
  );

  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {data.user.username}
            </h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {data.user.email}
          </p>
          <div className="flex gap-2 text-sm text-gray-500">
            <p className="">
              {" "}
              {DateTime.fromJSDate(data.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </p>{" "}
            -{" "}
            <p className="">
              {DateTime.fromJSDate(data.endDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </p>
          </div>
        </div>
        <div className="w-10 h-10 bg-purple-400 rounded-full flex-shrink-0 inline-flex justify-center items-center">
          {data.user.username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 px-6 p-2">
        <p className="text-gray-500 text-xs">
          Penalty Amount: ${data.latePaymentPenalty}
        </p>
        <p className="text-gray-500 text-xs">
          Duration:{" "}
          {getDurationInMonths(
            data.startDate.toString(),
            data.endDate.toString()
          )}{" "}
          months
        </p>
        <p className="text-gray-500 text-xs">
          Annual Increase: {data.annualRentIncrease}%
        </p>
        <p className="text-gray-500 text-xs">
          Maintenance Fees: ${data.maintenanceFees}
        </p>
        <p className="text-gray-500 text-xs">Type: {data.leaseType}</p>
        <p className="text-gray-500 text-xs">Total Cost: ${res.totalCost}</p>
      </div>
      <div>
        <div className=" flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex cursor-pointer">
            <Link
              href={`/home/${data.id}`}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-purple-500"
            >
              <span className="ml-3">Update</span>
            </Link>
          </div>
          <div className="-ml-px w-0 flex-1 flex cursor-pointer">
            <Link
              href={`?share=${data.id}`}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-purple-500"
            >
              <span className="ml-3">Share</span>
            </Link>
          </div>
          <div className="-ml-px w-0 flex-1 flex cursor-pointer">
            <Link
              href={`?delete=${data.id}`}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-red-500"
            >
              <span className="ml-3">Delete</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default LeaseCard;
