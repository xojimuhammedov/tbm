import React, { useEffect, useState } from "react";
import { useController, Control } from "react-hook-form";
import dayjs from "dayjs";

interface Props {
  control: Control<any>;
  name: string;
  label?: string;
}

export const MyDateTimePicker: React.FC<Props> = ({ control, name, label }) => {
  const { field } = useController({ name, control });
  const initialDate =
    field.value && dayjs(field.value).isValid()
      ? dayjs(field.value).format("YYYY-MM-DD")
      : "";
  const initialTime =
    field.value && dayjs(field.value).isValid()
      ? dayjs(field.value).format("HH:mm")
      : "09:00";
  const [datePart, setDatePart] = useState(initialDate);
  const [timePart, setTimePart] = useState(initialTime);
  useEffect(() => {
    if (datePart && datePart.length === 10) {
      const combined = dayjs(`${datePart} ${timePart}`);

      if (combined.isValid()) {
        field.onChange(combined.toISOString());
      }
    } else if (!datePart) {
      field.onChange(null);
    }
  }, [datePart, timePart]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex items-center gap-2 border rounded-md p-1 bg-white">
        <input
          type="date"
          value={datePart}
          onChange={(e) => setDatePart(e.target.value)}
          className="border-none outline-none text-sm"
        />
        <input
          type="time"
          value={timePart}
          onChange={(e) => setTimePart(e.target.value)}
          className="border-none outline-none text-sm"
        />
      </div>
    </div>
  );
};
