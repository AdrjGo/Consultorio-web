import z from "zod";

export const treatmentProcessSchema = z.object({
  patientId: z.string(),
  payment: z.number().min(1, { message: "El monto es requerido" }),
});

export type TreatmentProcessFormValues = z.infer<typeof treatmentProcessSchema>;
