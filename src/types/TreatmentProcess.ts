export type TreatmentProcessType = {
  id: string;
  patientId: string;
  date: string;
  payment: number;
  debt: number;
};

export type TreatmentProcessSummaryType = {
  totalDebt: number;
  totalPayment: number;
  treatmentProgresses: TreatmentProcessType[];
};
