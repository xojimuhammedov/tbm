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
    DocumentStatus,
} from "./useDocumentSocket";
import {
    approvalShareSchema,
    ApprovalShareFormValues,
} from "../schema/approvalShare.schema";
import { ApplicationDocument } from "../interfaces/detail.interface";

// ─── HOOK ────────────────────────────────────────────────────────────────────

const useApplicationDetail = (document: ApplicationDocument | undefined) => {
    const { t } = useTranslation();
    const { toast } = useToast();

    const [socketData, setSocketData] = useState<DocumentSocketPayload | null>(null);
    const [pdfOpen, setPdfOpen] = useState(false);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [showShareForm, setShowShareForm] = useState(false);

    const { staffOptions } = useStaffOptions();
    const { generatePdf, isGenerating } = useGeneratePdf();
    const { sendForApproval, isSending } = useBulkShare();

    const form = useForm<ApprovalShareFormValues>({
        resolver: zodResolver(approvalShareSchema),
        defaultValues: {
            approver_ids: [],
            director_id: "",
            approver_can_edit: false,
            director_can_edit: false,
        },
    });

    // ─── Socket ──────────────────────────────────────────────────────────────
    const handleSocketUpdate = useCallback((payload: DocumentSocketPayload) => {
        setSocketData(payload);
    }, []);

    useDocumentSocket({
        documentId: document?._id,
        onUpdate: handleSocketUpdate,
    });

    // ─── Derived state ────────────────────────────────────────────────────────
    // document_status → eski "stage" ga mapping (ActionBar / ShareForm uchun)
    const documentStatus: DocumentStatus = socketData?.document_status ?? "DRAFT";
    const isDraft = documentStatus === "DRAFT";

    // ─── PDF ─────────────────────────────────────────────────────────────────
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

    // ─── Share ────────────────────────────────────────────────────────────────
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

    const handleCancelProcess = useCallback(() => {
        setSocketData(null);
        form.reset();
    }, [form]);

    return {
        // socket dan kelgan to'liq data
        socketData,
        documentStatus,
        isDraft,

        pdfOpen,
        pdfUrl,
        showShareForm,
        setShowShareForm,
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