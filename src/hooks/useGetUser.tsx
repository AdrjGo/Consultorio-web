import { decodeToken, getData as get } from "@services";
import { useQuery } from "@tanstack/react-query";

function useGetUser() {
  const userId = decodeToken()?.userId;

  const { isPending, isError, data, error } = useQuery({
    queryKey: [userId],
    queryFn: async () =>
      get({
        url: `User/${userId}/data`,
        message: "Error al obtener usuario",
      }),
  });

  return { isPending, isError, data, error };
}

export default useGetUser;
