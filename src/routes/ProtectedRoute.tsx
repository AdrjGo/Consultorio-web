import { hasPermission } from "@utils";
import { Navigate, Outlet } from "react-router";

type Props = {
  permission: string;
};

export default function ProtectedRoute({ permission }: Props) {
  const allowed = hasPermission(permission);

  return allowed ? <Outlet /> : <Navigate to="/odis/404" replace />;
}
