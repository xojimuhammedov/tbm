import { Url, useApi } from "./useApi.ts";
import { AxiosRequestConfig } from "axios";
import { useCallback } from "react";
import { MutateRequestMethod } from "../../enums/MutateRequestMethod.ts";
import { useConfirm } from "dgz-ui-shared/hooks";

function useDelete<TData>(url: Url[] = [], baseUrl?: string[]) {
  const { mutate } = useApi(url, baseUrl);
  const { confirm } = useConfirm();

  const remove = useCallback(
    (id: Url, data?: AxiosRequestConfig["data"]) =>
      mutate<TData>({
        url: [id],
        data,
        options: { method: MutateRequestMethod.DELETE },
      }),
    [mutate],
  );

  const removeWithConfirm = useCallback(
    (id: string | number) => {
      return new Promise((resolve, reject) => {
        confirm({
          onConfirm: () => {
            remove(id).then(resolve).catch(reject);
          },
        });
      });
    },
    [remove, confirm],
  );

  return { remove, removeWithConfirm };
}

export default useDelete;
