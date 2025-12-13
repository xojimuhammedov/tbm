import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { get, isNil } from "lodash";
import { useDateRangeStore } from "dgz-ui-shared/stores";
import { dayjs } from "@/shared/utils/day.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

type UseQueryParamsProps = {
  excludeParams?: string[];
  dateRangeKey?: string;
  format?: string;
};

const useQueryParams = (props?: UseQueryParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { storedRanges } = useDateRangeStore();

  const memoizedParams = useMemo(() => {
    const parsedParams: Record<string, string | string[]> = {};

    if (props?.dateRangeKey) {
      const storedRange = storedRanges[props.dateRangeKey];
      if (storedRange?.from && storedRange?.to) {
        parsedParams["from"] = dayjs(storedRange.from)
          .utc(true)
          .format(props?.format ?? DATE);
        parsedParams["to"] = dayjs(storedRange.to)
          .utc(true)
          .format(props?.format ?? DATE);
      }
    }

    searchParams.forEach((value, key) => {
      if (props?.excludeParams?.includes(key)) return;
      const values = searchParams.getAll(key);
      parsedParams[key] = values.length > 1 ? values : value;
    });

    return parsedParams;
  }, [
    searchParams,
    props?.excludeParams,
    props?.dateRangeKey,
    JSON.stringify(get(storedRanges, props?.dateRangeKey ?? "", "")),
  ]);

  const handleSetParams = useCallback(
    (data: Record<string, unknown>) => {
      const newParams = new URLSearchParams();
      Object.entries(data).forEach(([key, value]) => {
        if (isNil(value)) {
          newParams.delete(key);
        } else if (Array.isArray(value)) {
          value.forEach((v) => newParams.append(key, String(v)));
        } else {
          newParams.set(key, String(value));
        }
      });

      setSearchParams(newParams, { replace: true });
    },
    [setSearchParams],
  );

  return {
    params: memoizedParams,
    handleSetParams,
  };
};

export default useQueryParams;
