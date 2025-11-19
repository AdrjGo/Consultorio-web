import { createBrowserRouter } from "react-router";
import { Calendar, Config, Login, NotFound, PatientProfile, Patients, UserManagement } from "../pages";
import PrivateRoute from "./PrivateRoute";
// import Layout from "../components/layout";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/odis",
    element: <PrivateRoute />,
    children: [
      {
        // element: <Layout />,
        children: [
          {
            path: "calendar",
            element: <Calendar tab="Calendario" />,
          },
          {
            path: "patients",
            element: <Patients tab="Pacientes" />,
            children: [
              {
                path: "patient-profile/:id",
                element: <PatientProfile />,
              },
            ],
          },
          {
            path: "user-management",
            element: <UserManagement tab="Gestión de Usuarios" />,
          },
          {
            path: "settings",
            element: <Config tab="Configuración" />,
          },
          // { path: "patient-profile/:id", element: <PatientProfile /> },
          { path: "*", element: <NotFound /> },
        ],
      },
    ],
  },
]);

export default router;
