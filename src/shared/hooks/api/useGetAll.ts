import { Url, useApi } from "./useApi.ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface GetAllProps<TData> {
  params?: Record<string, unknown>;
  url: Url[];
  queryKey?: Url[];
  options?: Omit<UseQueryOptions<TData[]>, "queryFn" | "queryKey">;
}

const useGetAll = <TData = unknown>({
  url = [],
  queryKey = [],
  params = {},
  options = {},
}: GetAllProps<TData>) => {
  const { get } = useApi(url);

  return useQuery<TData[]>({
    queryKey: [...queryKey, ...url],
    queryFn: ({ signal }) => get<TData[]>({ params, options: { signal } }),
    retry: 0,
    ...options,
  });
};

export default useGetAll;
