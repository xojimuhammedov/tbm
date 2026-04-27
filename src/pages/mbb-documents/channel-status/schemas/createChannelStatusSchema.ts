import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

export const createChannelStatusSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    device_type: z.string().nonempty(
      t("required {{field}}", {
        field: t("Device type"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    point_name: z.string().nonempty(
      t("required {{field}}", {
        field: t("Point name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    duty_officer: z.string().nonempty(
      t("required {{field}}", {
        field: t("Duty officer"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    ko_status_at_shift_handover: z.string().nonempty(
      t("required {{field}}", {
        field: t("KO status"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    shift_handover_at: z.string().nonempty(
      t("required {{field}}", {
        field: t("Shift handover time"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type ChannelStatusDto = z.infer<
  ReturnType<typeof createChannelStatusSchema>
>;
