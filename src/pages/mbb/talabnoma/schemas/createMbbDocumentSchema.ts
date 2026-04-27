import { z } from "zod";
import { TranslationArgsType } from "dgz-ui-shared/types";

export const createMbbDocumentSchema = (
  t: (...args: TranslationArgsType) => string,
) => {
  return z.object({
    document_type: z.enum(["MEMO", "REQUISITION", "MEMO_3_3", "DECLARATION"], {
      required_error: t("Majburiy maydon"),
    }),
    code: z.string().min(1, { message: t("Majburiy maydon") }),
    signer: z.string().min(1, { message: t("Majburiy maydon") }),
    to: z.array(z.string()).optional(),
    copy: z.array(z.string()).optional(),

    // REQUISITION (Talabnoma) fields
    working_condition: z.string().optional(),
    schedule: z
      .array(
        z.object({
          start_at: z.union([z.string(), z.date()]).nullish(),
          end_at: z.union([z.string(), z.date()]).nullish(),
        }),
      )
      .optional(),
    station: z.string().optional(),
    no_number_type: z.enum(["MANUAL", "FLOWID", "FLOW_5_1", "LPLT_5_1"]).optional(),
    no_number_manual: z.string().optional(),
    no_number_lplt_5_1: z.string().optional(),
    no_number_flowid: z.array(z.string()).optional(),
    no_number_flow_5_1: z.array(z.string()).optional(),
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


    // MEMO (Ma'lumotnoma) fields
    title: z.string().optional(),
    comment: z.string().optional(),
    data: z
      .array(
        z.object({
          order_code: z.string().optional(),
          assigned_time: z.union([z.string(), z.date()]).nullish(),
          completed_time: z.union([z.string(), z.date()]).nullish(),
          responsible_executor: z.string().optional(),
          customer_details: z.string().optional(),
          comment: z.string().optional(),
          base_file: z.string().optional(),
        }),
      )
      .optional(),

    // MEMO_3_3 fields
    ap_executor: z.string().optional(),
    ubp_executor: z.string().optional(),
    rows: z
      .array(
        z.object({
          branch_order_info: z.string().optional(),
          connection_date: z.union([z.string(), z.date()]).nullish(),
          connection_route: z.string().optional(),
          note: z.string().optional(),
          base_file: z.string().optional(),
        })
      )
      .optional(),

    // DECLARATION fields
    organization_name: z.string().optional(),
    request_number: z.string().optional(),
    request_date: z.union([z.string(), z.date()]).nullish(),
    context: z.string().optional(),
  });
};

export type MbbDocumentDto = z.infer<
  ReturnType<typeof createMbbDocumentSchema>
>;
