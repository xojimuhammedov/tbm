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
  const [datePart, setDatePart] = useState(
    field.value ? dayjs(field.value).format("YYYY-MM-DD") : "",
  );
  const [timePart, setTimePart] = useState(
    field.value ? dayjs(field.value).format("HH:mm") : "09:00",
  );
  useEffect(() => {
    if (datePart) {
      const combined = dayjs(`${datePart} ${timePart}`).toISOString();
      field.onChange(combined);
    }
  }, [datePart, timePart]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <div className="flex items-center gap-2 border rounded-md p-1 bg-white focus-within:ring-2 ring-blue-500">
        <input
          type="date"
          value={datePart}
          onChange={(e) => setDatePart(e.target.value)}
          className="border-none focus:ring-0 text-sm p-1 outline-none"
        />
        <div className="w-[1px] h-6 bg-gray-300" /> {/* Separator */}
        <input
          type="time"
          value={timePart}
          onChange={(e) => setTimePart(e.target.value)}
          className="border-none focus:ring-0 text-sm p-1 outline-none cursor-pointer"
        />
      </div>
    </div>
  );
};
