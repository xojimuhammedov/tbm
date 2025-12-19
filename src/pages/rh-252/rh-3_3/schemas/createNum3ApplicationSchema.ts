import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createNum3ApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    requestNumber: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    ap_input: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    ubp_input: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    actionType: z
      .array(z.string())
      .min(1, { message: t("Kamida bitta harakat turini tanlang") }),
  });
};

export type Num3ApplicationDto = z.infer<
  ReturnType<typeof createNum3ApplicationSchema>
>;
