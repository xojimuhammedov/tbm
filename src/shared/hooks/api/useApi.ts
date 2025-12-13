import { useCallback, useState } from "react";
import { AxiosError, AxiosRequestConfig, HttpStatusCode } from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.ts";
import { useToast } from "@/shared/hooks/useToast.ts";
import { useTranslation } from "react-i18next";
import { get as lodashGet } from "lodash";
import { useLoadingBar } from "react-top-loading-bar";
import { request } from "@/request.ts";

export type Url = string | number;

export interface RequestProps {
  options?: AxiosRequestConfig;
}

export interface GetProps extends RequestProps {
  params?: AxiosRequestConfig["params"];
}

export interface MutateProps extends RequestProps {
  data: AxiosRequestConfig["data"];
  url?: Url[];
}

export function useApi(url: Url[] = [], baseUrl = ["/api"]) {
  const { start, complete } = useLoadingBar({
    color: "var(--color-item-primary-primary)",
    height: 2,
  });
  const { setAccessToken } = useAuthStore();
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const catchError = useCallback(
    (err: AxiosError) => {
      if (err.response) {
        toast({
          variant: "destructive",
          title: t(`${lodashGet(err, "response.statusText", "Error")}`),
          description: t(
            `${lodashGet(err, "response.data.message", "An error occurred. Contact the administrator")}`,
          ),
        });

        if (err.response.status === HttpStatusCode.Unauthorized) {
          setAccessToken(null);
          navigate("/auth");
        }

        // if (err.response.status === HttpStatusCode.Forbidden) {
        //   navigate("/forbidden");
        // }
      }

      throw err;
    },
    [navigate, setAccessToken, t, toast],
  );

  const catchFinally = useCallback(() => {
    setLoading(false);
    complete();
  }, [complete]);

  const routeFormat = useCallback(
    (path: Url[] = []) => [...baseUrl, ...url, ...path].join("/"),
    [baseUrl, url],
  );

  const get = useCallback(
    async <TData>({ params, options }: GetProps) => {
      try {
        setLoading(true);
        const response = await request.get<TData>(routeFormat(), {
          ...options,
          params,
          onUploadProgress: () => {
            start();
          },
        });
        return response.data;
      } catch (err: unknown) {
        catchError(err as AxiosError);
        throw err;
      } finally {
        catchFinally();
      }
    },
    [catchError, catchFinally, routeFormat, start],
  );

  const mutate = useCallback(
    async <TData>({ data, options, url = [] }: MutateProps) => {
      try {
        setLoading(true);
        const response = await request<TData>(routeFormat(url), {
          ...options,
          data,
          onUploadProgress: () => {
            start();
          },
        });
        return response.data;
      } catch (err: unknown) {
        catchError(err as AxiosError);
        throw err;
      } finally {
        catchFinally();
      }
    },
    [catchError, catchFinally, routeFormat, start],
  );

  return {
    loading,
    get,
    mutate,
  };
}
