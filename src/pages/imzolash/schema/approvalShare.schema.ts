import { z } from "zod";

export const approvalShareSchema = z.object({
    approver_ids: z
        .array(z.string())
        .optional(),
    director_id: z
        .string()
        .optional(),
    approver_edit_permissions: z.record(z.boolean()).default({}),
    director_can_edit: z.boolean().default(false),
});

export type ApprovalShareFormValues = z.infer<typeof approvalShareSchema>;