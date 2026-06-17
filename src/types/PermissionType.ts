export type PermissionKeyType = {
  key: string;
  permissions: PermissionType[];
};

export type PermissionType = {
  id: string;
  name: string;
  description: string;
};
