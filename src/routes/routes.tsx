import { createBrowserRouter, Outlet } from "react-router";
import { Calendar, Login, NotFound, Patients } from "../pages";
import PrivateRoute from "./PrivateRoute";
import Layout from "../components/layout";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/odis",
    element: (
      <PrivateRoute>
        <Layout>
          <Outlet />
        </Layout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "patients",
        element: <Patients />,
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
