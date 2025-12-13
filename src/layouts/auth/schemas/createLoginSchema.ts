import * as z from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

const createLoginSchema = (t: (...args: TranslationArgsType) => string) =>
  z.object({
    email: z.string().nonempty(
      t("required {{field}}", {
        field: t("Username"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    password: z.string().nonempty(
      t("required {{field}}", {
        field: t("Password"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
  });

export type LoginDto = z.infer<ReturnType<typeof createLoginSchema>>;

export default createLoginSchema;
