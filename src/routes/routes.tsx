import { createBrowserRouter } from "react-router";
import { Calendar, Login } from "../pages";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/app",
    element: <PrivateRoute />,
    children: [
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
]);

export default router;
