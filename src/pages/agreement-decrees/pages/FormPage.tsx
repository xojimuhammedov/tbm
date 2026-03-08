import { ApplicationDocument } from "@/pages/imzolash/interfaces/detail.interface";
import useOrderDocument from "@/pages/rh-252/a-252/hooks/useApplicationDocument";
import PageHeader from "@/shared/components/templates/title/PageHeader.tsx";
import { Badge, BreadcrumbInterface } from "dgz-ui";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { ReviewActions } from "../components/ReviewActions";

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

// ─── META CARD ────────────────────────────────────────────────────────────────

function MetaCard({ doc }: { doc: ApplicationDocument }) {
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
      "Holat",
      <Badge key="status-badge" variant={statusColors[doc.status] || "default"}>
        {doc.status || "—"}
      </Badge>,
    ],
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

const FormPage = () => {
  const { t } = useTranslation();
  const breadcrumbs = useMemo<BreadcrumbInterface[]>(
    () => [
      {
        name: t("Farmoyish tasdiqlash", {
          defaultValue: "Farmoyish tasdiqlash",
        }),
        path: "/agreement-decrees",
        isActive: true,
      },
    ],
    [t],
  );
  const { id, sharedId } = useParams<{ id: string; sharedId: string }>();

  const { applicationDocumentQuery } = useOrderDocument(id as string);
  const doc = applicationDocumentQuery.data?.data as
    | ApplicationDocument
    | undefined;

  return (
    <>
      <PageHeader className={"sticky top-0"} breadcrumbs={breadcrumbs} />
      <div className="min-h-screen bg-[#f1f3f6] px-4 py-7 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-4 items-start">
          {doc && <MetaCard doc={doc} />}
          {doc && (
            <ReviewActions
              id={sharedId as string}
              onSuccess={() => applicationDocumentQuery.refetch()}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default FormPage;
