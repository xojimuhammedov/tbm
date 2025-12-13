import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createF51Schema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    recipientIds: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Staffs"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    description: z.string().optional(),
    date: z.string().nonempty(
      t("required {{field}}", {
        field: t("Date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    minute: z.string().nonempty(
      t("required {{field}}", {
        field: t("Minute"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    channel_id: z.string().nonempty(
      t("required {{field}}", {
        field: t("Channel Code"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    noNumber: z.string().nonempty(
      t("required {{field}}", {
        field: t("NO number"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    teOeDesignation: z.string().nonempty(
      t("required {{field}}", {
        field: t("TE and OE designations"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    workArea: z.string().nonempty(
      t("required {{field}}", {
        field: t("Work area"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    rerouteSchedule: z.string().nonempty(
      t("required {{field}}", {
        field: t("Reroute schedule"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ubpZone: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("UBP zone"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    prophylaxisType: z.string().nonempty(
      t("required {{field}}", {
        field: t("Prophylaxis type"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    interestedUbp: z.string().nonempty(
      t("required {{field}}", {
        field: t("Interested UBP"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    note: z.string().optional().or(z.literal("")).optional(),
  });

export type F51Dto = z.infer<ReturnType<typeof createF51Schema>>;
