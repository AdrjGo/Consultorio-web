import z from "zod";

export const dentalOfficeSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del consultorio es obligatorio",
  }),
  address: z.string().min(1, {
    message: "La dirección del consultorio es obligatoria",
  }),
  phone: z.string().min(1, {
    message: "El teléfono del consultorio es obligatorio",
  }),
  cellPhone: z.string().min(1, {
    message: "El teléfono celular del consultorio es obligatorio",
  }),
  email: z.string().min(1, {
    message: "El email del consultorio es obligatorio",
  }),
  logoRef: z.string().optional(),
  logoUrl: z.string().optional(),
  managerId: z.string().min(1, {
    message: "El ID del Director es obligatorio",
  }),
});

export type DentalOfficeFormValues = z.infer<typeof dentalOfficeSchema>;
