import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createCardIndexSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    code: z.string().nonempty(
      t("required {{field}}", {
        field: t("Code"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    verification: z.string().nonempty(
      t("required {{field}}", {
        field: t("Verification"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    consumer: z.string().nonempty(
      t("required {{field}}", {
        field: t("Consumer"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    zone2: z.string().nonempty(
      t("required {{field}}", {
        field: t("Zone 2"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    track: z.string().nonempty(
      t("required {{field}}", {
        field: t("Track"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    id: z.string().nonempty(
      t("required {{field}}", {
        field: t("ID"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    international: z.string().nonempty(
      t("required {{field}}", {
        field: t("International"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    start: z.string().nonempty(
      t("required {{field}}", {
        field: t("Start"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    end: z.string().nonempty(
      t("required {{field}}", {
        field: t("End"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    signal_level: z.string().nonempty(
      t("required {{field}}", {
        field: t("Signal level"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    order_number_for_stream: z.string().nonempty(
      t("required {{field}}", {
        field: t("Order number for stream"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type CardIndexDto = z.infer<ReturnType<typeof createCardIndexSchema>>;
