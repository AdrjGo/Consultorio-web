export type FullContractType = {
  contract: {
    contractId: string;
    patientId: string;
    totalCost: number;
    monthsDuration: number;
    date: string;
    submodID: number;
  };
  paymentManagerName: string;
  paymentManagerId: string;
};
