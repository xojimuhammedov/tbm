import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { get, isNil } from "lodash";
import { useDateRangeStore } from "dgz-ui-shared/stores";
import { dayjs } from "@/shared/utils/day.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

type UseQueryParamsProps = {
  excludeParams?: string[];
  includeParams?: string[];
  dateRangeKey?: string;
  format?: string;
};

const useQueryParams = (props?: UseQueryParamsProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { storedRanges } = useDateRangeStore();

  const storedRange = useMemo(() => {
    const dateKey = props?.dateRangeKey;
    if (dateKey) {
      const range = storedRanges[dateKey];
      if (range) return range;
      return {
        from: dayjs.tz().subtract(2, 'week').startOf('day').toDate(),
        to: dayjs.tz().endOf('day').toDate(),
      };
    }
    return undefined;
  }, [props?.dateRangeKey, storedRanges]);

  const memoizedParams = useMemo(() => {
    const parsedParams: Record<string, string | string[]> = {};

    // Only inject stored range dates if they're not already in URL
    if (storedRange?.from && storedRange?.to) {
      const hasStartInUrl = searchParams.has('start');
      const hasEndInUrl = searchParams.has('end');

      if (!hasStartInUrl && !props?.excludeParams?.includes('start')) {
        parsedParams['start'] = dayjs(storedRange.from).utc(true).toISOString();
      }
      if (!hasEndInUrl && !props?.excludeParams?.includes('end')) {
        parsedParams['end'] = dayjs(storedRange.to).utc(true).toISOString();
      }
    }

    searchParams.forEach((value, key) => {
      if (props?.excludeParams?.includes(key)) return;
      if (props?.includeParams && !props.includeParams.includes(key)) return;

      const values = searchParams.getAll(key);
      parsedParams[key] = values.length > 1 ? values : value;
    });

    return parsedParams;
  }, [searchParams, props?.excludeParams, props?.includeParams, storedRange]);

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
