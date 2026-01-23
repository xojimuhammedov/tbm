import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dayjs } from "@/shared/utils/day.ts";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { Option } from "dgz-ui/form";
import i18n from "i18next";

import "dayjs/locale/uz-latn";
import "dayjs/locale/ru";
import "dayjs/locale/en";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const dateFormatter = (
    date?: Date | number | string,
    format = DATE_TIME,
    locale?: string
) => {
  if (!date) return "";

  const currentLang = locale || i18n.language || "uz";

  const localeMap: Record<string, string> = {
    uz: "uz-latn",
    ru: "ru",
    en: "en",
  };

  const targetLocale = localeMap[currentLang] || "uz-latn";
  let finalFormat = format;

  if (currentLang === "ru") {
    finalFormat = format.replace("-yil", " [г.]").replace("yil", "[г.]");
  } else if (currentLang === "en") {
    finalFormat = format.replace("-yil", " [year]").replace("yil", "[year]");
  } else if (currentLang === "uz") {
    finalFormat = format.replace("yil", "[yil]");
  }
  const formattedDate = dayjs(date).locale(targetLocale).format(finalFormat);
  if (currentLang === "uz" || currentLang === "ru") {
    return formattedDate.toLowerCase();
  }

  return formattedDate;
};

export const createOptions = (
    arg: Record<string, string>,
    t: (...args: TranslationArgsType) => string
): Option[] => {
  return Object.entries(arg).map(([key, value]) => ({
    value,
    label: t(key),
  }));
};

export const isHttpsPhoto = (photoUrl: string) => {
  if (!photoUrl) return false;
  return photoUrl.toLowerCase().startsWith("https://");
};