export interface PatientInfo {
  name: string;
  lastName: string;
  birthDate: string;
  ci: string;
  phone: string;
  email: string;
}

export interface MonitoringRecordData {
  id: string;
  date: string;
  nomenclature: string;
  treatment: string;
  observations: string;
  files: string[];
}

export interface PretreatmentExamData {
  id: string;
  observations: string;
  interconsultation: string;
  piece: string;
  caries: boolean;
  treatment?: string;
}

export interface DoctorInfo {
  name: string;
  clinicAddress: string;
  clinicPhone: string;
  clinicEmail: string;
}

export interface ClinicalReportData {
  patient: PatientInfo;
  doctor: DoctorInfo;
  generalHistory: Record<string, unknown> | null;
  pretreatmentExams: PretreatmentExamData[];
  treatmentSummary: Record<string, unknown> | null;
  clinicHistory: Record<string, unknown> | null;
  monitoring: MonitoringRecordData[];
  generatedAt: string;
}

export interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  city: string;
}