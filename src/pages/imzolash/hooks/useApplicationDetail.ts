import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/shared/hooks/useToast";
import { useTranslation } from "react-i18next";
import useStaffOptions from "@/pages/staff/hooks/useStaffOptions";
import useGeneratePdf from "./useGeneratePdf";
import useBulkShare from "./useBulkShare";
import useDocumentSocket, {
    DocumentSocketPayload,
    DocumentSocketRecipient,
} from "./useDocumentSocket";
import {
    approvalShareSchema,
    ApprovalShareFormValues,
} from "../schema/approvalShare.schema";
import { ApplicationDocument, DocumentStage } from "../interfaces/detail.interface";

// ─── Recipient UI model ───────────────────────────────────────────────────────

export interface RecipientUI {
    id: string;
    fullName: string;
    type: "APPROVAL" | "SIGNING";
    isEditor: boolean;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCEL";
}

// ─── HOOK ────────────────────────────────────────────────────────────────────

const useApplicationDetail = (document: ApplicationDocument | undefined) => {
    const { t } = useTranslation();
    const { toast } = useToast();

    // ─── UI state ───────────────────────────────────────────────────────────────
    const [stage, setStage] = useState<DocumentStage>("draft");
    const [pdfOpen, setPdfOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [showShareForm, setShowShareForm] = useState(false);

    // Socket dan kelgan recipient list (real-time)
    const [recipients, setRecipients] = useState<RecipientUI[]>([]);

    // ─── Hooks ──────────────────────────────────────────────────────────────────
    const { staffOptions } = useStaffOptions();
    const { generatePdf, isGenerating } = useGeneratePdf();
    const { sendForApproval, isSending } = useBulkShare();

    // ─── Form ───────────────────────────────────────────────────────────────────
    const form = useForm<ApprovalShareFormValues>({
        resolver: zodResolver(approvalShareSchema),
        defaultValues: {
            approver_ids: [],
            director_id: "",
            approver_can_edit: false,
            director_can_edit: false,
        },
    });

    // ─── Socket ─────────────────────────────────────────────────────────────────
    // Page ochilganda ulanadi, yopilganda uziladi
    const handleSocketUpdate = useCallback((payload: DocumentSocketPayload) => {
        // Stage ni yangilaymiz
        if (payload.stage) {
            setStage(payload.stage);
        }

        // Recipientlarni UI modeli ga aylantiramiz
        if (Array.isArray(payload.recipients)) {
            const mapped: RecipientUI[] = payload.recipients.map(
                (r: DocumentSocketRecipient) => ({
                    id: r._id,
                    fullName: `${r.first_name} ${r.second_name}`.trim(),
                    type: r.type,
                    isEditor: r.isEditor,
                    status: r.status,
                })
            );
            setRecipients(mapped);

            // Agar recipients bor bo'lsa — jarayon boshlangan
            if (mapped.length > 0 && payload.stage === "draft") {
                setStage("approval");
            }
        }
    }, []);

    useDocumentSocket({
        documentId: document?._id,
        onUpdate: handleSocketUpdate,
    });

    // ─── PDF ────────────────────────────────────────────────────────────────────
    const handleOpenPdf = useCallback(async () => {
        if (!document?._id) return;
        setPdfOpen(true);
        if (pdfUrl) return;
        try {
            const url = await generatePdf(document._id);
            setPdfUrl(url);
        } catch {
            setPdfOpen(false);
            toast({
                variant: "destructive",
                title: t("Xatolik"),
                description: t("PDF yaratishda xatolik yuz berdi"),
            });
        }
    }, [document?._id, pdfUrl, generatePdf, toast, t]);

    const handleClosePdf = useCallback(() => setPdfOpen(false), []);

    // ─── Share ──────────────────────────────────────────────────────────────────
    const handleSubmitShare = useCallback(
        async (values: ApprovalShareFormValues) => {
            if (!document?._id) return;
            try {
                await sendForApproval({
                    document_id: document._id,
                    isQueue: true,
                    users: values.approver_ids.map((uid) => ({
                        user_id: uid,
                        isEditor: values.approver_can_edit,
                    })),
                    signer: values.director_id,
                });

                // Socket javob bergunicha optimistic UI
                setStage("approval");
                setShowShareForm(false);

                toast({
                    variant: "success",
                    title: t("Yuborildi"),
                    description: t("Hujjat ko'rib chiqishga muvaffaqiyatli yuborildi"),
                });
            } catch {
                toast({
                    variant: "destructive",
                    title: t("Xatolik"),
                    description: t("Yuborishda xatolik yuz berdi"),
                });
            }
        },
        [document?._id, sendForApproval, toast, t]
    );

    const handleCancelShare = useCallback(() => {
        setShowShareForm(false);
        form.reset();
    }, [form]);

    // Jarayonni bekor qilish
    const handleCancelProcess = useCallback(() => {
        setStage("draft");
        setRecipients([]);
        form.reset();
        // TODO: API call to cancel
    }, [form]);

    return {
        stage,
        setStage,
        pdfOpen,
        pdfUrl,
        showShareForm,
        setShowShareForm,
        recipients,           // socket dan kelgan real-time list
        form,
        staffOptions,
        handleOpenPdf,
        handleClosePdf,
        handleSubmitShare,
        handleCancelShare,
        handleCancelProcess,
        isGenerating,
        isSending,
    };
};

export default useApplicationDetail;