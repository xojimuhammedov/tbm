import { request } from "@/request";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface Callbacks<T = unknown> {
  success?: (data: T) => void;
  fail?: () => void;
}

interface UseGetAllQueryOptions<T = unknown> {
  key?: string;
  url?: string;
  params?: Record<string, any>;
  hideErrorMsg?: boolean;
  enabled?: boolean;
  headers?: Record<string, any>;
  cb?: Callbacks<T>;
  staleTime?: number;
}

const useGetAllQuery = <T = unknown>({
  key = "get-all",
  url = "/",
  params = {},
  hideErrorMsg = false,
  enabled = true,
  headers = {},
  cb = {
    success: () => {},
    fail: () => {},
  },
  staleTime = 0, // Default bo‘yicha 5 minut
}: UseGetAllQueryOptions<T>) => {
  const query = useQuery<T>({
    queryKey: [key, JSON.stringify(params)],
    queryFn: async () => {
      const res = await request.get<T>(url, { params, headers });
      return res.data;
    },
    enabled,
    staleTime,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      cb?.success?.(query.data);
    }
  }, [query.isSuccess, query.data, cb]);

  useEffect(() => {
    if (query.isError && query.error) {
      cb?.fail?.();
      if (!hideErrorMsg) {
        const error = query.error as {
          response?: { data?: { message?: string } };
          message?: string;
        };
        const msg =
          error?.response?.data?.message ||
          error.message ||
          `${url} api not working`;
        toast.error(`ERROR!!! ${msg}`);
      }
    }
  }, [query.isError, query.error, hideErrorMsg, url, cb]);

  return query;
};

export default useGetAllQuery;
