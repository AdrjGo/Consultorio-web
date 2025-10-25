import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import router from "./routes/routes";
import { Toast } from "./components/feedback";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toast />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
