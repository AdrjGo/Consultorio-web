export type PretreatmentType = {
  id: string;
  date: string;
  patientId: string;
  observations: string;
  interconsultation: string;
  piece: string;
  caries: boolean;
  treatment: string;
  cost: number;
};

export type PretreatmentSummaryType = {
  totalCost: number;
  exams: PretreatmentType[];
};
