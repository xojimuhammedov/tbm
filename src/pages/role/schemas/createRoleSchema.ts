import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createRoleSchema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    name: z.string().nonempty(
      t("required {{field}}", {
        field: t("First name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    permissions: z.array(z.string()).nonempty(
      t("required {{field}}", {
        field: t("Permissions"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type RoleDto = z.infer<ReturnType<typeof createRoleSchema>>;
