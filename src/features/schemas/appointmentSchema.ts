import z from "zod";

export const appointmentSchema = z.object({
  patientId: z.string().min(1, { message: "El paciente es requerido" }),
  professionalId: z.string().min(1, { message: "El dentista es requerido" }),
  date: z.string().min(1, { message: "La fecha es requerida" }),
  startTime: z.string().min(1, { message: "La hora de inicio es requerida" }),
  endTime: z.string().min(1, { message: "La hora de fin es requerida" }),
  type: z.number().min(0, { message: "El tipo de cita es requerido" }),
  status: z.number().min(0, { message: "El estado de la cita es requerido" }),
  reason: z.string(),
  observations: z.string(),
});

export type AppointmentFormValues = z.infer<typeof appointmentSchema>;
