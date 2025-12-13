import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createF56Schema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    recipientIds: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Staffs"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    description: z.string().optional(),
    f51_ids: z.array(z.string()).default([]),
  });

export type F56Dto = z.infer<ReturnType<typeof createF56Schema>>;
