import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createOperativeSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    title: z.string().nonempty(
      t("required {{field}}", {
        field: t("Document title"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    files: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Files"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    recipientIds: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Staffs"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    description: z.string().optional(),
    UbpNumber: z.string().nonempty(
      t("required {{field}}", {
        field: t("UBP number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    applicationNumber: z.string().nonempty(
      t("required {{field}}", {
        field: t("Application number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    workConditions: z.string().nonempty(
      t("required {{field}}", {
        field: t("Work conditions"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    date: z.string().nonempty(
      t("required {{field}}", {
        field: t("UBP number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    magistralName: z.string().nonempty(
      t("required {{field}}", {
        field: t("UBP number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    NoNumber: z.string().nonempty(
      t("required {{field}}", {
        field: t("UBP number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ai9Channels: z.string().nonempty(
      t("required {{field}}", {
        field: t("UBP number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    reasonJob: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reason Job"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    jobDescription: z.string().nonempty(
      t("required {{field}}", {
        field: t("Job description"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    NOStatus: z.string().nonempty(
      t("required {{field}}", {
        field: t("NO status"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    aag: z.string().nonempty(
      t("required {{field}}", {
        field: t("AAG"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    reservation: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reservation"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    responsiblePerson: z.string().nonempty(
      t("required {{field}}", {
        field: t("UBP number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    headOfTheEnterprise: z.string().nonempty(
      t("required {{field}}", {
        field: t("Head of the enterprise"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    aiFullName: z.string().nonempty(
      t("required {{field}}", {
        field: t("AI-9 full name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    applicantAP: z.string().nonempty(
      t("required {{field}}", {
        field: t("Applicant AP"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    applicantUBP: z.string().nonempty(
      t("required {{field}}", {
        field: t("Applicant UBP"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type OperativeDto = z.infer<ReturnType<typeof createOperativeSchema>>;
