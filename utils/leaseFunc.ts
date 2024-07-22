import { LeaseCalculationResult } from "@/types/lease";
import { LeaseType } from "@prisma/client";

export function calculateLease(
  leaseStartDate: string,
  leaseEndDate: string,
  monthlyRent: number,
  securityDeposit: number,
  additionalCharges: number,
  annualRentIncreasePercentage: number,
  leaseType: LeaseType,
  utilitiesIncluded: boolean,
  maintenanceFees: number,
  latePaymentPenalty: number
): LeaseCalculationResult {
  // Calculate the number of months in the lease period
  const leaseDurationMonths = getDurationInMonths(leaseStartDate, leaseEndDate);

  // Calculate the total rent over the lease period
  let totalRent = 0;
  let currentRent = +monthlyRent;
  for (let i = 0; i < leaseDurationMonths; i++) {
    totalRent += currentRent;
    if ((i + 1) % 12 === 0) {
      // Increase the rent annually
      currentRent *= 1 + +annualRentIncreasePercentage / 100;
    }
  }

  // Calculate the total additional charges
  const totalAdditionalCharges = +(
    parseInt(additionalCharges?.toString()) * leaseDurationMonths
  );

  // Calculate the total maintenance fees
  const totalMaintenanceFees = +(maintenanceFees * leaseDurationMonths);

  // Calculate the total cost of the lease
  const totalCost =
    totalRent +
    (securityDeposit || 0) +
    (totalAdditionalCharges || 0) +
    (totalMaintenanceFees || 0);

  // Calculate the monthly cost of the lease (without rounding for internal calculations)
  const monthlyLeaseCost = totalCost / leaseDurationMonths;

  const annualIncrease = monthlyRent * (annualRentIncreasePercentage / 100);

  // Prepare the result
  const result: LeaseCalculationResult = {
    leaseDurationMonths,
    totalRent: Math.round(totalRent * 100) / 100, // Round total rent to 2 decimal places
    totalAdditionalCharges,
    totalMaintenanceFees,
    totalCost: Math.round(totalCost * 100) / 100, // Round total cost to 2 decimal places
    // Round monthlyLeaseCost based on context (assuming 2 decimal places for display)
    monthlyLeaseCost: Math.round(monthlyLeaseCost * 100) / 100,
    latePaymentPenalty,
    leaseType,
    utilitiesIncluded,
    annualIncrease,
  };

  return result;
}

export function getDurationInMonths(
  startDate: string,
  endDate: string
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth() + years * 12;
  const days = end.getDate() - start.getDate();

  // If the end day is before the start day, subtract 1 month
  if (days < 0) {
    return months - 1;
  }

  return months;
}
