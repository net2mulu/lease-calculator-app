"use client";
import React from "react";
import { DateTime } from "luxon";
import { SharedLeaseData } from "@/types/lease";
import { calculateLease, getDurationInMonths } from "@/utils/leaseFunc";
import Link from "next/link";

const SharedLeaseCard = ({ data }: { data: SharedLeaseData }) => {
  console.log(data);

  const res = calculateLease(
    data.lease.startDate.toString(),
    data.lease.endDate.toString(),
    Number(data.lease.monthlyRent),
    Number(data.lease.securityDeposit),
    Number(data.lease.additionalCharges),
    Number(data.lease.annualRentIncrease),
    data.lease.leaseType,
    data.lease.utilitiesIncluded,
    Number(data.lease.maintenanceFees),
    Number(data.lease.latePaymentPenalty)
  );
  return (
    <li className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
      <div className="w-full flex items-center justify-between p-6 space-x-6">
        <div className="flex-1 truncate">
          <div className="flex items-center space-x-3">
            <h3 className="text-gray-900 text-sm font-medium truncate">
              {data.lease.user.username}
            </h3>
          </div>
          <p className="mt-1 text-gray-500 text-sm truncate">
            {data.lease.user.email}
          </p>
          <div className="flex gap-2 text-sm text-gray-500">
            <p className="">
              {" "}
              {DateTime.fromJSDate(data.lease.startDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </p>{" "}
            -{" "}
            <p className="">
              {DateTime.fromJSDate(data.lease.endDate).toLocaleString(
                DateTime.DATE_MED
              )}
            </p>
          </div>
        </div>
        <div className="w-10 h-10 bg-purple-400 rounded-full flex-shrink-0 inline-flex justify-center items-center">
          {data.lease.user.username.charAt(0).toUpperCase()}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-1 px-6 p-2">
        <p className="text-gray-500 text-xs">
          Penalty Amount: ${data.lease.latePaymentPenalty.toString()}
        </p>
        <p className="text-gray-500 text-xs">
          Duration:{" "}
          {getDurationInMonths(
            data.lease.startDate.toString(),
            data.lease.endDate.toString()
          )}{" "}
          months
        </p>
        <p className="text-gray-500 text-xs">
          Annual Increase: {data.lease.annualRentIncrease.toString()}%
        </p>
        <p className="text-gray-500 text-xs">
          Maintenance Fees: ${data.lease.maintenanceFees.toString()}
        </p>
        <p className="text-gray-500 text-xs">Type: {data.lease.leaseType}</p>
        <p className="text-gray-500 text-xs">Total Cost: ${res.totalCost}</p>
      </div>
      <div>
        <div className=" flex divide-x divide-gray-200">
          <div className="w-0 flex-1 flex cursor-pointer">
            <Link
              href={`/home/${data.lease.id}?mode=view`}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-2 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-purple-500"
            >
              <span className="ml-3">view</span>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SharedLeaseCard;
