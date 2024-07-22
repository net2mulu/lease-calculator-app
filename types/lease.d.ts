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
