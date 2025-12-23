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
        field: t("Stream identifier"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("International stream number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("Forward stream interaction number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    link_N1: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reverse stream interaction number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),

    connection_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Connection number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    organization_order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Connection number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    deciphering_notes: z.string().nonempty(
      t("required {{field}}", {
        field: t("Connection number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    is_archived: z.string().nonempty(
      t("required {{field}}", {
        field: t("Connection number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    verification_status: z.string().nonempty(
      t("required {{field}}", {
        field: t("Connection number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type ChannelDto = z.infer<ReturnType<typeof createChannelSchema>>;
