import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Icons } from "@components/Icons/Icons";
import { Button, Input } from "@components/ui";
import { Toast } from "@utils";

const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email, error: "El email no es válido" }),
  password: z
    .string()
    .min(5, { error: "La contraseña debe tener al menos 5 caracteres" })
    .max(16, { error: "La contraseña debe tener menos de 16 caracteres" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const [onLoad, setOnLoad] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (data: LoginFormValues) => {
      const res = await fetch("http://localhost:5252/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Error al iniciar sesión");
      }

      document.cookie = "token=" + result.token;

      return result;
    },
    onSuccess: () => {
      setOnLoad(false);
      Toast.success("Sesión iniciada con éxito");
      navigate("/odis/calendar");
      localStorage.setItem("sidebar", "true");
    },
    onError: (error: any) => {
      Toast.error(error.message);
      setOnLoad(false);
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setOnLoad(true);
    mutation.mutate(data);
  };

  return (
    <main className="w-full flex justify-center items-center h-screen">
      <section className="bg-white grid place-items-center rounded-lg p-4 border border-gray-200">
        <div className="mb-6 grid place-items-center">
          <Icons.Logo className="size-36" />
          <h1 className="text-title font-extrabold text-primary">OdontoDIS</h1>
          <p className="font-extralight text-body text-secondary">
            Tu consultorio, más inteligente
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <Input
            forInput="email"
            type="email"
            label="Email"
            placeholder="correo@email.com"
            {...register("email")}
            errors={errors.email?.message}
          />
          <Input
            forInput="password"
            type="password"
            label="Contraseña"
            placeholder="••••••••"
            {...register("password")}
            errors={errors.password?.message}
          />
          <Button
            type="submit"
            children={onLoad ? "Iniciando sesión..." : "Iniciar sesión"}
            disabled={onLoad}
          />
          <div className="text-sm text-gray-400 mt-6">
            <p>Si olvidó su Contraseña, no se preocupe, puede recuperarla</p>
            <p>Contacte a soporte@odontodis.com para más información</p>
          </div>
        </form>
      </section>
    </main>
  );
}
export default Login;
