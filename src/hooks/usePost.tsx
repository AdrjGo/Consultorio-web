import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { getToken, Toast } from "@utils";

type Props = {
  setOpenModal?: (open: boolean) => void;
  successMessage?: string;
  url: string;
  queryKeyToInvalidate?: (string | number)[] | (string | number)[][];
};

function usePost<T, R>({
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
    onError: (errors: any) => {
      Toast.error(errors.message);
    },
  });

  return {
    post: mutation.mutate,
  };
}

export default usePost;