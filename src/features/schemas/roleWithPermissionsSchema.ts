import { rolePermissionsSchema } from "./permissionsSchema";
import { roleSchema } from "./roleSchema";
import z from "zod";

export const roleWithPermissionsSchema = z.object({
  role: roleSchema,
  permissions: z.array(rolePermissionsSchema),
});

export type RoleWithPermissionsFormValues = z.infer<
  typeof roleWithPermissionsSchema
>;
