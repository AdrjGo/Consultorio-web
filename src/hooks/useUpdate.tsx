import { useMutation } from "@tanstack/react-query";
import { getToken, Toast } from "@utils";

type Props = {
  setOpenModal?: (open: boolean) => void;
  successMessage: string;
  url: string;
  method: "PUT" | "PATCH";
};

function useUpdate<T, R>({
  method,
  setOpenModal,
  successMessage,
  url,
}: Props) {
  const mutation = useMutation<R, Error, T>({
    mutationFn: async (data: T) => {
      const token = getToken();
      const res = await fetch(`http://localhost:5252/api/${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      console.log(result.message);
      if (!res.ok) throw new Error(result.message || "Error al procesar");
      return result;
    },
    onSuccess: (data: any) => {
      setOpenModal?.(false);
      Toast.success(data?.message ?? successMessage);
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
  });

  return {
    update: mutation.mutate,
  };
}

export default useUpdate;
