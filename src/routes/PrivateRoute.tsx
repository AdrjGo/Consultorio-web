import { Navigate } from "react-router";

type Props = {
  children: React.ReactNode;
};

function PrivateRoute({ children }: Props) {
  const isAuth = document.cookie.includes("token");
  return isAuth ? children : <Navigate to="/" />;
}

export default PrivateRoute;
