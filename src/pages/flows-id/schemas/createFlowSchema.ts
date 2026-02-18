import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

const orderSchema = z.object({
  _id: z.string().optional(),
  order_code: z.string().nonempty(),
  order_date: z.string().optional(),
  base_file: z.string().optional(),
});

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
        field: t("Point A Name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    name_point_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("Point B Name"),
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
    signal_level: z.string().nonempty(
      t("required {{field}}", {
        field: t("Signal Level"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    organization_order: z.array(z.any()).min(
      1,
      t("required {{field}}", {
        field: t("Organization Order"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    dissolution_order: z.array(orderSchema).default([]),
    status: z.enum(["active", "inactive"]).default("active").optional(),
    note: z.string().optional(),
    deciphering_order_number: z.string().optional(),
    deciphering_archive: z.string().optional(),
    organization_archive: z.string().optional(),
    base_file: z.string().optional(),
  });

export type FlowDto = z.infer<ReturnType<typeof createFlowSchema>>;
