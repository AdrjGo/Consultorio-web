import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { getToken, Toast } from "@utils";
import { API_URL } from "@config";

type Props = {
  setOpenModal?: (open: boolean) => void;
  successMessage?: string;
  url: string | ((id: string) => string);
  queryKeyToInvalidate?: (string | number)[] | (string | number)[][];
};

function useDelete<T, R>({
  setOpenModal,
  successMessage,
  url,
  queryKeyToInvalidate,
}: Props) {
  const queryClient = useQueryClient();
  const invalidateRef = useRef(queryKeyToInvalidate);
  invalidateRef.current = queryKeyToInvalidate;

  const mutation = useMutation<R, Error, T>({
    mutationFn: async (data: T) => {
      const token = getToken();
      const resolvedUrl = typeof url === "function" ? url(data as string) : url;
      const res = await fetch(`${API_URL}/api/${resolvedUrl}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Error al procesar");
      return result;
    },
    onSuccess: (data: any) => {
      setOpenModal?.(false);
      Toast.success(data?.message ?? successMessage);
      const rawKeys = invalidateRef.current;
      if (rawKeys) {
        const keysList = Array.isArray(rawKeys[0])
          ? (rawKeys as (string | number)[][])
          : [rawKeys as (string | number)[]];
        keysList.forEach((key) =>
          queryClient.invalidateQueries({ queryKey: key }),
        );
      }
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