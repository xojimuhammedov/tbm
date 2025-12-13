import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createF51Schema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    requestNumber: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Staffs"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    APInput: z.string().optional(),
    UBPInput: z.string().nonempty(
      t("required {{field}}", {
        field: t("Date"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type F51Dto = z.infer<ReturnType<typeof createF51Schema>>;
