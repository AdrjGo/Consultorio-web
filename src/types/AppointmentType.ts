type Status =
  | "Scheduled"
  | "Rescheduled"
  | "Pending"
  | "Rejected"
  | "Cancelled";

type Type =
  | "ConsultaInicial"
  | "Seguimiento"
  | "Higiene"
  | "Tratamiento"
  | "Emergencia"
  | "EliminacionDeDispositivo"
  | "RevisiónDeProgreso";

export type AppointmentType = {
  patientId: string;
  professionalId: string;
  startDate: string;
  endDate: string;
  type: Type;
  status: Status;
  reason: string;
  observations: string;
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

