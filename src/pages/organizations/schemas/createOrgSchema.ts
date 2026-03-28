import { TranslationArgsType } from "dgz-ui-shared/types";
import { z } from "zod";
import { config } from "@/shared/utils/config.ts";

// Organizations API expects: { name, description }
export const createStaffSchema = (
  t: (...args: TranslationArgsType) => string,
  // id isn't required for Organizations (schema same for create/edit)
  _id: string | null,
) =>
  z.object({
    name: z.string().nonempty(
      t("required {{field}}", {
        field: t("Name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    description: z.string().nonempty(
      t("required {{field}}", {
        field: t("Description"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type StaffDto = z.infer<ReturnType<typeof createStaffSchema>>;
