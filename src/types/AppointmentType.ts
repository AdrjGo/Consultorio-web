import type { PatientType } from "types/PatientType";

export type AppointmentTypes = {
  id: string;
  patientId: string;
  professionalId: string;
  startDate: string;
  endDate: string;
  type: string;
  status: string;
  lifeStatus: string;
  reason: string;
  observations: string;
  professional: null | unknown;
  patient: PatientType;
};

export interface AppointmentPayload {
  patientId: string;
  professionalId: string;
  startDate: string;
  endDate: string;
  type: number;
  status: number;
  reason: string;
  observations: string;
}
