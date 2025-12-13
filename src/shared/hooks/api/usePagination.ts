import { Url, useApi } from "./useApi.ts";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaginationInterface } from "@/shared/interfaces/pagination.interface.ts";

interface PaginationProps<TData> {
  params?: Record<string, unknown>;
  queryKey?: Url[];
  baseUrl?: string[];
  url: Url[];
  options?: Omit<
    UseQueryOptions<PaginationInterface<TData>>,
    "queryFn" | "queryKey"
  >;
}

const usePagination = <TData = unknown>({
  url = [],
  queryKey = [],
  baseUrl,
  params = {},
  options = {},
}: PaginationProps<TData>) => {
  const { get } = useApi(url, baseUrl);

  return useQuery<PaginationInterface<TData>>({
    queryKey: [...queryKey, ...url],
    queryFn: ({ signal }) =>
      get<PaginationInterface<TData>>({ params, options: { signal } }),
    retry: 0,
    ...options,
  });
};

export default usePagination;
