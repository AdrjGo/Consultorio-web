import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const isAuth = document.cookie.includes("token");
  return isAuth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
