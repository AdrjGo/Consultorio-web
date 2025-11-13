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
      const result = await res.json();
      console.log(result.message);
      if (!res.ok) throw new Error(result.message || "Error al procesar");
      return result;
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
