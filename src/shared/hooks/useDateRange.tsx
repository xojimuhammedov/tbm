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
};

function useDateRange({ key, format = ISO_DATE }: UseDateRangeProps) {
  const { params, handleSetParams } = useQueryParams({ dateRangeKey: key });
  const { storedRanges, setStoredRange } = useDateRangeStore();
  const [range, setRange] = useState<DateRange | undefined>();

  const defaultRange = useMemo(() => {
    const fromParam = get(params, "from");
    const toParam = get(params, "to");
    let newRange: DateRange | undefined;

    if (fromParam && toParam) {
      newRange = {
        from: dayjs(fromParam as string, format)
          .tz()
          .startOf("day")
          .toDate(),
        to: dayjs(toParam as string, format)
          .tz()
          .endOf("day")
          .toDate(),
      };
    } else {
      newRange = {
        from: dayjs.tz().subtract(2, "week").startOf("day").toDate(),
        to: dayjs.tz().endOf("day").toDate(),
      };
    }
    return newRange;
  }, [params, format]);

  const handleRangeSelected = useCallback(
    (selected?: DateRange) => {
      handleSetParams({
        ...params,
        from: selected?.from
          ? dayjs(selected.from).utc(true).format(format)
          : undefined,
        to: selected?.to
          ? dayjs(selected.to).utc(true).format(format)
          : undefined,
      });
      setRange(selected);
    },
    [handleSetParams, params, format],
  );

  useEffect(() => {
    setRange((prevRange) => {
      const tmpRange = isEqual(prevRange, defaultRange)
        ? prevRange
        : defaultRange;

      if (tmpRange && key) {
        if (key) {
          setStoredRange({ ...storedRanges, [key]: tmpRange });
        }
      }

      return tmpRange;
    });
  }, [defaultRange, key]);

  return {
    range,
    handleRangeSelected,
  };
}

export default useDateRange;
