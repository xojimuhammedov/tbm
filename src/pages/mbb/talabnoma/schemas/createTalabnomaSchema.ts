import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createTalabnomaSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    code: z.string().min(1, { message: t("Majburiy maydon") }),
    working_condition: z.string().optional(),
    schedule: z.array(
      z.object({
        start_at: z.union([z.string(), z.date()]).optional(),
        end_at: z.union([z.string(), z.date()]).optional(),
      })
    ).optional(),
    station: z.string().optional(),
    no_number: z.string().optional(),
    ai_channel: z.string().optional(),
    reason_work: z.string().optional(),
    content_work: z.string().optional(),
    no_status: z.string().optional(),
    aoj_number: z.string().optional(),
    reverse: z.string().optional(),
    responsible_person: z.string().optional(),
    agreed: z.string().optional(),
    ai_agreed: z.string().optional(),
    creator_ip: z.string().optional(),
    creator_mbb: z.string().optional(),
    application: z.array(
      z.object({
        operator_name: z.string().optional(),
        ranges: z.array(
          z.object({
            from: z.string().optional(),
            to: z.string().optional()
          })
        ).optional()
      })
    ).optional(),
    signer: z.string().min(1, { message: t("Majburiy maydon") }),
  });
};

export type TalabnomaDto = z.infer<
  ReturnType<typeof createTalabnomaSchema>
>;
