import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

export const createFlowSchema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    code: z.string().nonempty(
      t("required {{field}}", {
        field: t("Code"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    column1: z.string().nonempty(
      t("required {{field}}", {
        field: t("Column 1"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    outs_id: z.string().nonempty(
      t("required {{field}}", {
        field: t("Outs id"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    international: z.string().nonempty(
      t("required {{field}}", {
        field: t("International"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    forward: z.string().nonempty(
      t("required {{field}}", {
        field: t("Forward"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    reverse: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reverse"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    start: z.string().nonempty(
      t("required {{field}}", {
        field: t("Start"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    port_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("Port A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    mux_a: z.string().nonempty(
      t("required {{field}}", {
        field: t("MUX A"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    pa: z.string().nonempty(
      t("required {{field}}", {
        field: t("PA"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    final_ms_name: z.string().nonempty(
      t("required {{field}}", {
        field: t("Final MS name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    signal_transmission_level: z.string().nonempty(
      t("required {{field}}", {
        field: t("Signal transmission level"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    au4: z.string().nonempty(
      t("required {{field}}", {
        field: t("AU4"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ts: z.string().nonempty(
      t("required {{field}}", {
        field: t("TS"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    pb: z.string().nonempty(
      t("required {{field}}", {
        field: t("PB"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    transit: z.string().nonempty(
      t("required {{field}}", {
        field: t("Transit"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    mux_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("MUX B"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    port_b: z.string().nonempty(
      t("required {{field}}", {
        field: t("Port B"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    end: z.string().nonempty(
      t("required {{field}}", {
        field: t("End"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    consumer: z.string().nonempty(
      t("required {{field}}", {
        field: t("Consumer"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    order_number: z.string().nonempty(
      t("required {{field}}", {
        field: t("Order number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    interest_level: z.string().nonempty(
      t("required {{field}}", {
        field: t("Interest level"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    mt: z.string().nonempty(
      t("required {{field}}", {
        field: t("MT"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    speed: z.string().nonempty(
      t("required {{field}}", {
        field: t("Speed"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    protection_mode: z.string().nonempty(
      t("required {{field}}", {
        field: t("Protection mode"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    sp: z.string().nonempty(
      t("required {{field}}", {
        field: t("SP"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    additional_information: z.string().nonempty(
      t("required {{field}}", {
        field: t("Additional information"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    payment_status: z.string().nonempty(
      t("required {{field}}", {
        field: t("Payment status"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    e1_name_in_vs: z.string().nonempty(
      t("required {{field}}", {
        field: t("E1 name in VS"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ms_name_in_vs: z.string().nonempty(
      t("required {{field}}", {
        field: t("MS name in VS"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type FlowDto = z.infer<ReturnType<typeof createFlowSchema>>;
