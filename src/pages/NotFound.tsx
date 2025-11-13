import { useNavigate } from "react-router";
import { Button } from "@components/ui";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 px-6">
      <h1 className="text-[150px] font-bold text-blue-500 leading-none">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Página no encontrada</h2>
      <p className="mt-2 text-gray-500 text-center max-w-md">
        Lo sentimos, la página que buscas no existe, no tienes permisos o se
        eliminó.
      </p>

      <Button
        children="Volver"
        onClick={() => navigate("/odis/calendar")}
        className="w-fit mt-8 px-8 py-3 bg-blue-500 text-white rounded-full text-lg hover:bg-blue-600 transition-colors"
      />
    </div>
  );
}
