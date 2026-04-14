import MyTooltip from "@/shared/components/atoms/tooltip/MyTooltip.tsx";

import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EyeIcon } from "lucide-react";
import { SharedItemInterface } from "../interfaces/shared.interface.ts";

const renderHeader = (label: string) => (
  <span style={{ whiteSpace: "nowrap" }}>{label}</span>
);

const renderStage = (status: string | undefined) => {
  let label = status || "---";
  let colorClass = "bg-slate-100 text-slate-700";

  if (status === "DONE") {
    label = "Yakunlangan";
    label = "Yangi";
    colorClass = "bg-purple-100 text-purple-700";
    colorClass = "bg-emerald-100 text-emerald-700";
  } else if (status === "SIGNING") {
    label = "Imzolanmoqda";
    colorClass = "bg-amber-100 text-amber-700";
  } else if (status === "APPROVAL") {
    label = "Kelishilmoqda";
    colorClass = "bg-blue-100 text-blue-700";
  } else if (status === "DRAFT") {
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
};

const renderStatus = (status: string | undefined) => {
  let label = status || "---";
  let colorClass = "bg-slate-100 text-slate-700";

  if (
    status === "ACCEPTED" ||
    status === "DONE" ||
    status === "EXECUTED" ||
    status === "SIGNED"
  ) {
    label = status === "ACCEPTED" ? "Qabul qilingan" : "Imzolangan";
    colorClass = "bg-emerald-100 text-emerald-700";
  } else if (status === "WAITING") {
    label = "Jarayonda";
    colorClass = "bg-blue-100 text-blue-700";
  } else if (status === "PENDING" || status === "IN_REVIEW") {
    label = status === "PENDING" ? "Kutilmoqda" : "Tekshirilmoqda";
    colorClass = "bg-amber-100 text-amber-700";
  } else if (status === "REJECTED") {
    label = "Rad etilgan";
    colorClass = "bg-red-100 text-red-700";
  } else if (status === "BLOCK") {
    label = "Bloklangan";
    colorClass = "bg-stone-100 text-stone-700";
  } else if (status === "DRAFT") {
    label = "Yangi";
    colorClass = "bg-purple-100 text-purple-700";
  } else if (status === "CANCEL") {
    label = "Bekor qilingan";
    colorClass = "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${colorClass}`}
    >
      {label}
    </span>
  );
};

const createSharedColumns = (
  t: (...args: TranslationArgsType) => string,
  handleView: (record: SharedItemInterface) => void,
): ColumnType<SharedItemInterface>[] => [
  {
    key: "document_id",
    dataIndex: "document_id",
    name: t("Hujjat", { defaultValue: "Hujjat" }),
    render: (_, record: any) => record?.document_id?.code || "-",
  },
  {
    key: "stages",
    dataIndex: "stages",
    name: t("Bosqich", { defaultValue: "Bosqich" }),
    render: (value: string | undefined) => renderStage(value),
  },
  {
    key: "document_status",
    dataIndex: "status",
    name: t("Holat", { defaultValue: "Holat" }),
    render: (value: string | undefined) => renderStatus(value),
  },
  {
    key: "actions",
    dataIndex: "document_id",
    name: renderHeader(t("Действия")),
    render: (_, record) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon
            className="size-4 cursor-pointer hover:text-blue-500"
            onClick={() => record && handleView(record)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createSharedColumns;
