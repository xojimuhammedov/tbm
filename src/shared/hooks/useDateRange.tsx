import useQueryParams from "./useQueryParams.ts";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDateRangeStore } from "dgz-ui-shared/stores";
import { DateRange } from "react-day-picker";
import { get, isEqual } from "lodash";
import { dayjs } from "@/shared/utils/day.ts";
import { ISO_DATE } from "@/shared/constants/date.constants.ts";

type UseDateRangeProps = {
  key: string;
  format?: string;
  fromKey?: string;
  toKey?: string;
  excludeParams?: string[];
};

function useDateRange({ key, format = ISO_DATE, fromKey = "from", toKey = "to", excludeParams }: UseDateRangeProps) {
  const { params, handleSetParams } = useQueryParams({ dateRangeKey: key, fromKey, toKey, excludeParams, format });
  const { storedRanges, setStoredRange } = useDateRangeStore();
  const [range, setRange] = useState<DateRange | undefined>();

  const defaultRange = useMemo(() => {
    const fromParam = get(params, fromKey);
    const toParam = get(params, toKey);
    let newRange: DateRange | undefined;

    if (fromParam && toParam) {
      const parsedFrom = dayjs(fromParam as string, format);
      const parsedTo = dayjs(toParam as string, format);

      if (parsedFrom.isValid() && parsedTo.isValid()) {
        newRange = {
          from: parsedFrom
            .tz()
            .startOf("day")
            .toDate(),
          to: parsedTo
            .tz()
            .endOf("day")
            .toDate(),
        };
      }
    } 
    
    if (!newRange) {
      newRange = {
        from: dayjs.tz().subtract(2, "week").startOf("day").toDate(),
        to: dayjs.tz().endOf("day").toDate(),
      };
    }
    return newRange;
  }, [params, format, fromKey, toKey]);

  const handleRangeSelected = useCallback(
    (selected?: DateRange) => {
      handleSetParams({
        ...params,
        [fromKey]: selected?.from
          ? dayjs(selected.from).utc(true).format(format)
          : undefined,
        [toKey]: selected?.to
          ? dayjs(selected.to).utc(true).format(format)
          : undefined,
      });
      setRange(selected);
    },
    [handleSetParams, params, format, fromKey, toKey],
  );

  useEffect(() => {
    const tmpRange = isEqual(range, defaultRange) ? range : defaultRange;
    
    if (tmpRange !== range) {
      setRange(tmpRange);
    }

    if (tmpRange && key) {
      if (!isEqual(storedRanges[key], tmpRange)) {
        setStoredRange({ ...storedRanges, [key]: tmpRange });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultRange, key]);

  return {
    range,
    handleRangeSelected,
  };
}

export default useDateRange;
