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
    original_num: z.string().optional().default(""),
    original_date: z.string().optional().default(""),
    doc_num: z.string().optional().default(""),
    doc_date: z.string().optional().default(""),
    doc_type: z.string().optional().default(""),
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
    assignee: z.string().optional().default(""),
    resolution: z.string().optional().default(""),
    deadline: z.string().optional().default(""),
    status: z.string().optional().default("pending"),
    reply_order_date: z.string().optional().default(""),
  });

export type InternalInboundMbbDto = z.infer<
  ReturnType<typeof createInternalInboundMbbSchema>
>;
