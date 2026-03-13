import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";
import { z } from "zod";

export const createPositionSchema = (
  t: (...args: TranslationArgsType) => string,
) =>
  z.object({
    name: z.string().nonempty(
      t("required {{field}}", {
        field: t("Name"),
        ns: config.LANG.NS.VALIDATION,
      }),
    ),
    description: z.string().optional(),
  });

export type PositionDto = z.infer<ReturnType<typeof createPositionSchema>>;
