import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createFApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    request_number: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    ubp_input: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    ap_input: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    action_type: z
      .array(z.string())
      .min(1, { message: t("Kamida bitta harakat turini tanlang") }),
  });
};

export type FApplicationDto = z.infer<
  ReturnType<typeof createFApplicationSchema>
>;
