import z from "zod";

export const pretreatmentSchema = z.object({
  patientId: z.string(),
  observations: z
    .string()
    .min(1, { message: "Las observaciones son requeridas" })
    .max(200, { message: "Las observaciones son muy largas" }),
  interconsultation: z
    .string()
    .min(1, { message: "La interconsulta es requerida" })
    .max(1000, { message: "La interconsulta es muy larga" }),
  piece: z.string().min(1, { message: "La pieza es requerida" }).max(18, { message: "La pieza es muy larga" }),
  caries: z.boolean(),
  treatment: z.string().min(1, { message: "El tratamiento es requerido" }).max(50, { message: "El tratamiento es muy largo" }),
  cost: z.number().min(1, { message: "El costo es requerido" }),
});

export type PretreatmentFormValues = z.infer<typeof pretreatmentSchema>;
