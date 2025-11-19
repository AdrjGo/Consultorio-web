import { getData } from "@services";
import { useQuery } from "@tanstack/react-query";

type getProps = {
  key: string | (string | number)[];
  urlEndpoint: string | any;
  message: string;
  enabled?: boolean;
  retry?: boolean;
};

function useGet<T>({ key, urlEndpoint, message, enabled, retry }: getProps) {
  const { isPending, isError, data, error } = useQuery<T>({
    queryKey: [key],
    queryFn: async () =>
      getData({
        url: urlEndpoint,
        message: message,
      }),
    enabled: enabled,
    retry: retry ?? false,
  });

  return { isPending, isError, data, error };
}

export default useGet;
