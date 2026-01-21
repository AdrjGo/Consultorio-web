import { Lock } from "lucide-react";

function NoPermission() {
  return (
    <div className="grid place-items-center mt-3 gap-2">
      <Lock className="size-10 dark:text-white" />
      <p className="text-normal font-extrabold text-primary dark:text-white">
        No tienes permisos para realizar esta acción
      </p>
    </div>
  );
}

export default NoPermission;
