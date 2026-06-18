import { z } from "zod";

export const monitoringSchema = z.object({
  patientId: z.string().min(1, { message: "El paciente es obligatorio" }),
  nomenclature: z
    .string()
    .min(1, { message: "La nomenclatura es obligatoria" })
    .max(15, { message: "La nomenclatura es muy larga" }),
  treatment: z.string().min(1, { message: "El tratamiento es obligatorio" }).max(50, { message: "El tratamiento es muy largo" }),
});

export type MonitoringFormValues = z.infer<typeof monitoringSchema>;
