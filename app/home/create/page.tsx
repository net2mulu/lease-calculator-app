"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { calculateLease } from "@/utils/leaseFunc";
import { LeaseCalculationResult } from "@/types/lease";
import { useMutation } from "@tanstack/react-query";
import { SaveLease } from "@/app/_actions";

const FormSchema = z.object({
  startDate: z
    .string()
    .min(1, "Start date is required")
    .transform((val) => new Date(val)),
  endDate: z
    .string()
    .min(1, "End date is required")
    .transform((val) => new Date(val)),
  monthlyRent: z
    .string()
    .min(1, "This field is required")
    .transform((val) => parseFloat(val)),
  securityDeposit: z
    .string()
    .min(1, "This field is required")
    .transform((val) => parseFloat(val)),
  additionalCharges: z
    .string()
    .min(1, "This field is required")
    .transform((val) => parseFloat(val)),
  annualRentIncrease: z
    .string()
    .min(1, "This field is required")
    .transform((val) => parseFloat(val)),
  leaseType: z.enum(["RESIDENTIAL", "COMMERCIAL"]),
  utilitiesIncluded: z.boolean(),
  maintenanceFees: z
    .string()
    .min(1, "This field is required")
    .transform((val) => parseFloat(val)),
  latePaymentPenalty: z.number(),
});

const page = () => {
  const [leaseInfo, setLeaseInfo] = useState<LeaseCalculationResult>();
  const router = useRouter();
  const { mutate: createLease, isPending } = useMutation({
    mutationFn: (val: z.infer<typeof FormSchema>) => SaveLease(val),
    onError: (error) => {
      toast.error("Failed to create lease");
    },

    onSuccess: () => {
      toast.success("Lease created successfully");
      router.push("/home");
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      leaseType: "RESIDENTIAL",
      utilitiesIncluded: false,
      latePaymentPenalty: 10,
    },
  });

  const handleLease = async (values: z.infer<typeof FormSchema>) => {
    createLease(values);
  };

  const {
    startDate,
    endDate,
    monthlyRent,
    securityDeposit,
    additionalCharges,
    annualRentIncrease,
    leaseType,
    utilitiesIncluded,
    maintenanceFees,
    latePaymentPenalty,
  } = watch();

  useEffect(() => {
    const start = startDate?.toString();
    const end = endDate?.toString();

    const res = calculateLease(
      start,
      end,
      +monthlyRent,
      +securityDeposit,
      +additionalCharges,
      +annualRentIncrease,
      leaseType,
      utilitiesIncluded,
      +maintenanceFees,
      latePaymentPenalty
    );
    setLeaseInfo(res);
  }, [
    startDate,
    endDate,
    monthlyRent,
    securityDeposit,
    additionalCharges,
    annualRentIncrease,
    leaseType,
    utilitiesIncluded,
    maintenanceFees,
    latePaymentPenalty,
  ]);

  return (
    <>
      <div className="relative bg-white">
        <h2 className="sr-only">create Lease</h2>

        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* Lease information */}
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
                <span className="font-bold text-sm">
                  Lease Duration (Months):
                </span>
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
                <span className="font-bold text-sm">
                  Total Maintenance Fees:
                </span>
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

          {/* Lease form */}
          <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
            <h3 className="text-lg font-medium text-gray-900">Create Lease</h3>
            <form
              onSubmit={handleSubmit(handleLease)}
              className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
            >
              <div>
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium text-gray-900"
                >
                  Start Date
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="month"
                    {...register("startDate")}
                    id="start-date"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.startDate && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.startDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="end-date"
                  className="block text-sm font-medium text-gray-900"
                >
                  End Date
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="month"
                    {...register("endDate")}
                    id="end-date"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.endDate && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.endDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="monthly"
                  className="block text-sm font-medium text-gray-900"
                >
                  Monthly rent amount
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="number"
                    {...register("monthlyRent")}
                    id="monthly"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.monthlyRent && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.monthlyRent.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="security-deposit"
                  className="block text-sm font-medium text-gray-900"
                >
                  Security Deposit
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="number"
                    {...register("securityDeposit")}
                    id="security-deposit"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.securityDeposit && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.securityDeposit.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="additional-charges"
                  className="block text-sm font-medium text-gray-900"
                >
                  Additional Charges
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="number"
                    {...register("additionalCharges")}
                    id="additional-charges"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.additionalCharges && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.additionalCharges.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="annual-rent-increase"
                  className="block text-sm font-medium text-gray-900"
                >
                  Annual Rent Increase
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="number"
                    {...register("annualRentIncrease")}
                    id="annual-rent-increase"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.annualRentIncrease && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.annualRentIncrease.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="lease-type"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lease Type
                </label>
                <div className="mt-1">
                  <select
                    {...register("leaseType")}
                    id="lease-type"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  >
                    <option value="RESIDENTIAL">Residential</option>
                    <option value="COMMERCIAL">Commercial</option>
                  </select>
                  {errors.leaseType && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.leaseType.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="utilities-included"
                  className="block text-sm font-medium text-gray-900"
                >
                  Utilities Included
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="checkbox"
                    {...register("utilitiesIncluded")}
                    id="utilities-included"
                    className="py-3 px-4 shadow-sm text-purple-600 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.utilitiesIncluded && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.utilitiesIncluded.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="maintenance-fees"
                  className="block text-sm font-medium text-gray-900"
                >
                  Maintenance Fees
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="number"
                    {...register("maintenanceFees")}
                    id="maintenance-fees"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.maintenanceFees && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.maintenanceFees.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="late-payment-penalty"
                  className="block text-sm font-medium text-gray-900"
                >
                  Late Payment Penalty
                </label>
                <div className="mt-1">
                  <input
                    disabled={isPending}
                    type="number"
                    {...register("latePaymentPenalty")}
                    id="late-payment-penalty"
                    className="py-3 px-4 block w-full shadow-sm text-gray-900 focus:ring-purple-500 focus:border-purple-500 border-gray-300 rounded-md"
                  />
                  {errors.latePaymentPenalty && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.latePaymentPenalty.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:col-span-2 sm:flex sm:justify-end">
                <button
                  disabled={isPending}
                  type="submit"
                  className={`mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    isPending
                      ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto`}
                >
                  {isPending ? " Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
