import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    code: z.string().nonempty(
      t("required {{field}}", {
        field: t("Order code"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type ApplicationDto = z.infer<
  ReturnType<typeof createApplicationSchema>
>;
