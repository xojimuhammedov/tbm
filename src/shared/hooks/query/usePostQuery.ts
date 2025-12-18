import { request } from "@/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { toast } from "react-toastify";

type PostQueryProps = {
  hideSuccessToast?: boolean;
  listKeyId?: string | null;
};

type PostRequestAttributes = Record<string, unknown>;

type PostRequestConfig = AxiosRequestConfig;

type PostVariables = {
  url: string | Array<string | number>;
  attributes: PostRequestAttributes;
  config?: PostRequestConfig;
};

type PostResponse = AxiosResponse<{ message?: string }>;

const API_PREFIX = "/api";

const normalizeUrl = (url: string | Array<string | number>) => {
  const segments = Array.isArray(url) ? url : [url];

  const normalized = segments
    .map((segment) => String(segment).replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);

  // agar allaqachon api bo‘lsa, qayta qo‘shmaymiz
  if (normalized[0] === "api") {
    return "/" + normalized.join("/");
  }

  return "/" + [API_PREFIX.replace(/^\/+|\/+$/g, ""), ...normalized].join("/");
};

const postRequest = (
  url: string | Array<string | number>,
  attributes: PostRequestAttributes,
  config: PostRequestConfig = {},
) => request.post<{ message?: string }>(normalizeUrl(url), attributes, config);

const usePostQuery = ({
  hideSuccessToast = false,
  listKeyId = null,
}: PostQueryProps) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isError, error } = useMutation<
    PostResponse,
    AxiosError,
    PostVariables
  >({
    mutationFn: ({ url, attributes, config = {} }: PostVariables) =>
      postRequest(url, attributes, config),
    onSuccess: (data: PostResponse) => {
      if (!hideSuccessToast) {
        toast.success(data?.data?.message || "SUCCESS");
      }
      if (listKeyId) {
        queryClient
          .invalidateQueries({ queryKey: [listKeyId] })
          .catch(() => undefined);
      }
    },
    onError: (err: AxiosError) => {
      console.error(err);
      toast.error("Request failed");
    },
  });

  return {
    postRequest,
    mutate,
    isLoading: isPending,
    isError,
    error,
  };
};

export default usePostQuery;
