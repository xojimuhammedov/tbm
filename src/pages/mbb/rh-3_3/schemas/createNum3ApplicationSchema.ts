import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";
import { config } from "@/shared/utils/config.ts";

export const createNum3ApplicationSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  const requiredMsg = (fieldKey: string) =>
    t("required {{field}}", {
      field: t(fieldKey),
      ns: config.LANG.NS.VALIDATION,
    });
  return z.object({
    code: z.string().min(1, { message: t("Majburiy maydon") }),
    title: z.string().min(1, { message: t("Majburiy maydon") }),
    signer: z.string().min(1, { message: t("Majburiy maydon") }),
    data: z
      .array(
        z.object({
          order_code: z.string().min(1, { message: t("Majburiy maydon") }),
          assigned_time: z.union([z.string(), z.date()]).refine((val) => !!val, { message: requiredMsg("Farmoyishda ko'rsatilgan vaqt") }),
          completed_time: z.union([z.string(), z.date()]).refine((val) => !!val, { message: requiredMsg("Farmoyish bajarilgan vaqt") }),
          responsible_executor: z
            .string()
            .min(1, { message: t("Majburiy maydon") }),
          customer_details: z.string(),
          comment: z.string().optional(),
        }),
      )
      .optional(),
  });
};

export type Num3ApplicationDto = z.infer<
  ReturnType<typeof createNum3ApplicationSchema>
>;
