import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createNotifySchema = (
    t: (...args: TranslationArgsType) => string,
) =>
    z.object({
        registration_date: z.string().nonempty(
            t("required {{field}}", {
                field: t("Registration date"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        summary: z.string().nonempty(
            t("required {{field}}", {
                field: t("Summary"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        nomenclature_number: z.coerce.number({
            required_error: t("required {{field}}", {
                field: t("Nomenclature number"),
                ns: config.LANG.NS.VALIDATION,
            }),
            invalid_type_error: t("must be a number"),
        }),

        doc_recipient: z.string().nonempty(
            t("required {{field}}", {
                field: t("Document recipient"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),

        signed_by: z.string().nonempty(
            t("required {{field}}", {
                field: t("Signed by"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
    });

export type NotifyDto = z.infer<ReturnType<typeof createNotifySchema>>;