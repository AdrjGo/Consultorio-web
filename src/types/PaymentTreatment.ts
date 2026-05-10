export type PaymentTreatment = {
  totalPayment: number;
  totalDebt: number;
  totalCost: number;
  paymentTreatmentProgresses: PaymentTreatmentProgress[];
};

export type PaymentTreatmentProgress = {
  id: string;
  patientId: string;
  payment: number;
  debt: number;
  method: string;
  recivedBy: string;
  observations: string;
  createdAt: string;
};
