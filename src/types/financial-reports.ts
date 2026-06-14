// Financial Report DTOs — mirror of backend Application/Dto/Reports/*ReportDataDto.cs

export interface PaymentInfoDto {
  name: string;
  lastName: string;
  ci: string;
  phone: string;
}

export interface ClinicInfoDto {
  name: string;
  address: string;
  phone: string;
}

export interface PaymentRowDto {
  date: string;
  description: string;
  amount: number;
  method: string;
  receivedBy: string;
}

export interface PaymentReportDataDto {
  patient: PaymentInfoDto;
  clinic: ClinicInfoDto;
  startDate: string;
  endDate: string;
  payments: PaymentRowDto[];
  generatedAt: string;
}

export interface ContractSummaryDto {
  totalCost: number;
  totalPaid: number;
  debt: number;
}

export interface QuotaRowDto {
  quotaMonth: string;
  amount: number;
  paid: boolean;
  paidDate: string | null;
  method: string | null;
}

export interface QuotaReportDataDto {
  patient: PaymentInfoDto;
  clinic: ClinicInfoDto;
  contract: ContractSummaryDto;
  quotas: QuotaRowDto[];
  generatedAt: string;
}

export interface ContractBalanceDto {
  totalCost: number;
  totalPaid: number;
  debt: number;
  runningBalance: number;
}

export interface AccountStatementDataDto {
  patient: PaymentInfoDto;
  clinic: ClinicInfoDto;
  contracts: ContractBalanceDto[];
  totalDebt: number;
  generatedAt: string;
}