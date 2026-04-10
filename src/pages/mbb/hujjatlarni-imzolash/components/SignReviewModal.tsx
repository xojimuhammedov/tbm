import useSignDocumentData from "../hooks/useSignDocumentData";
import { MyModal } from "@/shared/components/moleculas/modal";
import { DATE_TIME } from "@/shared/constants/date.constants";
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
import React, { useState } from "react";
import { useRejectDocument } from "../hooks/useRejectDocument";
import SignActions from "./SignActions";
import useGeneratePdf from "../hooks/useGeneratePdf";

import { UserIcon } from "lucide-react";

const fullName = (u?: { first_name?: string; second_name?: string }) =>
  u ? `${u.first_name ?? ""} ${u.second_name ?? ""}`.trim() : "—";

const getInitials = (fName?: string, sName?: string) => {
  return `${fName?.[0] || ""}${sName?.[0] || ""}`.toUpperCase() || "—";
};

const renderAvatar = (user: any) => {
  if (!user || (!user.first_name && !user.second_name)) {
    return (
      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 shrink-0">
        <UserIcon className="w-4 h-4" />
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-bold text-white shadow-sm shrink-0">
      {getInitials(user.first_name, user.second_name)}
    </div>
  );
};

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

  const docId =
    typeof currentItem === "string"
      ? currentItem
      : currentItem?.document_id?._id ||
        currentItem?.document_id ||
        currentItem?._id;
  
  const initialDocModel =
    typeof currentItem !== "string" && currentItem?.document_model
      ? currentItem.document_model
      : currentItem?.payload_model || "Requisition";

  const { applicationDocumentQuery } = useSignDocumentData(docId as string, initialDocModel);
  const fullDoc = applicationDocumentQuery.data?.data;

  const doc = fullDoc || currentItem;
  const docModel = doc?.document_model || doc?.payload_model || "";
  
  const idToUse = fullDoc?._id || docId;
  const pdfPath = fullDoc?.pdf_path;

  const { generatePdf, isGenerating } = useGeneratePdf(docModel);

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

  React.useEffect(() => {
    if (open) {
      // const isRequisitionOrMemo = docModel === "Requisition" || docModel === "Memo";
      // const targetParams = isRequisitionOrMemo ? (idToUse as string) : (pdfPath as string);
      
      generatePdf(idToUse, pdfPath)
        .then((url) => setPdfUrl(url))
        .catch((err) => {
          console.error("PDF yuklashda xatolik:", err);
          setPdfUrl(null);
        });
    } else {
      setPdfUrl(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, pdfPath, idToUse]);

  if (!doc || !open) return null;

  const renderParticipant = (user: any, role: string) => {
    if (!user) return null;
    return (
      <div className="flex items-center justify-between p-3 border border-slate-100 rounded-xl bg-slate-50/50">
        <div className="flex items-center gap-3">
          {renderAvatar(user)}
          <div>
            <p className="text-[13px] font-semibold text-slate-900 leading-none mb-1">
              {fullName(user)}
            </p>
            <p className="text-[11px] text-slate-500 leading-none">{role}</p>
          </div>
        </div>
        {user.status && (
          <Badge variant={statusColors[user.status] || "default"}>
            {user.status}
          </Badge>
        )}
      </div>
    );
  };

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
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-slate-500 gap-4">
              <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-sky-500 animate-spin"></div>
              Hujjat PDF formati o'qilmoqda...
            </div>
          ) : pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title="PDF Document"
            />
          ) : (
            <div className="p-8 text-center text-gray-500">
              Hujjat ko'rinishi topilmadi
            </div>
          )}
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

              <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                {/* Ariza yuboruvchi */}
                <div className="p-4 flex flex-col justify-center">
                  <p className="text-[12px] text-slate-400 mb-2">
                    Ariza yuboruvchi
                  </p>
                  <div className="flex items-center gap-2.5">
                    {renderAvatar(doc.created_by)}
                    <span
                      className="text-[13px] font-semibold text-slate-900 truncate"
                      title={fullName(doc.created_by)}
                    >
                      {fullName(doc.created_by)}
                    </span>
                  </div>
                </div>

                {/* Yuborilgan vaqt */}
                <div className="p-4 flex flex-col justify-center">
                  <p className="text-[12px] text-slate-400 mb-2">
                    Yuborilgan vaqt
                  </p>
                  <span className="text-[14px] font-semibold text-slate-900">
                    {dateFormatter(
                      doc.created_at || new Date().toISOString(),
                      DATE_TIME,
                    ) || "—"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-slate-100 border-b border-slate-100">
                {/* Hujjat turi */}
                <div className="p-4 flex flex-col justify-center">
                  <p className="text-[12px] text-slate-400 mb-2">Hujjat turi</p>
                  <span className="text-[14px] font-semibold text-slate-900 font-mono">
                    {doc.code || doc.document_code || doc.payload_model || "—"}
                  </span>
                </div>

                {/* Bosqich */}
                <div className="p-4 flex flex-col justify-center gap-2">
                  <p className="text-[12px] text-slate-400">Holat / Bosqich</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge
                      variant={
                        stageColors[doc.stage || doc.document_stage] ||
                        "default"
                      }
                    >
                      {doc.stage || doc.document_stage || "—"}
                    </Badge>
                    <Badge
                      variant={
                        statusColors[doc.status || doc.document_status] ||
                        "default"
                      }
                    >
                      {doc.status || doc.document_status || "—"}
                    </Badge>
                  </div>
                </div>
              </div>

              {(doc.responsible ||
                doc.director ||
                (currentItem?.users && currentItem.users.length > 0) ||
                (currentItem?.signers && currentItem.signers.length > 0)) && (
                <div className="flex flex-col gap-2 p-5 bg-slate-50/30">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Ishtirokchilar
                  </p>

                  {doc.responsible &&
                    renderParticipant(
                      doc.responsible,
                      "Ijrochi (Mas'ul xodim)",
                    )}
                  {doc.director && renderParticipant(doc.director, "Rahbar")}

                  {currentItem?.users?.map((u: any, i: number) => (
                    <React.Fragment key={`user-${i}`}>
                      {renderParticipant(u, "Ko'rib chiquvchi")}
                    </React.Fragment>
                  ))}

                  {currentItem?.signers?.map((u: any, i: number) => (
                    <React.Fragment key={`signer-${i}`}>
                      {renderParticipant(u, "Imzolovchi")}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* SIGN ACTIONS */}
            <SignActions
              documentId={idToUse}
              pdfPath={pdfPath}
              docModel={docModel}
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
