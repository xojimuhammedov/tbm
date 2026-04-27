import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createInternalInboundMbbSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    reg_num: z.string().nonempty(
      t("required {{field}}", {
        field: t("Registration number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    reg_date: z.string().nonempty(
      t("required {{field}}", {
        field: t("Registration date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    journal_index: z.string().nonempty(
      t("required {{field}}", {
        field: t("Journal index"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    recipient: z.string().nonempty(
      t("required {{field}}", {
        field: t("Recipient"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    summary: z.string().nonempty(
      t("required {{field}}", {
        field: t("Summary"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    order_id: z.string().optional().default(""),
    organization: z.string().nonempty(
      t("required {{field}}", {
        field: t("Organization"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    content: z.string().nonempty(
      t("required {{field}}", {
        field: t("Content"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type InternalInboundMbbDto = z.infer<
  ReturnType<typeof createInternalInboundMbbSchema>
>;
