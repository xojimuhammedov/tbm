import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dayjs } from "@/shared/utils/day.ts";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { Option } from "dgz-ui/form";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateFormatter = (
  date?: Date | number | string,
  format = DATE_TIME,
) => (date ? dayjs.tz(date).format(format) : "");

export const createOptions = (
  arg: Record<string, string>,
  t: (...args: TranslationArgsType) => string,
): Option[] => {
  return Object.entries(arg).map(([key, value]) => ({
    value,
    label: t(key),
  }));
};

export const isHttpsPhoto = (photoUrl: string) => {
  if (!photoUrl) {
    return false;
  }

  return photoUrl.toLowerCase().startsWith("https://");
};
