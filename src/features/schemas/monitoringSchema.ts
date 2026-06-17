import { z } from "zod";

export const monitoringSchema = z.object({
  patientId: z.string().min(1, { message: "El paciente es obligatorio" }),
  nomenclature: z
    .string()
    .min(1, { message: "El nomenclatura es obligatorio" }),
  treatment: z.string().min(1, { message: "La tratamiento es obligatorio" }),
});

export type MonitoringFormValues = z.infer<typeof monitoringSchema>;
