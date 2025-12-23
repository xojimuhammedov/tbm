import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createNum3ApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    request_number: z
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
    action_type: z
      .array(z.string())
      .min(1, { message: t("Kamida bitta harakat turini tanlang") }),

    data: z
      .array(
        z.object({
          order_code: z.string().min(1, { message: t("Majburiy maydon") }),
          execution_status: z.string(),
          responsible_executor: z
            .string()
            .min(1, { message: t("Majburiy maydon") }),
          customer_details: z.string(),
          failure_reason: z.string().optional(),
          comment: z.string().optional(),
        }),
      )
      .optional(),
  });
};

export type Num3ApplicationDto = z.infer<
  ReturnType<typeof createNum3ApplicationSchema>
>;
