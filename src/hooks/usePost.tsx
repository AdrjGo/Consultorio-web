import { useMutation } from "@tanstack/react-query";
import { getToken, Toast } from "@utils";

type Props = {
  setOpenModal?: (open: boolean) => void;
  successMessage?: string;
  url: string;
};

function usePost<T, R>({ setOpenModal, successMessage, url }: Props) {
  const mutation = useMutation<R, Error, T>({
    mutationFn: async (data: T) => {
      const token = getToken();
      const res = await fetch(`http://localhost:5252/api/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      const payload = isJson ? await res.json() : await res.text();

      const message =
        typeof payload === "string"
          ? payload
          : (payload?.message ?? "Error al procesar");

      if (!res.ok) throw new Error(message);

      return (
        typeof payload === "string" ? ({ message: payload } as any) : payload
      ) as R;
    },
    onSuccess: (data: any) => {
      setOpenModal?.(false);
      Toast.success(data?.message ?? successMessage);
    },
    onError: (errors: any) => {
      Toast.error(errors.message);
    },
  });

  return {
    post: mutation.mutate,
  };
}

export default usePost;
