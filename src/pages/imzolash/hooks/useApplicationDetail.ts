import useStaffOptions from "@/pages/staff/hooks/useStaffOptions";
import { useToast } from "@/shared/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApplicationDocument } from "../interfaces/detail.interface";
import {
    ApprovalShareFormValues,
    approvalShareSchema,
} from "../schema/approvalShare.schema";
import useBulkShare from "./useBulkShare";
import useDocumentSocket, {
    DocumentSocketPayload,
    DocumentStatus,
} from "./useDocumentSocket";
import useGeneratePdf from "./useGeneratePdf";
import { useManageRecipients } from "./useManageRecipients";
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
    const { addRecipient, removeRecipient, isModifying } = useManageRecipients();
    const form = useForm<ApprovalShareFormValues>({
        resolver: zodResolver(approvalShareSchema),
        defaultValues: {
            approver_ids: [],
            director_id: "",
            approver_edit_permissions: {},
            director_can_edit: false,
        },
    });
    const handleSocketUpdate = useCallback((payload: DocumentSocketPayload) => {
        setSocketData(payload);
    }, []);

    useDocumentSocket({
        documentId: document?._id,
        onUpdate: handleSocketUpdate,
    });

    const documentStatus: DocumentStatus = socketData?.document_status ?? "DRAFT";
    const isDraft = documentStatus === "DRAFT";
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
    const handleSubmitShare = useCallback(
        async (values: ApprovalShareFormValues) => {
            if (!document?._id) return;
            try {
                await sendForApproval({
                    document_id: document._id,
                    isQueue: false,
                    users: (values.approver_ids || []).map((uid) => ({
                        user_id: uid,
                        isEditor: values.approver_edit_permissions[uid] ?? false,
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

    const handleAddRecipient = useCallback(async (userId: string, isEditor: boolean, type: "APPROVAL" | "SIGNING" = "APPROVAL") => {
        if (!document?._id) return;
        try {
            await addRecipient(document._id, userId, isEditor, type);
            toast({ variant: "success", title: t("Muvaffaqiyatli"), description: t("Yangi ishtirokchi qo'shildi") });
        } catch {
            toast({ variant: "destructive", title: t("Xatolik"), description: t("Ishtirokchi qo'shishda xatolik yuz berdi") });
        }
    }, [document?._id, addRecipient, toast, t]);

    const handleRemoveRecipient = useCallback(async (targetId: string) => {
        if (!document?._id) return;
        try {
            await removeRecipient(targetId);
            toast({ variant: "success", title: t("Muvaffaqiyatli"), description: t("Ishtirokchi olib tashlandi") });
        } catch {
            toast({ variant: "destructive", title: t("Xatolik"), description: t("Olib tashlashda xatolik yuz berdi") });
        }
    }, [document?._id, removeRecipient, toast, t]);

    return {
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
        handleAddRecipient,
        handleRemoveRecipient,
        isGenerating,
        isSending,
        isModifying,
    };
};

export default useApplicationDetail;