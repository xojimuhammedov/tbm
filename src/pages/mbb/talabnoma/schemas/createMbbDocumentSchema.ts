import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createMbbDocumentSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    document_type: z.enum(["MEMO", "REQUISITION", "T-MEMO"], {
      required_error: t("Majburiy maydon"),
    }),
    code: z.string().min(1, { message: t("Majburiy maydon") }),
    signer: z.string().min(1, { message: t("Majburiy maydon") }),

    // REQUISITION (Talabnoma) fields
    working_condition: z.string().optional(),
    schedule: z
      .array(
        z.object({
          start_at: z.union([z.string(), z.date()]).optional(),
          end_at: z.union([z.string(), z.date()]).optional(),
        }),
      )
      .optional(),
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
    application: z
      .array(
        z.object({
          operator_name: z.string().optional(),
          ranges: z
            .array(
              z.object({
                from: z.string().optional(),
                to: z.string().optional(),
              }),
            )
            .optional(),
        }),
      )
      .optional(),

    // MEMO (Ma'lumotnoma) fields
    title: z.string().optional(),
    data: z
      .array(
        z.object({
          order_code: z.string().optional(),
          assigned_time: z.union([z.string(), z.date()]).optional(),
          completed_time: z.union([z.string(), z.date()]).optional(),
          responsible_executor: z.string().optional(),
          customer_details: z.string().optional(),
          comment: z.string().optional(),
        }),
      )
      .optional(),

    // T-MEMO fields
    request_number: z.string().optional(),
    ap_input: z.string().optional(),
    ubp_input: z.string().optional(),
    action_type: z.array(z.any()).optional(),
    t_memo_data: z
      .array(
        z.object({
          order_code: z.string().optional(),
          connection_established_date: z.union([z.string(), z.date()]).optional(),
          connection_route_details: z.string().optional(),
          comment: z.string().optional(),
        })
      )
      .optional(),
  });
};

export type MbbDocumentDto = z.infer<
  ReturnType<typeof createMbbDocumentSchema>
>;
