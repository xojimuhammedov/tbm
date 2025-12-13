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

const API_PREFIX = import.meta.env.VITE_BASE_URL;

const normalizeUrl = (url: string | Array<string | number>) => {
  if (Array.isArray(url)) {
    return [API_PREFIX, ...url]
      .map((segment) => String(segment).replace(/^\/+/, "").replace(/\/+$/, ""))
      .join("/")
      .replace(/\/{2,}/g, "/");
  }
  return url;
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
