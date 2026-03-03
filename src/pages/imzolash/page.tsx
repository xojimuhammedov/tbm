import { useParams, useNavigate } from "react-router-dom";
import { LoaderCircleIcon, FileTextIcon, ChevronLeftIcon } from "lucide-react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import useApplicationDetail from "./hooks/useApplicationDetail";
import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument";
import { ApplicationDocument, DocumentStage } from "./interfaces/detail.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import {DocumentStatusBar} from "@/pages/imzolash/component/DocumentStatusBar.tsx";
import {ShareFormPanel} from "@/pages/imzolash/component/sharedRecipients.tsx";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const STAGES: { id: DocumentStage; label: string; color: string }[] = [
    { id: "draft",    label: "Qoralama",           color: "#94a3b8" },
    { id: "approval", label: "Ko'rib chiqilmoqda", color: "#f59e0b" },
    { id: "signing",  label: "Imzolashda",         color: "#6366f1" },
    { id: "done",     label: "Kuchga kirdi",        color: "#10b981" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fullName = (u?: { first_name?: string; second_name?: string }) =>
    u ? `${u.first_name ?? ""} ${u.second_name ?? ""}`.trim() : "—";

// ─── PDF MODAL ────────────────────────────────────────────────────────────────

function PdfModal({
                      open,
                      onClose,
                      pdfUrl,
                      isGenerating,
                  }: {
    open: boolean;
    onClose: () => void;
    pdfUrl: string | null;
    isGenerating: boolean;
}) {
    return (
        <MyModal
            open={open}
            onOpenChange={(v) => !v && onClose()}
            size="8xl"
            className="overflow-auto"
            header={
                <div className="flex items-center gap-2.5 pr-10">
                    <FileTextIcon className="size-4 text-slate-500" />
                    <span className="font-semibold text-slate-800 text-sm">
                        Hujjat · PDF ko'rinishi
                    </span>
                </div>
            }
        >
            <div className="bg-slate-100 min-h-[500px] flex items-center justify-center p-5">
                {isGenerating ? (
                    <div className="flex flex-col items-center gap-3">
                        <LoaderCircleIcon className="size-7 text-sky-500 animate-spin" />
                        <span className="text-sm text-slate-500 font-medium">
                            Hujjat yuklanmoqda...
                        </span>
                    </div>
                ) : pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        className="w-full rounded-xl border border-slate-200 shadow-sm bg-white"
                        style={{ height: "75vh" }}
                        title="Hujjat PDF"
                    />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400">
                        <FileTextIcon className="size-8 opacity-30" />
                        <span className="text-sm">PDF topilmadi</span>
                    </div>
                )}
            </div>
        </MyModal>
    );
}

// ─── META CARD ────────────────────────────────────────────────────────────────

function MetaCard({ doc }: { doc: ApplicationDocument }) {
    const rows: [string, string][] = [
        ["Buyurtma sanasi", dateFormatter(doc.order_date, DATE)],
        ["Yaratilgan vaqt", dateFormatter(doc.created_at, DATE_TIME)],
        ["Mas'ul xodim",    fullName(doc.responsible)],
        ["Yaratuvchi",      fullName(doc.created_by)],
        [
            "Kimga",
            (doc.to?.slice(0, 2).join(", ") ?? "") +
            (doc.to?.length > 2 ? ` +${doc.to.length - 2}` : ""),
        ],
        ["Nusxasi", doc.copy?.join(", ") ?? "—"],
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-1.5">
                    Hujjat ma'lumotlari
                </p>
                <p className="font-extrabold text-[15px] text-slate-900 leading-snug tracking-tight">
                    {doc.payload?.basic?.title}
                </p>
            </div>
            <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">
                {rows.map(([label, value]) => (
                    <div key={label} className="px-5 py-3.5">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            {label}
                        </p>
                        <p className="text-[13px] font-semibold text-slate-900">
                            {value || "—"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── ACTION BAR ──────────────────────────────────────────────────────────────

function ActionBar({
                       stage,
                       showShareForm,
                       onOpenShareForm,
                   }: {
    stage: DocumentStage;
    showShareForm: boolean;
    onOpenShareForm: () => void;
}) {
    const currentStage = STAGES.find((s) => s.id === stage);

    if (stage !== "draft" || showShareForm) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm px-4 py-3 flex items-center gap-3">
            <Button
                onClick={onOpenShareForm}
                className="h-9 text-[12.5px] font-semibold gap-2 bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
            >
                <svg
                    width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                Ko'rib chiqishga yuborish
            </Button>

            {/* Current stage pill */}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: currentStage?.color }}
                />
                <span className="text-[11.5px] font-semibold text-slate-600">
                    {currentStage?.label}
                </span>
            </div>
        </div>
    );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────

const ApplicationDocumentDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { applicationDocumentQuery } = useOrderDocument(id as string);
    const doc = applicationDocumentQuery.data?.data as ApplicationDocument | undefined;

    const {
        stage,
        pdfOpen,
        pdfUrl,
        showShareForm,
        setShowShareForm,
        recipients,
        form,
        staffOptions,
        handleOpenPdf,
        handleClosePdf,
        handleSubmitShare,
        handleCancelShare,
        handleCancelProcess,
        isGenerating,
        isSending,
    } = useApplicationDetail(doc);

    if (applicationDocumentQuery.isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <LoaderCircleIcon className="size-6 text-sky-500 animate-spin" />
            </div>
        );
    }

    if (!doc) return null;

    return (
        <div className="min-h-screen bg-[#f1f3f6] px-4 py-7 pb-16">
            <div className="max-w-[800px] mx-auto">

                {/* ── HEADER ── */}
                <div className="flex items-center gap-3 mb-5">
                    <Button
                        variant="default"
                        size="icon"
                        className="w-9 h-9 rounded-xl border-slate-200 flex-shrink-0"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon className="size-4" />
                    </Button>

                    <div className="flex-1 min-w-0">
                        <h1 className="font-extrabold text-[18px] text-slate-900 tracking-tight leading-none truncate">
                            Buyurtma hujjati
                        </h1>
                        <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                            № {doc.code}
                        </p>
                    </div>

                    {/* PDF button */}
                    <Button
                        variant="default"
                        onClick={handleOpenPdf}
                        disabled={isGenerating}
                        className="h-9 text-[12.5px] font-semibold gap-2 border-slate-200 flex-shrink-0"
                    >
                        {isGenerating ? (
                            <LoaderCircleIcon className="size-3.5 animate-spin text-sky-500" />
                        ) : (
                            <FileTextIcon className="size-3.5 text-slate-500" />
                        )}
                        PDF ko'rish
                    </Button>
                </div>

                {/* ── STATUS BAR (progress + recipients) ── */}
                <DocumentStatusBar
                    stage={stage}
                    recipients={recipients}
                    onCancelProcess={handleCancelProcess}
                />

                <MetaCard doc={doc} />

                {showShareForm && (
                    <ShareFormPanel
                        form={form}
                        staffOptions={staffOptions ?? []}
                        onCancel={handleCancelShare}
                        onSubmit={form.handleSubmit(handleSubmitShare)}
                        isSending={isSending}
                    />
                )}

                <ActionBar
                    stage={stage}
                    showShareForm={showShareForm}
                    onOpenShareForm={() => setShowShareForm(true)}
                />
            </div>

            <PdfModal
                open={pdfOpen}
                onClose={handleClosePdf}
                pdfUrl={pdfUrl}
                isGenerating={isGenerating}
            />
        </div>
    );
};

export default ApplicationDocumentDetailPage;