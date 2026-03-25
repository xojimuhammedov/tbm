import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createOutgoingSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    user_id: z.string().nonempty(
      t("required {{field}}", {
        field: t("User ID"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    registration_date: z.string().nonempty(
      t("required {{field}}", {
        field: t("Registration date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    summary: z.string().nonempty(
      t("required {{field}}", {
        field: t("Summary"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    doc_index: z.string().nonempty(
      t("required {{field}}", {
        field: t("Document index"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    recipient: z.string().nonempty(
      t("required {{field}}", {
        field: t("Recipient"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type OutgoingDto = z.infer<ReturnType<typeof createOutgoingSchema>>;
