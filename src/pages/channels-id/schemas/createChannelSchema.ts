import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createChannelSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    code: z.string().nonempty(
      t("required {{field}}", {
        field: t("Code"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    consumer_name: z.string().nonempty(
      t("required {{field}}", {
        field: t("Consumer name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("Point A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("Point B"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    link_N1: z.string().nonempty(
      t("required {{field}}", {
        field: t("Link N1"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    organization_order: z.string().nonempty(
      t("required {{field}}", {
        field: t("Organization order"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    organization_order_date: z.string().nonempty(
      t("required {{field}}", {
        field: t("Order date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    dissolution_order: z.string().nullable().optional(),
    dissolution_order_date: z.string().nullable().optional(),
    status: z.string().default("active"),
    connection_number: z.string().optional(),
    deciphering_notes: z.string().optional(),
    is_archived: z.string().optional(),
    verification_status: z.string().optional(),
  });

export type ChannelDto = z.infer<ReturnType<typeof createChannelSchema>>;
