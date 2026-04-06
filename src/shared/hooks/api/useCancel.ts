import { Url, useApi } from "./useApi.ts";
import { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { MutateRequestMethod } from "../../enums/MutateRequestMethod.ts";
import { useConfirm } from "dgz-ui-shared/hooks";

const useCancel = <TData>(url: Url[] = [], baseUrl?: string[]) => {
  const { mutate } = useApi(url, baseUrl);
  const { confirm } = useConfirm();

  const cancel = useCallback(
    (id: Url, data?: AxiosRequestConfig["data"]) =>
      mutate<TData>({
        url: [id],
        data,
        options: { method: MutateRequestMethod.PATCH },
      }),
    [mutate],
  );

  const cancelWithConfirm = useCallback(
    (id: string | number, data?: AxiosRequestConfig["data"]) => {
      return new Promise((resolve, reject) => {
        confirm({
          onConfirm: () => {
            cancel(id, data).then(resolve).catch(reject);
          },
        });
      });
    },
    [cancel, confirm],
  );

  return {
    cancel,
    cancelWithConfirm,
  };
};

export default useCancel;
