import { personSchema } from "./personSchema";
import z from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  .max(20, { message: "La contraseña no puede tener más de 20 caracteres" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "La contraseña debe contener al menos una letra mayúscula",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "La contraseña debe contener al menos una letra minúscula",
  })
  .refine((password) => /[0-9]/.test(password), {
    message: "La contraseña debe contener al menos un número",
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: "La contraseña debe contener al menos un carácter especial",
  });

export const userSchema = z.object({
  password: passwordSchema.optional(),
  person: personSchema,
});

export type UserFormValues = z.infer<typeof userSchema>;
