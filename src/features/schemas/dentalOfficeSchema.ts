import z from "zod";

export const dentalOfficeSchema = z.object({
  name: z.string().min(1, {
    message: "El nombre del consultorio es obligatorio",
  }).max(20, { message: "El nombre es muy largo" }),
  address: z.string().min(1, {
    message: "La dirección del consultorio es obligatoria",
  }).max(50, { message: "La dirección es muy larga" }),
  phone: z.string().min(1, {
    message: "El teléfono del consultorio es obligatorio",
  }).max(10, { message: "El teléfono es muy largo" }),
  cellPhone: z.string().min(1, {
    message: "El teléfono celular del consultorio es obligatorio",
  }).max(10, { message: "El celular es muy largo" }),
  email: z.string().min(1, {
    message: "El email del consultorio es obligatorio",
  }).max(20, { message: "El email es muy largo" }),
  logoRef: z.string().optional(),
  logoUrl: z.string().optional(),
  managerId: z.string().min(1, {
    message: "El ID del Director es obligatorio",
  }),
});

export type DentalOfficeFormValues = z.infer<typeof dentalOfficeSchema>;
