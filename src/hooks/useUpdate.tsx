import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { getToken, Toast } from "@utils";

type Props = {
  setOpenModal?: (open: boolean) => void;
  successMessage?: string;
  url: string;
  method: "PUT" | "PATCH";
  queryKeyToInvalidate?: (string | number)[] | (string | number)[][];
};

function useUpdate<T, R>({
  method,
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
    update: mutation.mutate,
  };
}

export default useUpdate;