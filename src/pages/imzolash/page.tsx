import { DocumentStatusBar } from "@/pages/imzolash/component/DocumentStatusBar";
import { ShareFormPanel } from "@/pages/imzolash/component/sharedRecipients";
import OrderApplicationView1731 from "@/pages/rh-252/a-252/components/View/1731view";
import OrderApplicationView1733 from "@/pages/rh-252/a-252/components/View/1733view";
import OrderApplicationView1745 from "@/pages/rh-252/a-252/components/View/1745view";
import OrderView1748 from "@/pages/rh-252/a-252/components/View/1748view";
import OrderApplicationView1754 from "@/pages/rh-252/a-252/components/View/1754view";
import OrderApplicationView1770 from "@/pages/rh-252/a-252/components/View/1770view";
import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument";
import { PageWrapper } from "@/shared/components/containers/page";
import { MyModal } from "@/shared/components/moleculas/modal";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { dateFormatter } from "@/shared/utils/utils";
import { BreadcrumbInterface } from "dgz-ui/breadcrumb";
import { Button } from "dgz-ui/button";
import {
  ChevronLeftIcon,
  FileTextIcon,
  FileType2,
  LoaderCircleIcon,
} from "lucide-react";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useApplicationDetail from "./hooks/useApplicationDetail";
import { ApplicationDocument } from "./interfaces/detail.interface";
import { ApprovalShareFormValues } from "./schema/approvalShare.schema";

const fullName = (u?: { first_name?: string; second_name?: string }) =>
  u ? `${u.first_name ?? ""} ${u.second_name ?? ""}`.trim() : "—";

