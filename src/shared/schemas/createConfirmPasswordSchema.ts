import { z } from "zod";
import { config } from "@/shared/utils/config.ts";
import { TranslationArgsType } from "dgz-ui-shared/types";

const createConfirmPasswordSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    password: z.string().nonempty(
      t("required {{field}}", {
        field: t("Password"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type ConfirmPasswordDto = z.infer<
  ReturnType<typeof createConfirmPasswordSchema>
>;

export default createConfirmPasswordSchema;
