import z from "zod";

export const paymentTreatmentSchema = z.object({
  patientId: z.string().min(1, "El paciente es obligatorio"),
  amount: z.number().min(1, "El monto es obligatorio"),
  method: z.number().min(0, "El método de pago es obligatorio"),
  observations: z.string().optional(),
});

export type PaymentTreatmentFormValues = z.infer<typeof paymentTreatmentSchema>;
