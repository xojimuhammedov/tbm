import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

export const createFlowSchema = (t: (...args: TranslationArgsType) => string) =>
    z.object({
        flow_id: z.object({
            _id: z.string().optional(),
            code: z.string().nonempty(
                t("required {{field}}", {
                    field: t("Code"),
                    ns: config.LANG.NS.VALIDATION,
                }),
            ),
            signal_level: z.string().optional(),
        }),
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
        speed: z.string().nonempty(
            t("required {{field}}", {
                field: t("Speed"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        column1: z.string().optional(),
        outs_id: z.string().optional(),
        international: z.string().optional(),
        forward: z.string().optional(),
        reverse: z.string().optional(),
        start: z.string().optional(),
        end: z.string().optional(),
        consumer: z.string().optional(),
        order_number: z.string().optional(),
        interest_level: z.string().optional(),
        mt: z.string().optional(),
        protection_mode: z.string().optional(),
        sp: z.string().optional(),
        additional_information: z.string().optional(),
        payment_status: z.string().optional(),
        e1_name_in_vs: z.string().optional(),
        ms_name_in_vs: z.string().optional(),
    });

export type FlowDto = z.infer<ReturnType<typeof createFlowSchema>>;