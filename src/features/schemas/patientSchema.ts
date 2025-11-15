import z from "zod";
import { personSchema } from "./personSchema";

export const patientSchema = z.object({
  address: z
    .string()
    .min(1, { message: "La dirección es requerida" })
    .max(50, { message: "La dirección es muy larga" }),
  zone: z
    .string()
    .min(1, { message: "La zona es requerida" })
    .max(10, { message: "La zona es muy larga" }),
  city: z
    .string()
    .min(1, { message: "La ciudad es requerida" })
    .max(10, { message: "La ciudad es muy larga" }),
  homePhone: z.string(),
  occupation: z
    .string()
    .min(1, { message: "La ocupación es requerida" })
    .max(15, { message: "La profesión es muy larga" }),
  placeOccupation: z
    .string()
    .min(1, { message: "La ocupación es requerida" })
    .max(50, { message: "El lugar de trabajo u ocupación es muy largo" }),
  sender: z.string().optional(),
  nit: z.string().max(12, { message: "El NIT es muy larga" }).optional(),
  person: personSchema,
  responsible: z
    .object({
      parentage: z.string().min(1, { message: "El parentesco es requerido" }),
      person: personSchema,
    })
    .nullable(),
  state: z.string().optional(),
});

export type PatientFormValues = z.infer<typeof patientSchema>;
