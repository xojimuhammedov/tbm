import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";
import { dateFormatter } from "@/shared/utils/utils";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, FileDown, FileSignature, PencilLineIcon, ShieldCheckIcon, Trash2Icon } from "lucide-react";
import {
  OrderApplication,
  ResponsibleUser,
} from "../interfaces/order.interface";

const createOrderColumns = (
    t: (...args: TranslationArgsType) => string,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleView: (id: string) => void,
    handleEditCode: (id: string, code: string) => void,
    handleEImzo: (id: string) => void,
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
        // whitespace-nowrap matnni bir qatorga majburlaydi
        render: (val: string) => (
            <span className="whitespace-nowrap">
        {dateFormatter(val, DATE)}
      </span>
        ),
    },
  {
    key: "to",
    dataIndex: "to",
    name: t("To"),
    render: (to: string[]) => {
      if (!to || to.length === 0) return "-";
      return (
          <div className="max-w-xs truncate" title={to.join(", ")}>
            {to.slice(0, 2).join(", ")}
            {to.length > 2 && (
                <span className="text-gray-500 font-medium"> +{to.length - 2}</span>
            )}
          </div>
      );
    },
  },
  {
    key: "first_name",
    dataIndex: "responsible",
    name: t("Mas'ul xodim"),
    render: (responsible: ResponsibleUser) => responsible?.first_name+" "+ responsible?.second_name || "---",
  },
    {
        key: "name",
        dataIndex: "created_by",
        name: t("Yaratuvchi"),
        render: (responsible: ResponsibleUser) => responsible?.first_name +" "+ responsible?.second_name || "---",
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

     if (status === "EXECUTED" ||  status === "SIGNED") {
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
      }


      return (
        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${colorClass}`}>
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

      const isFinished = record.status === "SIGNED" || record.status === "EXECUTED";
      const hasPdf = !!record.pdf_path;

      const handleDownloadPdf = () => {
         if (record.pdf_path) {
             const fileName = record.pdf_path.split('/').pop();
             if (fileName) {
                 window.open(`/api/temp-pdf/${fileName}`, '_blank');
             }
         }
      };

      return (
          <div className={"flex items-center gap-2 justify-end"}>
              {!isFinished ? (
                  <>
                      <MyTooltip content={t("Imzolash jarayoni")}>
                          <FileSignature
                              className="size-4 cursor-pointer text-slate-500 hover:text-emerald-600 transition-colors"
                              onClick={() => handleEImzoProgress(id)}
                          />
                      </MyTooltip>
                      <MyTooltip content={t("E-IMZO bilan imzolash")}>
                          <ShieldCheckIcon
                              className="size-4 cursor-pointer text-slate-500 hover:text-blue-600 transition-colors"
                              onClick={() => handleEImzo(id)}
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

              <div className="h-4 w-[1px] bg-slate-200 mx-1" />

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