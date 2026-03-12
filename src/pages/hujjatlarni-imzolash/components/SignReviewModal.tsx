import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument";
import { MyModal } from "@/shared/components/moleculas/modal";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { dateFormatter } from "@/shared/utils/utils";
import { Badge } from "dgz-ui";
import { Button } from "dgz-ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "dgz-ui/dialog";
import React, { useEffect, useState } from "react";
import { useRejectDocument } from "../hooks/useRejectDocument";
import SignActions from "./SignActions";

import useGeneratePdf from "@/pages/imzolash/hooks/useGeneratePdf";
import { FileTextIcon, LoaderCircleIcon } from "lucide-react";

const fullName = (u?: { first_name?: string; second_name?: string }) =>
  u ? `${u.first_name ?? ""} ${u.second_name ?? ""}`.trim() : "—";

const statusColors: Record<
  string,
  "red" | "orange" | "green" | "gray" | "default"
> = {
  IN_REVIEW: "orange",
  ACCEPTED: "green",
  REJECTED: "red",
  PENDING: "orange",
  DONE: "green",
  DRAFT: "gray",
};

const stageColors: Record<
  string,
  "gray" | "blue" | "indigo" | "green" | "default"
> = {
  DRAFT: "gray",
  SIGNING: "blue",
  APPROVAL: "indigo",
  DONE: "green",
};

interface SignReviewModalProps {
  open: boolean;
  onClose: () => void;
  currentItem: any | null;
  sharedId?: string;
  onSuccess?: () => void;
}

export const SignReviewModal: React.FC<SignReviewModalProps> = ({
  open,
  onClose,
  currentItem,
  sharedId,
  onSuccess,
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const { generatePdf, isGenerating } = useGeneratePdf();

  const { rejectQuery, isPending } = useRejectDocument(sharedId || "", () => {
    setIsRejectModalOpen(false);
    setComment("");
    if (onSuccess) onSuccess();
    onClose();
  });

  const handleReject = () => {
    if (!comment.trim()) return;
    rejectQuery.mutate({
      status: "REJECTED",
      comment,
    });
  };

  const docId =
    typeof currentItem === "string"
      ? currentItem
      : currentItem?.document_id?._id ||
        currentItem?.document_id ||
        currentItem?._id;
  const { applicationDocumentQuery } = useOrderDocument(docId as string);
  const fullDoc = applicationDocumentQuery.data?.data;

  const doc = fullDoc || currentItem;
  const idToUse = fullDoc?._id || docId;

  useEffect(() => {
    if (open && idToUse && !pdfUrl && !isGenerating) {
      generatePdf(idToUse)
        .then((url) => setPdfUrl(url))
        .catch((e) => console.error("PDF generation failed:", e));
    }
    if (!open && pdfUrl) {
      setPdfUrl(null);
    }
  }, [open, docId, fullDoc?._id]);

  if (!doc || !open) return null;

  const rows: [string, React.ReactNode][] = [
    ["Buyurtma sanasi", dateFormatter(doc.order_date, DATE) || "—"],
    ["Yaratilgan vaqt", dateFormatter(doc.created_at, DATE_TIME) || "—"],
    ["Rahbar", fullName(doc.director)],
    ["Mas'ul xodim", fullName(doc.responsible)],
    ["Yaratuvchi", fullName(doc.created_by)],
    [
      "Kimga",
      (doc.to?.slice(0, 2).join(", ") ?? "") +
        (doc.to?.length > 2 ? ` +${doc.to.length - 2}` : ""),
    ],
    ["Nusxasi", doc.copy?.join(", ") ?? "—"],
    [
      "Bosqich",
      <Badge
        key="stage-badge"
        variant={stageColors[doc.stage || doc.document_stage] || "default"}
      >
        {doc.stage || doc.document_stage || "—"}
      </Badge>,
    ],
    [
      "Holat",
      <Badge
        key="status-badge"
        variant={statusColors[doc.status || doc.document_status] || "default"}
      >
        {doc.status || doc.document_status || "—"}
      </Badge>,
    ],
  ];

  return (
    <MyModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      size="8xl"
      className="w-[100vw] h-[100dvh] lg:w-[95vw] xl:w-[90vw] 2xl:w-[85vw] lg:max-w-[1800px] lg:h-[95vh] flex flex-col p-0 overflow-hidden rounded-none lg:rounded-xl"
    >
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* LEFT SIDE: Document View */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="bg-neutral-100 h-full flex items-center justify-center p-5">
            {isGenerating ? (
              <div className="flex flex-col items-center gap-3">
                <LoaderCircleIcon className="size-7 text-blue-500 animate-spin" />
                <span className="text-sm text-neutral-500 font-medium">
                  Hujjat yuklanmoqda...
                </span>
              </div>
            ) : pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-full rounded-xl border border-neutral-200 shadow-sm bg-white"
                title="Hujjat PDF"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-neutral-400">
                <FileTextIcon className="size-8 opacity-30" />
                <span className="text-sm">PDF topilmadi</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: Metadata and Actions */}
        <div className="w-full lg:w-[480px] h-1/2 lg:h-auto flex flex-col bg-white shrink-0">
          <div className="flex-1 overflow-auto p-5 space-y-4">
            <div className="flex justify-end p-2 pb-0 lg:hidden">
              <Button
                variant="secondary"
                onClick={onClose}
                disabled={isPending}
              >
                Yopish
              </Button>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit mb-4">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-1.5">
                  Hujjat ma'lumotlari
                </p>
                <p className="font-extrabold text-[15px] text-slate-900 leading-snug tracking-tight">
                  {doc.payload?.basic?.title ||
                    `Hujjat raqami: ${doc.code || doc.document_code || "Nomaʼlum"}`}
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

            {/* SIGN ACTIONS */}
            <SignActions
              documentId={idToUse}
              onReject={() => setIsRejectModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* NESTED MODAL: REJECT */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rad etish</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <textarea
              className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-none shadow-sm"
              rows={4}
              placeholder="Rad etish sababini kiriting..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsRejectModalOpen(false)}
              disabled={isPending}
            >
              Bekor qilish
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={isPending || !comment.trim()}
            >
              Yuborish
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MyModal>
  );
};
