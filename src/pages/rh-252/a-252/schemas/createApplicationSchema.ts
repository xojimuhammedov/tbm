import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    applicationNumber: z.string().nonempty(
      t("required {{field}}", {
        field: t("Application number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    workProcedure: z.string().nonempty(
      t("required {{field}}", {
        field: t("Work conditions"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    workDateTime: z.string().nonempty(
      t("required {{field}}", {
        field: t("Date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    station: z.string().nonempty(
      t("required {{field}}", {
        field: t("Magistral name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    noNumber: z.string().nonempty(
      t("required {{field}}", {
        field: t("NO number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    aiChannels: z.string().nonempty(
      t("required {{field}}", {
        field: t("AI-9 channels"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    workReason: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reason Job"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    workDescription: z.string().nonempty(
      t("required {{field}}", {
        field: t("Job description"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    koStatus: z.string().nonempty(
      t("required {{field}}", {
        field: t("NO status"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    bypassSchedule: z.string().nonempty(
      t("required {{field}}", {
        field: t("AAG"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    alternativeBackup: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reservation"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    responsiblePerson: z.string().nonempty(
      t("required {{field}}", {
        field: t("Responsible person"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    approvedByTechnicalDirector: z.string().nonempty(
      t("required {{field}}", {
        field: t("Head of the enterprise"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    approvedByLocalAI: z.string().nonempty(
      t("required {{field}}", {
        field: t("AI-9 full name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    orderAP: z.string().nonempty(
      t("required {{field}}", {
        field: t("Applicant AP"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    orderMBB: z.string().nonempty(
      t("required {{field}}", {
        field: t("Applicant UBP"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    recipientIds: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Staffs"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type ApplicationDto = z.infer<
  ReturnType<typeof createApplicationSchema>
>;
