import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createLocalOutboundSchema = (
    t: (...args: TranslationArgsType) => string,
) =>
    z.object({
        reg_num: z.string().nonempty(
            t("required {{field}}", {
                field: t("Reg. №"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        reg_date: z.string().nonempty(
            t("required {{field}}", {
                field: t("Sana"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        journal_index: z.string().nonempty(
            t("required {{field}}", {
                field: t("Jurnal indeksi"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        recipient_address: z.string().nonempty(
            t("required {{field}}", {
                field: t("Qabul qiluvchi"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        summary: z.string().nonempty(
            t("required {{field}}", {
                field: t("Qisqacha mazmun"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        notes: z.string().optional(),
    });

export type LocalOutboundDto = z.infer<ReturnType<typeof createLocalOutboundSchema>>;