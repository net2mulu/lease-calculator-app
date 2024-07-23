import { User } from "@prisma/client";

export interface LeaseCalculationResult {
  leaseDurationMonths: number;
  totalRent: number;
  totalAdditionalCharges: number;
  totalMaintenanceFees: number;
  totalCost: number;
  monthlyLeaseCost: number;
  latePaymentPenalty: number;
  leaseType: LeaseType;
  utilitiesIncluded: boolean;
  annualIncrease: number;
}

export interface LeaseData {
  id: string;
  startDate: Date;
  endDate: Date;
  monthlyRent: number;
  securityDeposit: number;
  additionalCharges: number;
  annualRentIncrease: number;
  leaseType: LeaseType;
  utilitiesIncluded: boolean;
  maintenanceFees: number;
  latePaymentPenalty: number;
  userId: string;
  user: User;
}

export interface ModalContentProps {
  title: string;
  desc: string;
  callback: () => void;
}
