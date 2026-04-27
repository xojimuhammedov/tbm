import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { MbbDocumentInterface } from "../interfaces/MbbDocument.interface";

const createMbbDocumentColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<MbbDocumentInterface>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("So'rov raqami"),
    render: (value: string) => <span className="font-medium">{value}</span>,
  },
  {
    key: "document_type",
    dataIndex: "document_type",
    name: t("Hujjat turi"),
    render: (value: string) => {
      let label = value;
      let colorClass = "bg-gray-100 text-gray-800";

      if (value === "REQUISITION") {
        label = "Talabnoma";
        colorClass = "bg-blue-100 text-blue-800";
      } else if (value === "MEMO") {
        label = "3.3 Ma'lumotnoma";
        colorClass = "bg-green-100 text-green-800";
      } else if (value === "DECLARATION") {
        label = "Bildirgi";
        colorClass = "bg-purple-100 text-purple-800";
      } else if (value === "MEMO_3_3") {
        label = "3.3-T Ma'lumotnoma";
        colorClass = "bg-indigo-100 text-indigo-800";
      }

      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap ${colorClass}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    key: "signer",
    dataIndex: "signer",
    name: t("Qabul qiluvchi"),
    render: (signer: any) =>
      `${signer?.first_name || ""} ${signer?.second_name || ""} ${signer?.middle_name || ""}`,
  },
  {
    key: "created_by",
    dataIndex: "created_by",
    name: t("Yuboruvchi"),
    render: (created_by: any) =>
      `${created_by?.first_name || ""} ${created_by?.second_name || ""} ${created_by?.middle_name || ""}`,
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Status"),
    render: (status: string | undefined) => {
      let label = status || "---";
      let colorClass = "bg-slate-100 text-slate-700";
      if (status === "EXECUTED" || status === "SIGNED") {
        label = "Imzolangan";
        colorClass = "bg-emerald-100 text-emerald-700";
      } else if (status === "SIGNING") {
        label = "Imzolanmoqda";
        colorClass = "bg-amber-100 text-amber-700";
      } else if (status === "IN_REVIEW") {
        label = "Tekshirilmoqda";
        colorClass = "bg-amber-100 text-amber-700";
      } else if (status === "DRAFT") {
        label = "Yangi";
        colorClass = "bg-purple-100 text-purple-700";
      } else if (status === "REJECTED") {
        label = "Rad etildi";
        colorClass = "bg-red-100 text-red-700";
      } else if (status === "CANCEL") {
        label = "Bekor qilindi";
        colorClass = "bg-gray-200 text-gray-700";
      }
      return (
        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${colorClass}`}
        >
          {label}
        </span>
      );
    },
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (rid: string, record: MbbDocumentInterface) => {
      const isFinished =
        record.status === "EXECUTED" || record.status === "SIGNED";

      return (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("View")}>
            <EyeIcon
              className={
                "size-4 cursor-pointer text-gray-500 hover:text-blue-500"
              }
              onClick={() => handleView(rid)}
            />
          </MyTooltip>
          <MyTooltip content={t("Edit")}>
            <EditIcon
              className={`size-4 transition-colors ${
                isFinished
                  ? "opacity-40 cursor-not-allowed text-gray-400"
                  : "cursor-pointer text-gray-500 hover:text-green-500"
              }`}
              onClick={() => !isFinished && handleEdit(rid)}
            />
          </MyTooltip>
          <MyTooltip content={t("Delete")}>
            <Trash2Icon
              className={
                "size-4 cursor-pointer text-gray-500 hover:text-red-500"
              }
              onClick={() => handleDelete(rid)}
            />
          </MyTooltip>
        </div>
      );
    },
  },
];

export default createMbbDocumentColumns;
