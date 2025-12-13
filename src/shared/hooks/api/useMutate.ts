import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { Url, useApi } from "./useApi.ts";
import { MutateRequestMethod } from "../../enums/MutateRequestMethod.ts";
import { AxiosRequestConfig } from "axios";

interface MutateProps<TData> {
  url: Url[];
  baseUrl?: string[];
  method: MutateRequestMethod;
  config?: AxiosRequestConfig<TData>;
  options?: Omit<UseMutationOptions<TData>, "mutationFn" | "mutationKey">;
}

const useMutate = <TData = unknown>({
  url = [],
  baseUrl,
  method,
  options = {},
  config = {},
}: MutateProps<TData>) => {
  const { mutate } = useApi(url, baseUrl);
  const query = useMutation<TData, Error, AxiosRequestConfig["data"], unknown>({
    mutationKey: url,
    mutationFn: (data) =>
      mutate<TData>({ data, options: { ...config, method } }),
    ...options,
  });
  return { query };
};

export default useMutate;
