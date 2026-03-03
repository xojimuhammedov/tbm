import { z } from "zod";

// ─── Ko'rib chiqish (APPROVAL) formasi ───────────────────────────────────────

export const approvalShareSchema = z.object({
    /**
     * Tasdiqlash uchun tanlangan xodimlar (bir yoki bir nechta)
     * MySelect isMulti={true} — qiymat string[] bo'ladi
     */
    approver_ids: z
        .array(z.string())
        .min(1, "Kamida bitta mas'ul xodim tanlang"),

    /** Imzolash uchun tanlangan direktor (bitta) */
    director_id: z
        .string({ required_error: "Direktorni tanlang" })
        .min(1, "Direktorni tanlang"),

    /** Tasdiqlash bosqichida tahrirlash huquqi */
    approver_can_edit: z.boolean().default(false),

    /** Imzolash bosqichida tahrirlash huquqi */
    director_can_edit: z.boolean().default(false),
});

export type ApprovalShareFormValues = z.infer<typeof approvalShareSchema>;