function PdfModal({
  open,
  onClose,
  doc,
}: {
  open: boolean;
  onClose: () => void;
  doc: any;
}) {
  const renderOrderView = () => {
    if (!doc) return null;
    const model = doc.payload_model;
    if (model === "17_54_payloads") {
      return (
        <OrderApplicationView1754
          open={true}
          onOpenChange={() => {}}
          document={doc}
          asComponent
        />
      );
    }
    if (model === "17_45_payloads") {
      return (
        <OrderApplicationView1745
          open={true}
          onOpenChange={() => {}}
          document={doc}
          asComponent
        />
      );
    }
    if (model === "17_33_payloads") {
      return (
        <OrderApplicationView1733
          open={true}
          onOpenChange={() => {}}
          document={doc}
          asComponent
        />
      );
    }
    if (model === "17_70_payloads") {
      return (
        <OrderApplicationView1770
          open={true}
          onOpenChange={() => {}}
          document={doc}
          asComponent
        />
      );
    }
    if (model === "17_48_payloads") {
      return (
        <OrderView1748
          open={true}
          onOpenChange={() => {}}
          document={doc}
          asComponent
        />
      );
    }
    if (model === "17_31_payloads") {
      return (
        <OrderApplicationView1731
          open={true}
          onOpenChange={() => {}}
          document={doc}
          asComponent
        />
      );
    }
    return (
      <div className="p-8 text-center text-gray-500">
        Hujjat ko'rinishi topilmadi
      </div>
    );
  };

  return (
    <MyModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      size="8xl"
      className="overflow-auto"
      header={
        <div className="flex items-center gap-2.5 pr-10">
          <FileTextIcon className="size-4 text-neutral-500" />
          <span className="font-semibold text-neutral-900 text-sm">
            Hujjat ko'rinishi
          </span>
        </div>
      }
    >
      <div className="bg-neutral-100 min-h-[500px] flex items-center justify-center p-5">
        <div className="w-full bg-white shadow-sm border border-neutral-200">
          {renderOrderView()}
        </div>
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
      className="overflow-visible"
      header={
        <div className="flex items-center gap-1.5 pr-10">
          <span className="font-semibold text-neutral-900 text-sm">
            Ko'rib chiqishga yuborish
          </span>
        </div>
      }
    >
      <div className="p-4 overflow-visible">
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

function MetaCard({
  doc,
  handleOpenPdf,
}: {
  doc: ApplicationDocument;
  handleOpenPdf: () => void;
}) {
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
    <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden h-fit">
      <div className="px-4 py-3 border-b border-neutral-100">
        <p className="text-[10px] font-bold tracking-wider uppercase text-neutral-400 mb-0.5">
          Hujjat ma'lumotlari
        </p>
        <p className="font-bold text-base text-neutral-900 leading-snug tracking-tight">
          {doc.payload?.basic?.title}
        </p>
      </div>
      <div className="divide-y divide-neutral-100">
        {rows.map(([label, value]) => (
          <div key={label} className="px-4 py-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-0.5">
              {label}
            </p>
            <p className="text-sm font-semibold text-neutral-900">
              {value || "—"}
            </p>
          </div>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-neutral-100">
        <Button
          onClick={handleOpenPdf}
          className="w-full justify-center h-9 text-[12.5px] font-semibold gap-2 transition-all active:scale-95"
        >
          <>
            <FileType2 className="size-4 text-red-500" />
            <span>Hujjatni ko'rish</span>
          </>
        </Button>
      </div>
    </div>
  );
}

const ApplicationDocumentDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { applicationDocumentQuery } = useOrderDocument(id as string);
  const doc = applicationDocumentQuery.data?.data as
    | ApplicationDocument
    | undefined;

  const {
    canShare,
    documentStatus,
    pdfOpen,
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
      } catch {}
    },
    [handleAddRecipient, form],
  );

  const breadcrumbs: BreadcrumbInterface[] = [
    {
      name: t("Imzolash"),
      path: "/imzolash",
      isActive: false,
    },
    {
      name: doc?.payload?.basic?.title || t("Hujjat"),
      path: `/imzolash/${id}`,
      isActive: true,
    },
  ];

  if (applicationDocumentQuery.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <LoaderCircleIcon className="size-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!doc) return null;

  return (
    <>
      <PageHeader breadcrumbs={breadcrumbs} />
      <PageWrapper>
        <div className="">
          <div className="flex flex-col sm:flex-row sm:items-center  mb-4 ">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Button
                variant="secondary"
                size="icon"
                className="w-10 h-10 rounded-xl bg-white border border-neutral-200 flex-shrink-0 hover:bg-neutral-50 shadow-sm group"
                onClick={() => navigate(-1)}
              >
                <ChevronLeftIcon className="size-5 text-neutral-700 group-hover:text-black transition-colors" />
              </Button>
              <div className="flex-1 min-w-0">
                <h1 className="font-bold text-xl text-neutral-900 tracking-tight leading-tight truncate">
                  Buyurtma hujjati
                </h1>
                <p className="text-sm text-neutral-400 mt-0.5 font-mono">
                  № {doc.code}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {canShare && (
                <Button
                  variant="secondary"
                  onClick={() => setShowShareForm(true)}
                  className="h-10 text-sm font-semibold gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-600 shadow-sm rounded-xl px-4 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                    <path d="m21.854 2.147-10.94 10.939" />
                  </svg>
                  {documentStatus === "REJECTED"
                    ? "Qaytadan yuborish"
                    : "Ko'rib chiqishga yuborish"}
                </Button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-4 items-start">
            <MetaCard
              doc={doc}
              handleOpenPdf={handleOpenPdf}
            />
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
      </PageWrapper>

      <ShareModal
        open={showShareForm}
        onClose={handleCancelShare}
        form={form}
        staffOptions={staffOptions ?? []}
        onSubmit={form.handleSubmit(handleSubmitShare)}
        isSending={isSending}
      />

      <PdfModal open={pdfOpen} onClose={handleClosePdf} doc={doc} />

      <ShareModal
        open={showAddModal}
        onClose={handleCloseAddModal}
        form={form}
        staffOptions={staffOptions ?? []}
        onSubmit={form.handleSubmit(handleAddRecipients)}
        isSending={isModifying}
      />
    </>
  );
};

export default ApplicationDocumentDetailPage;
