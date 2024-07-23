import React from "react";

const LeaseInfo = ({ leaseInfo }: { leaseInfo: any }) => {
  return (
    <div className="relative overflow-hidden py-10 px-6 bg-purple-700 sm:px-10 xl:p-12">
      <div
        className="absolute inset-0 pointer-events-none sm:hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          width={343}
          height={388}
          viewBox="0 0 343 388"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
            fill="url(#linear1)"
            fillOpacity=".1"
          />
          <defs>
            <linearGradient
              id="linear1"
              x1="254.553"
              y1="107.554"
              x2="961.66"
              y2="814.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          width={359}
          height={339}
          viewBox="0 0 359 339"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
            fill="url(#linear2)"
            fillOpacity=".1"
          />
          <defs>
            <linearGradient
              id="linear2"
              x1="192.553"
              y1="28.553"
              x2="899.66"
              y2="735.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 w-full h-full"
          width={160}
          height={678}
          viewBox="0 0 160 678"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
            fill="url(#linear3)"
            fillOpacity=".1"
          />
          <defs>
            <linearGradient
              id="linear3"
              x1="192.553"
              y1="325.553"
              x2="899.66"
              y2="1032.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-white">
        Realtime Lease information
      </h3>

      <ul className="shadow-lg rounded-lg p-6 space-y-4">
        <li className="grid grid-cols-2 gap-4">
          <span className="font-bold text-sm">Late Penalty Amount:</span>
          <div className=" px-4 py-2 rounded-md font-medium">$10</div>
        </li>
        <li className="grid grid-cols-2 gap-4">
          <span className="font-bold text-sm">Lease Duration (Months):</span>
          <div className=" px-4 py-2 rounded-md font-medium">
            {leaseInfo?.leaseDurationMonths || "Unknown"}
          </div>
        </li>
        <li className="grid grid-cols-2 gap-4">
          <span className="font-bold text-sm">Annual Increase:</span>
          <div className=" px-4 py-2 rounded-md font-medium">
            {leaseInfo?.annualIncrease || "Unknown"}
          </div>
        </li>
        {/* <li className="grid grid-cols-2 gap-4">
              <span className="font-bold text-sm">Lease Type:</span>
              <div className=" px-4 py-2 rounded-md font-medium">
                {leaseInfo?.leaseType || "Unknown"}
              </div>
            </li> */}
        {/* <li className="grid grid-cols-2 gap-4">
              <span className="font-bold text-sm">Monthly Lease Cost:</span>
              <div className=" px-4 py-2 rounded-md font-medium">
                {leaseInfo?.monthlyLeaseCost || "Unknown"}
              </div>
            </li> */}
        {/* <li className="grid grid-cols-2 gap-4">
              <span className="font-bold text-sm">
                Total Additional Charges:
              </span>
              <div className=" px-4 py-2 rounded-md font-medium">
                {leaseInfo?.totalAdditionalCharges || "Unknown"}
              </div>
            </li> */}
        <li className="grid grid-cols-2 gap-4">
          <span className="font-bold text-sm">Total Maintenance Fees:</span>
          <div className=" px-4 py-2 rounded-md font-medium">
            {leaseInfo?.totalMaintenanceFees || "Unknown"}
          </div>
        </li>
        <li className="grid grid-cols-2 gap-4">
          <span className="font-bold text-sm">Total Rent:</span>
          <div className=" px-4 py-2 rounded-md font-medium">
            {leaseInfo?.totalRent || "Unknown"}
          </div>
        </li>
        <li className="grid grid-cols-2 gap-4">
          <span className="font-bold text-sm">Total Cost:</span>
          <div className=" px-4 py-2 rounded-md font-medium">
            {leaseInfo?.totalCost || "Unknown"}
          </div>
        </li>
        {/* <li className="grid grid-cols-2 gap-4">
              <span className="font-bold text-sm">Utilities Included:</span>
              <div className=" px-4 py-2 rounded-md font-medium">
                {leaseInfo?.utilitiesIncluded || "Unknown"}
              </div>
            </li> */}
      </ul>
    </div>
  );
};

export default LeaseInfo;
