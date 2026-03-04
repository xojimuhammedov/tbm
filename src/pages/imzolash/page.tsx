import { useParams, useNavigate } from "react-router-dom";
import { LoaderCircleIcon, FileTextIcon, ChevronLeftIcon, SendIcon } from "lucide-react";
import { MyModal } from "@/shared/components/moleculas/modal";
import { Button } from "dgz-ui/button";
import useApplicationDetail from "./hooks/useApplicationDetail";
import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument";
import { ApplicationDocument } from "./interfaces/detail.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { DocumentStatusBar } from "@/pages/imzolash/component/DocumentStatusBar";
import { ShareFormPanel } from "@/pages/imzolash/component/sharedRecipients";

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fullName = (u?: { first_name?: string; second_name?: string }) =>
    u ? `${u.first_name ?? ""} ${u.second_name ?? ""}`.trim() : "—";

// ─── PDF MODAL ────────────────────────────────────────────────────────────────

function PdfModal({
                      open, onClose, pdfUrl, isGenerating,
                  }: {
    open: boolean; onClose: () => void; pdfUrl: string | null; isGenerating: boolean;
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
                    <span className="font-semibold text-slate-800 text-sm">Hujjat · PDF ko'rinishi</span>
                </div>
            }
        >
            <div className="bg-slate-100 min-h-[500px] flex items-center justify-center p-5">
                {isGenerating ? (
                    <div className="flex flex-col items-center gap-3">
                        <LoaderCircleIcon className="size-7 text-sky-500 animate-spin" />
                        <span className="text-sm text-slate-500 font-medium">Hujjat yuklanmoqda...</span>
                    </div>
                ) : pdfUrl ? (
                    <iframe src={pdfUrl} className="w-full rounded-xl border border-slate-200 shadow-sm bg-white" style={{ height: "75vh" }} title="Hujjat PDF" />
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

// ─── SHARE MODAL ─────────────────────────────────────────────────────────────

function ShareModal({
                        open, onClose, form, staffOptions, onSubmit, isSending,
                    }: {
    open: boolean;
    onClose: () => void;
    form: any;
    staffOptions: any[];
    onSubmit: () => void;
    isSending: boolean;
}) {
    return (
        <MyModal
            open={open}
            onOpenChange={(v) => !v && onClose()}
            size="lg"
            header={
                <div className="flex items-center gap-2.5 pr-10">
                    <SendIcon className="size-4 text-sky-500" />
                    <span className="font-semibold text-slate-800 text-sm">Ko'rib chiqishga yuborish</span>
                </div>
            }
        >
            <div className="p-4">
                <ShareFormPanel
                    form={form}
                    staffOptions={staffOptions}
                    onCancel={onClose}
                    onSubmit={onSubmit}
                    isSending={isSending}
                />
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
        ["Kimga",           (doc.to?.slice(0, 2).join(", ") ?? "") + (doc.to?.length > 2 ? ` +${doc.to.length - 2}` : "")],
        ["Nusxasi",         doc.copy?.join(", ") ?? "—"],
    ];

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit">
            <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-1.5">
                    Hujjat ma'lumotlari
                </p>
                <p className="font-extrabold text-[15px] text-slate-900 leading-snug tracking-tight">
                    {doc.payload?.basic?.title}
                </p>
            </div>
            <div className="divide-y divide-slate-100">
                {rows.map(([label, value]) => (
                    <div key={label} className="px-5 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const ApplicationDocumentDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { applicationDocumentQuery } = useOrderDocument(id as string);
    const doc = applicationDocumentQuery.data?.data as ApplicationDocument | undefined;

    const {
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
            <div className="max-w-[1100px] mx-auto">

                {/* ── HEADER ── */}
                <div className="flex items-center gap-3 mb-6">
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

                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* PDF button */}
                        <Button
                            variant="default"
                            onClick={handleOpenPdf}
                            disabled={isGenerating}
                            className="h-9 text-[12.5px] font-semibold gap-2 border-slate-200"
                        >
                            {isGenerating
                                ? <LoaderCircleIcon className="size-3.5 animate-spin text-sky-500" />
                                : <FileTextIcon className="size-3.5 text-slate-500" />
                            }
                            PDF ko'rish
                        </Button>

                        {/* Send for review — only in DRAFT */}
                        {isDraft && (
                            <Button
                                onClick={() => setShowShareForm(true)}
                                className="h-9 text-[12.5px] font-semibold gap-2 bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                            >
                                <SendIcon className="size-3.5" />
                                Ko'rib chiqishga yuborish
                            </Button>
                        )}
                    </div>
                </div>

                {/* ── TWO COLUMN LAYOUT ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 items-start">

                    {/* LEFT — meta card */}
                    <MetaCard doc={doc} />

                    {/* RIGHT — status bar */}
                    <DocumentStatusBar documentId={id} />
                </div>
            </div>

            {/* ── SHARE MODAL ── */}
            <ShareModal
                open={showShareForm}
                onClose={handleCancelShare}
                form={form}
                staffOptions={staffOptions ?? []}
                onSubmit={form.handleSubmit(handleSubmitShare)}
                isSending={isSending}
            />

            {/* ── PDF MODAL ── */}
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