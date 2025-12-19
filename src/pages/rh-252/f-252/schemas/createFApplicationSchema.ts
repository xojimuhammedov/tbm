import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";


const connectionDataSchema = (t: (...args: TranslationArgsType) => string) =>
    z.object({
      order_code: z.string().min(1, { message: t("Majburiy maydon") }),
      connection_established_date: z.string().min(1, { message: t("Sana majburiy") }),
      connection_route_details: z.string().min(1, { message: t("Tafsilotlar majburiy") }),
      comment: z.string().optional(),
    });

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

    data: z.array(connectionDataSchema(t)).min(1, {
      message: t("Kamida bitta ulanish ma'lumoti bo'lishi kerak")
    }),
  });
};

export type FApplicationDto = z.infer<
    ReturnType<typeof createFApplicationSchema>
>;