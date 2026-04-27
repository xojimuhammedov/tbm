import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createInternalOutboundMbbSchema = (
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
    doc_num: z.string().optional().default(""),
    doc_date: z.string().optional().default(""),
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
    response_reference_number: z.string().optional().default(""),
    internal_inbound_id: z.string().optional().default(""),
    assignee: z.string().optional().default(""),
    deadline: z.string().optional().default(""),
    status: z.string().optional().default("in_progress"),
  });

export type InternalOutboundMbbDto = z.infer<
  ReturnType<typeof createInternalOutboundMbbSchema>
>;
