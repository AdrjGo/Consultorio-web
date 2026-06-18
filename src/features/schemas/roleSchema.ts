import z from "zod";

export const roleSchema = z.object({
  name: z.string().min(1, { message: "El nombre es obligatorio" }).max(20, { message: "El nombre es muy largo" }),
  description: z.string().min(1, { message: "La descripción es obligatoria" }).max(100, { message: "La descripción es muy larga" }),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
