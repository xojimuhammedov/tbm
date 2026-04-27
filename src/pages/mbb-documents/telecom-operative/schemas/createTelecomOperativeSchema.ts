import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createTelecomOperativeSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    received_at: z.string().nonempty(
      t("required {{field}}", {
        field: t("Received at"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    transmitted_at: z.string().nonempty(
      t("required {{field}}", {
        field: t("Transmitted at"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    sender_address: z.string().nonempty(
      t("required {{field}}", {
        field: t("Sender address"),
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
    kodogram: z.object({
      status_index: z.string().optional().default(""),
      ko_number: z.string().optional().default(""),
      start_time: z.string().optional().default(""),
      end_time: z.string().optional().default(""),
    }),
    content_info: z.string().nonempty(
      t("required {{field}}", {
        field: t("Content info"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type TelecomOperativeDto = z.infer<
  ReturnType<typeof createTelecomOperativeSchema>
>;
