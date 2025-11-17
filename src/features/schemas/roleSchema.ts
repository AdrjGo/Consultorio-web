import z from "zod";

export const roleSchema = z.object({
  roleIds: z.array(z.uuid()).min(1, {
    message: "Seleccione al menos un rol",
  }),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
