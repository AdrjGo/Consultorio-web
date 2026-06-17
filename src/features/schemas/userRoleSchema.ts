import z from "zod";

export const userRoleSchema = z.object({
  roleIds: z.array(z.uuid()).min(1, {
    message: "Seleccione al menos un rol",
  }),
});

export type UserRoleFormValues = z.infer<typeof userRoleSchema>;
