import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createExternalOutboundSchema = (
    t: (...args: TranslationArgsType) => string,
) =>
    z.object({
        reg_num: z.string().nonempty(
            t("required {{field}}", {
                field: t("Tartib raqami"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        reg_date: z.string().nonempty(
            t("required {{field}}", {
                field: t("Sana"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        external_out_doc_number: z.string().nonempty(
            t("required {{field}}", {
                field: t("Tashqi chiquvchi hujjat raqami"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        recipient: z.string().nonempty(
            t("required {{field}}", {
                field: t("Jo‘natilayotgan tashkilot (korxona)"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        summary: z.string().nonempty(
            t("required {{field}}", {
                field: t("Qisqa mazmuni"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        response_reference_number: z.string().nullable().optional(),
        external_inbound_id: z.string().optional(),
    });

export type ExternalOutboundDto = z.infer<ReturnType<typeof createExternalOutboundSchema>>;