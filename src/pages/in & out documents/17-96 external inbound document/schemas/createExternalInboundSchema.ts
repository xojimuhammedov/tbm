import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createExternalInboundSchema = (
    t: (...args: TranslationArgsType) => string,
) =>
    z.object({
        reg_num: z.string().nonempty(
            t("required {{field}}", {
                field: t("Registration number"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        reg_date: z.string().nonempty(
            t("required {{field}}", {
                field: t("Registration date"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        journal_index: z.string().nonempty(
            t("required {{field}}", {
                field: t("Journal index"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        reception_num: z.string().nonempty(
            t("required {{field}}", {
                field: t("Reception number"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        reception_date: z.string().nonempty(
            t("required {{field}}", {
                field: t("Reception date"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        original_num: z.string().nonempty(
            t("required {{field}}", {
                field: t("Original number"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        original_date: z.string().nonempty(
            t("required {{field}}", {
                field: t("Original date"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        doc_type: z.string().nonempty(
            t("required {{field}}", {
                field: t("Document type"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        organization: z.string().nonempty(
            t("required {{field}}", {
                field: t("Organization"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        content: z.string().nonempty(
            t("required {{field}}", {
                field: t("Content"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        assignee: z.string().nonempty(
            t("required {{field}}", {
                field: t("Assignee"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        resolution: z.string().nonempty(
            t("required {{field}}", {
                field: t("Resolution"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        deadline: z.string().nonempty(
            t("required {{field}}", {
                field: t("Deadline"),
                ns: config.LANG.NS.VALIDATION,
            }),
        ),
        status: z.enum(["pending", "completed", "in_process", "rejected"], {
            required_error: t("required {{field}}", {
                field: t("Status"),
                ns: config.LANG.NS.VALIDATION,
            }),
        }),
        reply_order_date: z.string().nullable().optional(),
    });

export type ExternalInboundDto = z.infer<ReturnType<typeof createExternalInboundSchema>>;