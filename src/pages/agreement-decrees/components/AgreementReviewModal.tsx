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
import React, { useState } from "react";
import { useReviewDocument } from "../hooks/useReviewDocument";

import OrderApplicationView1731 from "@/pages/rh-252/a-252/components/View/1731view";
import OrderApplicationView1733 from "@/pages/rh-252/a-252/components/View/1733view";
import OrderApplicationView1745 from "@/pages/rh-252/a-252/components/View/1745view";
import OrderView1748 from "@/pages/rh-252/a-252/components/View/1748view";
import OrderApplicationView1754 from "@/pages/rh-252/a-252/components/View/1754view";
import OrderApplicationView1770 from "@/pages/rh-252/a-252/components/View/1770view";

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

interface AgreementReviewModalProps {
  open: boolean;
  onClose: () => void;
  currentItem: any | null;
  sharedId?: string;
  onSuccess?: () => void;
}

export const AgreementReviewModal: React.FC<AgreementReviewModalProps> = ({
  open,
  onClose,
  currentItem,
  sharedId,
  onSuccess,
}) => {
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [comment, setComment] = useState("");

  const { reviewQuery, isPending } = useReviewDocument(sharedId || "", () => {
    setIsRejectModalOpen(false);
    setIsApproveModalOpen(false);
    setComment("");
    if (onSuccess) onSuccess();
    onClose();
  });

  const handleApprove = () => {
    reviewQuery.mutate({
      status: "ACCEPTED",
    });
  };

  const handleReject = () => {
    if (!comment.trim()) return;
    reviewQuery.mutate({
      status: "REJECTED",
      comment,
    });
  };

  const { applicationDocumentQuery } = useOrderDocument(
    currentItem?._id as string,
  );
  const fullDoc = applicationDocumentQuery.data?.data;

  // Fallback to currentItem if fullDoc is still loading
  const doc = fullDoc || currentItem;

  if (!doc) return null;

  const renderOrderView = () => {
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

  console.log(doc);

  const rows: [string, React.ReactNode][] = [
    ["Buyurtma sanasi", dateFormatter(doc.order_date, DATE) || "—"],
    ["Yaratilgan vaqt", dateFormatter(doc.created_at, DATE_TIME) || "—"],
    ["Rahbar", fullName(doc.director)],
    ["Mas'ul xodim", fullName(doc.responsible)],
    ["Yaratuvchi", fullName(doc.created_by)],
    [
      "Kimga",
      (doc.to
        ?.slice(0, 1)
        .map((item: any) => item?.name)
        .join(", ") ?? "") +
        (doc.to?.length > 1 ? ` +${doc.to.length - 1}` : ""),
    ],
    ["Nusxasi", doc.copy?.join(", ") ?? "—"],
    [
      "Holat",
      <Badge key="status-badge" variant={statusColors[doc.status] || "default"}>
        {doc.status || "—"}
      </Badge>,
    ],
  ];

  return (
    <MyModal
      open={open}
      onOpenChange={(v) => !v && onClose()}
      size="8xl"
      className="w-[100vw] h-[100dvh] lg:w-auto lg:h-[95vh] flex flex-col p-0 overflow-hidden rounded-none lg:rounded-xl"
    >
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* LEFT SIDE: Document View */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-100 border-b lg:border-b-0 lg:border-r border-gray-200">
          {renderOrderView()}
        </div>

        {/* RIGHT SIDE: Metadata and Actions */}
        <div className="w-full lg:w-[480px] h-1/2 lg:h-auto flex flex-col bg-white shrink-0">
          <div className="flex-1 overflow-auto p-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden h-fit mb-4">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-1.5">
                  Hujjat ma'lumotlari
                </p>
                <p className="font-extrabold text-[15px] text-slate-900 leading-snug tracking-tight">
                  {doc.payload?.basic?.title ||
                    `Hujjat raqami: ${doc.code || "Nomaʼlum"}`}
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
          </div>

          {/* ACTIONS BAR (Bottom) */}
          <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
            <Button variant="secondary" onClick={onClose} disabled={isPending}>
              Yopish
            </Button>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={() => setIsRejectModalOpen(true)}
                disabled={isPending}
              >
                Rad etish
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setIsApproveModalOpen(true)}
                disabled={isPending}
              >
                Tasdiqlash
              </Button>
            </div>
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

      {/* NESTED MODAL: APPROVE CONFIRMATION */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tasdiqlash</DialogTitle>
          </DialogHeader>
          <div className="py-6 text-center text-lg font-medium">
            Haqiqatdan ham tasdiqlaysizmi?
          </div>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setIsApproveModalOpen(false)}
              disabled={isPending}
            >
              Yo'q
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={handleApprove}
              disabled={isPending}
            >
              Ha, tasdiqlayman
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MyModal>
  );
};
