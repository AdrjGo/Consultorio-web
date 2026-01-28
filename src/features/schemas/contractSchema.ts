import { paymentManagerSchema } from "./paymentManager";
import { formResSchema } from "./formResSchema";
import z from "zod";

export const contractSchema = z.object({
  //   formRes: formResSchema,
  contract: z.object({
    totalCost: z.number().min(1, "El costo total es obligatorio"),
    monthsDuration: z.number().min(1, "El mes de tratamiento es obligatorio"),
  }),
  paymentManager: paymentManagerSchema,
});

export type ContractFormValues = z.infer<typeof contractSchema>;
