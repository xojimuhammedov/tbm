import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

export const createFlowSchema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    code: z.string().nonempty(
      t("required {{field}}", {
        field: t("Column 1"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    name_point_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("Consumer ID point A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    name_point_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("International"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    // point_a: z.string().nonempty(
    //   t("required {{field}}", {
    //     field: t("Forward"),
    //     ns: config.LANG.NS.VALIDATION,
    //   }),
    // ),
    // point_b: z.string().nonempty(
    //   t("required {{field}}", {
    //     field: t("Reverse"),
    //     ns: config.LANG.NS.VALIDATION,
    //   }),
    // ),
    signal_level: z.string().nonempty(
      t("required {{field}}", {
        field: t("Start"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    organization_order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Port A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    deciphering_order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("MUX A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    note: z.string().nonempty(
      t("required {{field}}", {
        field: t("PA"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    deciphering_archive: z.string().nonempty(
      t("required {{field}}", {
        field: t("Final MS name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    organization_archive: z.string().nonempty(
      t("required {{field}}", {
        field: t("Signal transmission level"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type FlowDto = z.infer<ReturnType<typeof createFlowSchema>>;
