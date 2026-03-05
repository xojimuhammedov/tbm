import { DocumentStatusBar } from "@/pages/imzolash/component/DocumentStatusBar";
import { ShareFormPanel } from "@/pages/imzolash/component/sharedRecipients";
import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument";
import { MyModal } from "@/shared/components/moleculas/modal";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { dateFormatter } from "@/shared/utils/utils";
import { Button } from "dgz-ui/button";
import {
  ChevronLeftIcon,
  FileTextIcon,
  LoaderCircleIcon,
  SendIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useApplicationDetail from "./hooks/useApplicationDetail";
import { ApplicationDocument } from "./interfaces/detail.interface";
import { ApprovalShareFormValues } from "./schema/approvalShare.schema";


const fullName = (u?: { first_name?: string; second_name?: string }) =>
  u ? `${u.first_name ?? ""} ${u.second_name ?? ""}`.trim() : "—";


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


function ShareModal({
  open,
  onClose,
  form,
  staffOptions,
  onSubmit,
  isSending,
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
          <span className="font-semibold text-slate-800 text-sm">
            Ko'rib chiqishga yuborish
          </span>
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

function MetaCard({ doc }: { doc: ApplicationDocument }) {
  const rows: [string, string][] = [
    ["Buyurtma sanasi", dateFormatter(doc.order_date, DATE)],
    ["Yaratilgan vaqt", dateFormatter(doc.created_at, DATE_TIME)],
    ["Mas'ul xodim", fullName(doc.responsible)],
    ["Yaratuvchi", fullName(doc.created_by)],
    [
      "Kimga",
      (doc.to?.slice(0, 2).join(", ") ?? "") +
        (doc.to?.length > 2 ? ` +${doc.to.length - 2}` : ""),
    ],
    ["Nusxasi", doc.copy?.join(", ") ?? "—"],
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

const ApplicationDocumentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { applicationDocumentQuery } = useOrderDocument(id as string);
  const doc = applicationDocumentQuery.data?.data as
    | ApplicationDocument
    | undefined;

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
    handleAddRecipient,
    handleRemoveRecipient,
    isGenerating,
    isSending,
    isModifying,
  } = useApplicationDetail(doc);

  const [showAddModal, setShowAddModal] = useState(false);

  const handleOpenAddModal = useCallback(() => {
    form.reset({
      approver_ids: [],
      director_id: "",
      approver_edit_permissions: {},
      director_can_edit: false,
    });
    setShowAddModal(true);
  }, [form]);

  const handleCloseAddModal = useCallback(() => {
    setShowAddModal(false);
    form.reset({
      approver_ids: [],
      director_id: "",
      approver_edit_permissions: {},
      director_can_edit: false,
    });
  }, [form]);

  const handleAddRecipients = useCallback(
    async (values: ApprovalShareFormValues) => {
      try {
        for (const uid of values.approver_ids || []) {
          await handleAddRecipient(
            uid,
            values.approver_edit_permissions[uid] ?? false,
            "APPROVAL",
          );
        }
        if (values.director_id) {
          await handleAddRecipient(values.director_id, false, "SIGNING");
        }
        handleCloseAddModal();
      } catch {
      }
    },
    [handleAddRecipient, form],
  );

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
      <div className="max-w-[1200px] mx-auto">
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
            <Button
              variant="default"
              onClick={handleOpenPdf}
              disabled={isGenerating}
              className="h-9 text-[12.5px] font-semibold gap-2 border-slate-200"
            >
              {isGenerating ? (
                <LoaderCircleIcon className="size-3.5 animate-spin text-sky-500" />
              ) : (
                <FileTextIcon className="size-3.5 text-slate-500" />
              )}
              PDF ko'rish
            </Button>

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

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 items-start">
          <MetaCard doc={doc} />
          <DocumentStatusBar
            documentId={id}
            onAddRecipient={handleAddRecipient}
            onRemoveRecipient={handleRemoveRecipient}
            isModifying={isModifying}
            staffOptions={staffOptions ?? []}
            onOpenAddModal={handleOpenAddModal}
          />
        </div>
      </div>

      <ShareModal
        open={showShareForm}
        onClose={handleCancelShare}
        form={form}
        staffOptions={staffOptions ?? []}
        onSubmit={form.handleSubmit(handleSubmitShare)}
        isSending={isSending}
      />

      <PdfModal
        open={pdfOpen}
        onClose={handleClosePdf}
        pdfUrl={pdfUrl}
        isGenerating={isGenerating}
      />

      <ShareModal
        open={showAddModal}
        onClose={handleCloseAddModal}
        form={form}
        staffOptions={staffOptions ?? []}
        onSubmit={form.handleSubmit(handleAddRecipients)}
        isSending={isModifying}
      />
    </div>
  );
};

export default ApplicationDocumentDetailPage;
