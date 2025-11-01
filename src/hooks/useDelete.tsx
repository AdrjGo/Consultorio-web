import { useMutation } from "@tanstack/react-query";
import { getToken, Toast } from "@utils";

type Props<T> = {
  setOpenModal?: (open: boolean) => void;
  successMessage: string;
  url: string;
};

function useDelete<T, R>({ setOpenModal, successMessage, url }: Props<T>) {
  const mutation = useMutation<R, Error, T>({
    mutationFn: async (data: T) => {
      const token = getToken();
      const res = await fetch(`http://localhost:5252/api/${url}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error al procesar");
      return result;
    },
    onSuccess: () => {
      setOpenModal?.(false);
      Toast.success(successMessage);
    },
    onError: (error: any) => {
      Toast.error(error.message);
    },
  });

  return {
    deleteItem: mutation.mutate,
    isDeleting: mutation.isPending,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

export default useDelete;
