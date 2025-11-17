import z from "zod";

export const personSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El nombre es requerido" })
    .max(20, { message: "El nombre es muy largo" }),

  lastName: z
    .string()
    .min(1, { message: "El apellido es requerido" })
    .max(20, { message: "El apellido es muy largo" }),

  birthDate: z
    .string()
    .min(1, { message: "La fecha de nacimiento es requerida" }),

  sex: z.string().min(1, { message: "El género es requerido" }),

  profession: z
    .string()
    .max(15, { message: "La profesión es muy larga" })
    .optional(),

  phone: z
    .string()
    .min(8, {
      message: "El número de teléfono debe tener entre 8 y 10 dígitos",
    })
    .max(10, { message: "El número es muy largo" }),

  ci: z
    .string()
    .min(1, { message: "El CI es requerido" })
    .max(9, { message: "El CI es muy largo" }),

  email: z.email({ message: "El email es inválido" }),
});
