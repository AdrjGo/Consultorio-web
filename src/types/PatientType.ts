import type { PersonType } from "types/PersonType";

export type PatientType =  {
  id: string;
  responsible: string;
  address: string;
  zone: string;
  city: string;
  homePhone: string;
  occupation: string;
  placeOcupation: string;
  sender: string;
  patientPerson: PersonType;
};
