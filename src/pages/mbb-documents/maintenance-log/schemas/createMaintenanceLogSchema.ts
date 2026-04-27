import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createMaintenanceLogSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    scheduled_at: z.string().nonempty(
      t("required {{field}}", { field: t("Scheduled at"), ns: config.LANG.NS.VALIDATION }),
    ),
    actual_at: z.string().nonempty(
      t("required {{field}}", { field: t("Actual at"), ns: config.LANG.NS.VALIDATION }),
    ),
    actual_duration: z.coerce.number().min(0,
      t("required {{field}}", { field: t("Actual duration"), ns: config.LANG.NS.VALIDATION }),
    ),
    ko_number: z.string().nonempty(
      t("required {{field}}", { field: t("KO number"), ns: config.LANG.NS.VALIDATION }),
    ),
    channel_designation: z.string().nonempty(
      t("required {{field}}", { field: t("Channel designation"), ns: config.LANG.NS.VALIDATION }),
    ),
    work_section: z.string().nonempty(
      t("required {{field}}", { field: t("Work section"), ns: config.LANG.NS.VALIDATION }),
    ),
    maintenance_type: z.string().nonempty(
      t("required {{field}}", { field: t("Maintenance type"), ns: config.LANG.NS.VALIDATION }),
    ),
    work_reason: z.string().nonempty(
      t("required {{field}}", { field: t("Work reason"), ns: config.LANG.NS.VALIDATION }),
    ),
    mbb_zone: z.string().nonempty(
      t("required {{field}}", { field: t("MBB zone"), ns: config.LANG.NS.VALIDATION }),
    ),
    notes: z.string().optional().default(""),
  });

export type MaintenanceLogDto = z.infer<
  ReturnType<typeof createMaintenanceLogSchema>
>;
