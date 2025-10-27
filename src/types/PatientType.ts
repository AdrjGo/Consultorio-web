import type { PersonType } from "types/PersonType";

export type PatientType =  {
  id: string;
  address: string;
  city: string;
  homePhone: string;
  occupation: string;
  patientPerson: PersonType;
  placeOcupation: string;
  responsible: string;
  sender: string;
  zone: string;
};
