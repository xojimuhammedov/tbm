import { Url, useApi } from "./useApi.ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

interface GetOneProps<TData> {
  params?: Record<string, unknown>;
  url: Url[];
  queryKey?: Url[];
  baseUrl?: string[];
  options?: Omit<UseQueryOptions<TData>, "queryFn" | "queryKey">;
}

const useGetOne = <TData = unknown>({
  url = [],
  queryKey = [],
  baseUrl,
  params = {},
  options = {},
}: GetOneProps<TData>) => {
  const { get } = useApi([...url], baseUrl);

  return useQuery<TData>({
    queryKey: [...queryKey, ...url],
    queryFn: ({ signal }) => get<TData>({ params, options: { signal } }),
    retry: 0,
    ...options,
  });
};

export default useGetOne;
