import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { dateFormatter } from "@/shared/utils/utils";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import {
  EditIcon,
  XCircleIcon,
  EyeIcon,
  FileDown,
  FileSignature,
  PencilLineIcon,
  Trash2Icon,
} from "lucide-react";
import { OrderApplication } from "../interfaces/order.interface";

const CANCEL_DOCUMENT_TYPES = new Set(["17_70", "17_48", "12_14", "12_34"]);
const createOrderColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
  handleEditCode: (id: string, code: string) => void,
  handleCancel: (id: string) => void,
  handleEImzoProgress: (id: string) => void,
): ColumnType<OrderApplication>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("Order code"),
    render: (code: string | undefined, record: OrderApplication) => {
      if (!code || !record._id) return code || "-";
      return (
        <div className="flex items-center gap-2">
          <span>{code}</span>
          <MyTooltip content={t("Edit code")}>
            <PencilLineIcon
              className="size-3.5 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleEditCode(record._id!, code);
              }}
            />
          </MyTooltip>
        </div>
      );
    },
  },
  {
    key: "order_date",
    dataIndex: "order_date",
    name: t("Order date"),
    render: (val: string) => (
      <span className="whitespace-nowrap">{dateFormatter(val, DATE)}</span>
    ),
  },
  {
    key: "to",
    dataIndex: "to",
    name: t("To"),
    render: (to: GroupInterface[] | string[]) => {
      if (!to || to.length === 0) return "-";
      const names = to
        .map((g: any) => (typeof g === "string" ? g : g.name))
        .filter(Boolean);
      return (
        <div className="max-w-xs truncate" title={names.join(", ")}>
          {names.slice(0, 2).join(", ")}
          {names.length > 2 && (
            <span className="text-gray-500 font-medium">
              {" "}
              +{names.length - 2}
            </span>
          )}
        </div>
      );
    },
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Yaratilgan vaqt"),
    render: (val: string | number | Date | undefined) =>
      val ? dateFormatter(val, DATE_TIME) : "---",
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
    render: (id: string | undefined, record: OrderApplication) => {
      if (!id) return null;

      const isFinished =
        record.status === "SIGNED" || record.status === "EXECUTED";
      const hasPdf = !!record.pdf_path;

      const documentType = (record as any)?.document_type ?? record.code;
      const showCancel = CANCEL_DOCUMENT_TYPES.has(documentType);

      const handleDownloadPdf = () => {
        if (record.pdf_path) {
          const fileName = record.pdf_path.split("/").pop();
          if (fileName) {
            window.open(`/api/temp-pdf/${fileName}`, "_blank");
          }
        }
      };

      return (
        <div className={"flex items-center gap-2 justify-end"}>
          {showCancel && (
            <MyTooltip content={t("Cancel")}>
              <XCircleIcon
                className="size-4 cursor-pointer text-red-500 hover:text-red-600 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel(id);
                }}
              />
            </MyTooltip>
          )}
          {!isFinished ? (
            <>
              <MyTooltip content={t("Imzolash jarayoni")}>
                <FileSignature
                  className="size-4 cursor-pointer text-slate-500 hover:text-emerald-600 transition-colors"
                  onClick={() => handleEImzoProgress(id)}
                />
              </MyTooltip>
            </>
          ) : (
            hasPdf && (
              <MyTooltip content={t("PDF yuklab olish")}>
                <FileDown
                  className="size-4 cursor-pointer text-emerald-600 hover:text-emerald-700 transition-colors"
                  onClick={handleDownloadPdf}
                />
              </MyTooltip>
            )
          )}

          <MyTooltip content={t("View")}>
            <EyeIcon
              className="size-4 cursor-pointer text-slate-500 hover:text-indigo-600 transition-colors"
              onClick={() => handleView(id)}
            />
          </MyTooltip>

          <MyTooltip content={t("Edit")}>
            <EditIcon
              className="size-4 cursor-pointer text-slate-500 hover:text-amber-600 transition-colors"
              onClick={() => handleEdit(id)}
            />
          </MyTooltip>

          <MyTooltip content={t("Delete")}>
            <Trash2Icon
              className="size-4 cursor-pointer text-slate-500 hover:text-red-600 transition-colors"
              onClick={() => handleDelete(id)}
            />
          </MyTooltip>
        </div>
      );
    },
  },
];

export default createOrderColumns;
