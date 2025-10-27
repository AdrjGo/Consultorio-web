import { getData } from "@services";
import { useQuery } from "@tanstack/react-query";

type getProps<T> = {
  key: string;
  urlEndpoint: string;
  message: string;
};

function useGet<T>({ key, urlEndpoint, message }: getProps<T>) {
  const { isPending, isError, data, error } = useQuery<T>({
    queryKey: [key],
    queryFn: async () =>
      getData({
        url: urlEndpoint,
        message: message,
      }),
  });

  return { isPending, isError, data, error };
}

export default useGet;
