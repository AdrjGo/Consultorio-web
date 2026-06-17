// import { rolePermissionsSchema } from "./permissionsSchema";
import { roleSchema } from "./roleSchema";
import z, { string } from "zod";

export const roleWithPermissionsSchema = z.object({
  role: roleSchema,
  permissions: z.array(string()).min(1, "Debe seleccionar al menos un permiso"),
});

export type RoleWithPermissionsFormValues = z.infer<
  typeof roleWithPermissionsSchema
>;
