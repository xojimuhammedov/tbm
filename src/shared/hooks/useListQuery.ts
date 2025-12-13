import { useEffect } from "react";
import { debounce, isEmpty } from "lodash";
import { Url } from "./api/useApi.ts";
import usePagination from "./api/usePagination.ts";

interface ListQueryProps {
  params?: Record<string, unknown>;
  url: Url[];
  baseUrl?: string[];
  queryKey?: Url[];
}

const useListQuery = <TData>({
  url,
  baseUrl,
  params,
  queryKey,
}: ListQueryProps) => {
  const query = usePagination<TData>({
    baseUrl,
    queryKey,
    url,
    params: { ...params },
    options: {
      enabled: false,
      retry: 0,
    },
  });

  useEffect(() => {
    if (!isEmpty(params) && !isEmpty(url)) {
      debounce(query.refetch, 100)();
    }
  }, [JSON.stringify(params), JSON.stringify(url)]);

  return {
    query,
  };
};

export default useListQuery;
