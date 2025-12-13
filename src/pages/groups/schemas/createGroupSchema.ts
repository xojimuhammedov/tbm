import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createGroupSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    name: z.string().nonempty(
      t("required {{field}}", {
        field: t("Group name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    description: z.string().nonempty(
      t("required {{field}}", {
        field: t("Group description"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    users: z.array(z.string()).default([]),
  });

export type GroupDto = z.infer<ReturnType<typeof createGroupSchema>>;
