import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createFApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    requestNumber: z
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
    actionType: z
      .array(z.string())
      .min(1, { message: t("Kamida bitta harakat turini tanlang") }),
  });
};

export type FApplicationDto = z.infer<
  ReturnType<typeof createFApplicationSchema>
>;
