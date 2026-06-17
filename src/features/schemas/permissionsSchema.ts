import z from "zod";

export const rolePermissionsSchema = z.object({
  roleId: z.string().min(1, { message: "El rol es obligatorio" }),
  permissionId: z
    .array(z.string())
    .min(1, { message: "El permiso es obligatorio" }),
});

export type RolePermissionsFormValues = z.infer<typeof rolePermissionsSchema>;
