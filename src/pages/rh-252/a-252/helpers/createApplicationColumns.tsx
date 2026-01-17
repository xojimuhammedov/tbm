import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { OrderApplication } from "../interfaces/order.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

const createOrderColumns = (
    t: (...args: TranslationArgsType) => string,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleView: (id: string) => void,
): ColumnType<OrderApplication>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("Order code"),
    render: (code: string) => {
      // Code formatidan turni aniqlash: "17-45-12/123" -> "17-45"
      const codeType = code?.split("-").slice(0, 2).join("-") || "";
      return (
          <span className={codeType === "17-54" ? "text-blue-600 font-semibold" : "text-green-600 font-semibold"}>
                    {code}
                </span>
      );
    },
  },
  {
    key: "document_index",
    dataIndex: "code",
    name: t("Document number"),
    render: (code: string) => {
      // "17-45-12/123" formatidan raqamni olish
      const parts = code?.split("-");
      if (parts && parts.length >= 3) {
        return parts.slice(2).join("-"); // "12/123"
      }
      return code;
    },
  },
  {
    key: "order_date",
    dataIndex: "order_date",
    name: t("Order date"),
    render: (val: string) => dateFormatter(val, DATE),
  },
  {
    key: "organization",
    dataIndex: "document_type",
    name: t("Document Type"),
    render: (docType: string) => {
      return docType || "-";
    },
  },
  {
    key: "type",
    dataIndex: "code",
    name: t("Type"),
    render: (code: string) => {
      const codeType = code?.split("-").slice(0, 2).join("-") || "";
      if (codeType === "17-54") {
        return <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">TV-RV</span>;
      } else if (codeType === "17-45") {
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">Flows</span>;
      }
      return "-";
    },
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Status"),
    render: (status: string) => {
      const statusColors: Record<string, string> = {
        pending: "bg-yellow-100 text-yellow-700",
        approved: "bg-green-100 text-green-700",
        rejected: "bg-red-100 text-red-700",
      };
      return (
          <span className={`px-2 py-1 rounded text-xs ${statusColors[status] || "bg-gray-100 text-gray-700"}`}>
                    {status}
                </span>
      );
    },
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (id: string | undefined) => {
      if (!id) return null;
      return (
          <div className={"flex items-center gap-2"}>
            <MyTooltip content={t("View")}>
              <EyeIcon
                  className={"size-4 cursor-pointer hover:text-blue-600"}
                  onClick={() => handleView(id)}
              />
            </MyTooltip>
            <MyTooltip content={t("Edit")}>
              <EditIcon
                  className={"size-4 cursor-pointer hover:text-green-600"}
                  onClick={() => handleEdit(id)}
              />
            </MyTooltip>
            <MyTooltip content={t("Delete")}>
              <Trash2Icon
                  className={"size-4 cursor-pointer hover:text-red-600"}
                  onClick={() => handleDelete(id)}
              />
            </MyTooltip>
          </div>
      );
    },
  },
];

export default createOrderColumns;