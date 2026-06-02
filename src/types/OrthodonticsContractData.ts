export interface BudgetRow {
  concepto: string;
  costo: number;
  cantidad: number;
  total: number;
  observacion?: string;
}

export interface OrthodonticsContractData {
  patient: {
    firstName: string;
    lastName: string;
    birthDate: string;
    address: string;
    phone: string;
    age: number;
  };
  formResponse: Record<string, unknown>;
  totalCost: number;
  monthsDuration: number;
  budgetRows?: BudgetRow[];
  paymentManager: {
    nombre: string;
    parentesco: string;
    email: string;
    telefono: string;
    celular: string;
  };
  doctor: {
    doctorName: string;
    doctorCI: string;
    clinicName: string;
    clinicAddress: string;
  };
}
