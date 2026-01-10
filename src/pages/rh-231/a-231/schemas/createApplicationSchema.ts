import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createApplicationSchema = (
    t: (...args: TranslationArgsType) => string,
) =>
    z.object({
        _id: z.string().optional(),

        title: z.string().nonempty(
            t("required {{field}}", {
                field: t("Title"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),

        status: z.string().nonempty(
            t("required {{field}}", {
                field: t("Status"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),

        rejected_at: z.string(),
        finished_at: z.string(),
        created_at: z.string(),
        dead_line: z.string(),

        to: z.string().nonempty(
            t("required {{field}}", {
                field: t("Recipient"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),

        content: z.string().nonempty(
            t("required {{field}}", {
                field: t("Content"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),

        graphNumber: z.string(),
        usedGraphPoints: z.string(),
        autoReservePrinciple: z.string(),
        usedHOTypeAndLink: z.string(),
        mainHoTrack: z.string(),
        mainInteractionNumber: z.string(),
        backupHoTrack: z.string(),
        switchingPoints: z.string(),
        backupInteractionNumber: z.string(),
        responsibleStation: z.string(),
        implementationTime: z.string(),
        aagOrder: z.string(),

        comment: z.string().optional(),
    });

export type ApplicationDto = z.infer<
    ReturnType<typeof createApplicationSchema>
>;
