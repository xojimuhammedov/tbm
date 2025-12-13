import { DEFAULT_DATE_RANGE_KEY } from "@/shared/constants/date.constants.ts";
import useDateRange from "@/shared/hooks/useDateRange.tsx";
import { memo } from "react";
import { DateRangePicker } from "dgz-ui-shared/components/datepicker";

type DateRangePickerProps = {
  dateKey?: string;
  format?: string;
};

const DateRangeFilter = ({
  dateKey = DEFAULT_DATE_RANGE_KEY,
  format,
}: DateRangePickerProps) => {
  const { range, handleRangeSelected } = useDateRange({ key: dateKey, format });
  return (
    <DateRangePicker
      selected={range}
      onRangeSelected={handleRangeSelected}
      format={format}
    />
  );
};

export default memo(DateRangeFilter);
