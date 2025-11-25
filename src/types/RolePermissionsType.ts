import type { PermissionType } from "types/PermissionType";

export type RolePermissionsType = {
  id: string;
  key: string;
  permissions: PermissionType[];
};

export type roleWithPermissions = {
  id: string;
  name: string;
  description: string;
  permissions: [];
};
