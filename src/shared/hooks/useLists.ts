import { useMemo } from "react";
import { DEFAULT_PARAMS } from "../constants/page.constants.ts";
import { Url } from "./api/useApi.ts";
import useListQuery from "./useListQuery.ts";
import useQueryParams from "./useQueryParams.ts";

type UseListParams = {
  url: Url[];
  queryKey?: Url[];
  baseUrl?: string[];
  defaultParams?: Record<string, unknown>;
  dateRangeKey?: string;
  excludeParams?: string[];
  fromKey?: string;
  toKey?: string;
};

const useLists = <TData>({
  url = [],
  queryKey = [],
  baseUrl,
  defaultParams,
  dateRangeKey,
  excludeParams = [],
  fromKey,
  toKey,
}: UseListParams) => {
  const { params: queryParams, handleSetParams } = useQueryParams({
    dateRangeKey,
    excludeParams,
    fromKey,
    toKey,
  });

  const combinedUrl = useMemo(() => [...url], [url]);

  const params = useMemo(
    () => ({
      ...DEFAULT_PARAMS,
      ...defaultParams,
      ...queryParams,
    }),
    [defaultParams, queryParams],
  );

  const { query } = useListQuery<TData>({
    baseUrl,
    queryKey,
    url: combinedUrl,
    params,
  });

  return {
    query,
    params,
    handleFilter: handleSetParams,
  };
};

export default useLists;
