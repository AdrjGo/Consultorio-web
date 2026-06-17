import z from "zod";

export const pretreatmentSchema = z.object({
  patientId: z.string(),
  observations: z
    .string()
    .min(1, { message: "Las observaciones son requeridas" }),
  interconsultation: z
    .string()
    .min(1, { message: "La interconsultación es requerida" }),
  piece: z.string().min(1, { message: "La pieza es requerida" }),
  caries: z.boolean(),
  treatment: z.string().min(1, { message: "El tratamiento es requerido" }),
  cost: z.number().min(1, { message: "El costo es requerido" }),
});

export type PretreatmentFormValues = z.infer<typeof pretreatmentSchema>;
