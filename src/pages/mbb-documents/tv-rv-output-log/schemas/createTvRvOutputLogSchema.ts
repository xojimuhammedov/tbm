import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createTvRvOutputLogSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    record_date: z.string().nonempty(
      t("required {{field}}", {
        field: t("Record date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    output_type: z.string().nonempty(
      t("required {{field}}", {
        field: t("Output type"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    tv_output_section: z.string().nonempty(
      t("required {{field}}", {
        field: t("Output section"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    planned_time: z.string().nonempty(
      t("required {{field}}", {
        field: t("Planned time"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    actual_time: z.string().nonempty(
      t("required {{field}}", {
        field: t("Actual time"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    recipient_address: z.string().nonempty(
      t("required {{field}}", {
        field: t("Recipient address"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    transferred_to: z.string().nonempty(
      t("required {{field}}", {
        field: t("Transferred to"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    tv_output_result: z.string().nonempty(
      t("required {{field}}", {
        field: t("Output result"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    signed_by: z.object({
      full_name: z.string().nonempty(
        t("required {{field}}", {
          field: t("Full name"),
          ns: config.LANG.NS.VALIDATION,
        }),
      ),
      signature: z.string().optional().default(""),
    }),
  });

export type TvRvOutputLogDto = z.infer<
  ReturnType<typeof createTvRvOutputLogSchema>
>;
