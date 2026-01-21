import { decodeToken } from "@services";
import { Toast } from "./toastNotify";

export function hasPermission(permission: string) {
  const permissions = decodeToken()?.permission;

  if (permissions) {
    return permissions.includes(permission);
  } else {
    Toast.error("No tienes permisos para acceder a esta funcionalidad");
    return false;
  }
}
