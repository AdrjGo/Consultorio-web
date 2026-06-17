import Layout from "@components/layout";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const isAuth = document.cookie.includes("token");
  return isAuth ? <Layout /> : <Navigate to="/" />;
}

export default PrivateRoute;
