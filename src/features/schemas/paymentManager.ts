import z from "zod";

export const paymentManagerSchema = z.object({
  personId: z.string().min(1, "El responsable de pagos es obligatorio"),
  parentage: z.string().optional(),
});

export type PaymentManagerFormValues = z.infer<typeof paymentManagerSchema>;
