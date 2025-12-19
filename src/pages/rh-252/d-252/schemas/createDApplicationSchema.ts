import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createDApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    request_number: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    sender: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    recipient: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    leader: z
      .string()
      .min(1, { message: t("Majburiy maydon") })
      .trim(),
    action_type: z
      .array(z.string())
      .min(1, { message: t("Kamida bitta harakat turini tanlang") }),
  });
};

export type DApplicationDto = z.infer<
  ReturnType<typeof createDApplicationSchema>
>;
