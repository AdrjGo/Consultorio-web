import z from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
