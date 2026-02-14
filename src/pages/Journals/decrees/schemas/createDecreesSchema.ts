import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createDecreesSchema = (
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

        prepared_by: z.string().nonempty(
            t("required {{field}}", {
                field: t("Prepared by"),
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

export type DecreesDto = z.infer<
    ReturnType<typeof createDecreesSchema>
>;
