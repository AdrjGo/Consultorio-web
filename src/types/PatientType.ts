import type { PersonType } from "types/PersonType";

export type PatientType = {
  id: string;
  responsible: PersonType;
  address: string;
  zone: string;
  city: string;
  homePhone: string;
  occupation: string;
  placeOccupation: string;
  nit: string;
  state: string;
  sender: string;
  patientPerson: PersonType;
};
