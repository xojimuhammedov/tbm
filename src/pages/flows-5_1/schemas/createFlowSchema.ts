import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

export const createFlowSchema = (t: (...args: TranslationArgsType) => string) =>
    z.object({
        flow_id: z.string().optional(),
        flow_code: z.string().nonempty(
            t("required {{field}}", {
                field: "ID ОУТС",
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        mux_a: z.string().nonempty(
            t("required {{field}}", {
                field: "Mux_A",
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        pa: z.string().nonempty(
            t("required {{field}}", {
                field: "пА",
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        final_ms_name: z.string().nonempty(
            t("required {{field}}", {
                field: "Name_MS_final",
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        signal_transmission_level: z.string().optional(),
        au4: z.string().optional(),
        ts: z.string().optional(),
        pb: z.string().optional(),
        mux_b: z.string().optional(),
        speed: z.string().optional(),
        column1: z.string().optional(),
        outs_id: z.string().optional(),
        international: z.string().optional(),
        forward: z.string().optional(),
        reverse: z.string().optional(),
        start: z.string().optional(),
        port_a: z.string().optional(),
        transit: z.string().optional(),
        port_b: z.string().optional(),
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