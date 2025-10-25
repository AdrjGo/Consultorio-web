import { createBrowserRouter } from "react-router";
import { Calendar, Login, NotFound, Patients } from "../pages";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/layout";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/odis",
    element: <PrivateRoute />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            path: "calendar",
            element: <Calendar title="Calendario" />,
          },
          {
            path: "patients",
            element: <Patients title="Pacientes" />,
          },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default router;
