"use client";
import React, { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetLeaseById, SaveLease, UpdateLease } from "@/app/_actions";
import { useRouter, useSearchParams } from "next/navigation";
import { calculateLease } from "@/utils/leaseFunc";
import { LeaseData } from "@/types/lease";

const FormSchema = z.object({
  startDate: z
    .string()
    .min(1, "Start date is required")
    .transform((val) => val.toString()),
  endDate: z
    .string()
    .min(1, "End date is required")
    .transform((val) => val.toString()),
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

function SearchBarFallback() {
  return <>Not Found</>;
}

const LeaseForm = ({
  setLeaseInfo,
  id,
}: {
  setLeaseInfo: any;
  id?: string;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
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

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const router = useRouter();
  const { mutate: createLease, isPending } = useMutation({
    mutationFn: (val: z.infer<typeof FormSchema>) => {
      const { startDate, endDate, ...rest } = val;
      return SaveLease({
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ...rest,
      });
    },

    onError: (error) => {
      toast.error("Failed to create lease");
    },

    onSuccess: () => {
      toast.success("Lease created successfully");
      router.push("/home");
      router.refresh();
    },
  });

  const { mutate: updateLeaseById, isPending: updating } = useMutation({
    mutationFn: ({
      id,
      val,
    }: {
      id: string;
      val: z.infer<typeof FormSchema>;
    }) => {
      const { startDate, endDate, ...rest } = val;
      return UpdateLease(id, {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        ...rest,
      });
    },

    onError: (error) => {
      toast.error("Failed to update lease");
    },

    onSuccess: () => {
      toast.success("Lease Updated successfully");
      router.push("/home");
      router.refresh();
    },
  });

  const handleLease = async (values: z.infer<typeof FormSchema>) => {
    createLease(values);
  };

  const updateLease = async (values: z.infer<typeof FormSchema>) => {
    if (id) {
      updateLeaseById({ id: id, val: values });
    }
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

  const { data: lease, isLoading } = useQuery({
    queryKey: ["leaseSingle", id],
    queryFn: () => GetLeaseById(id ?? ""),
  });

  useEffect(() => {
    if (lease && !("error" in lease)) {
      setValue(
        "startDate",
        (lease as unknown as LeaseData).startDate.toISOString().split("T")[0]
      );

      setValue(
        "endDate",
        (lease as unknown as LeaseData).endDate.toISOString().split("T")[0]
      );
      setValue("leaseType", (lease as unknown as LeaseData).leaseType);
      setValue(
        "utilitiesIncluded",
        (lease as unknown as LeaseData).utilitiesIncluded
      );
      setValue("monthlyRent", (lease as unknown as LeaseData).monthlyRent);
      setValue(
        "securityDeposit",
        (lease as unknown as LeaseData).securityDeposit
      );
      setValue(
        "additionalCharges",
        (lease as unknown as LeaseData).additionalCharges
      );
      setValue(
        "annualRentIncrease",
        (lease as unknown as LeaseData).annualRentIncrease
      );
      setValue(
        "maintenanceFees",
        (lease as unknown as LeaseData).maintenanceFees
      );
      setValue(
        "latePaymentPenalty",
        parseInt((lease as unknown as LeaseData).latePaymentPenalty.toString())
      );
    }
  }, [lease]);

  return (
    <Suspense fallback={<SearchBarFallback />}>
      <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
        <h3 className="text-lg font-medium text-gray-900">
          {id ? "Update Lease" : "Create Lease"}
        </h3>
        <form
          onSubmit={id ? handleSubmit(updateLease) : handleSubmit(handleLease)}
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
                disabled={isPending || mode ? true : false}
                type="date"
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
                disabled={isPending || mode ? true : false}
                type="date"
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
                disabled={isPending || mode ? true : false}
                type="number"
                min={0}
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
                disabled={isPending || mode ? true : false}
                type="number"
                min={0}
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
                disabled={isPending || mode ? true : false}
                type="number"
                min={0}
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
                disabled={isPending || mode ? true : false}
                type="number"
                min={0}
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
                disabled={isPending || mode ? true : false}
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
                disabled={isPending || mode ? true : false}
                type="number"
                min={0}
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
                disabled
                type="number"
                min={0}
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

          {!mode && (
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              {id ? (
                <button
                  disabled={isPending || mode ? true : false}
                  type="submit"
                  className={`mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    isPending
                      ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto`}
                >
                  {isPending ? " Updating..." : "Update"}
                </button>
              ) : (
                <button
                  disabled={isPending || mode ? true : false}
                  type="submit"
                  className={`mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                    isPending
                      ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                      : "bg-purple-600 hover:bg-purple-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:w-auto`}
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </Suspense>
  );
};

export default LeaseForm;
