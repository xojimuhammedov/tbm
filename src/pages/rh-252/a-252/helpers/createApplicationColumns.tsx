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
  },
  {
    key: "document_index",
    dataIndex: "document_index",
    name: t("Document Index"),
  },
  {
    key: "order_date",
    dataIndex: "order_date",
    name: t("Order date"),
    render: (val: string) => dateFormatter(val, DATE),
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
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (id: string | undefined) => {
      if (!id) return null;
      return (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("View")}>
            <EyeIcon
              className={
                "size-4 cursor-pointer text-slate-500 hover:text-blue-600 transition-colors"
              }
              onClick={() => handleView(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("Edit")}>
            <EditIcon
              className={
                "size-4 cursor-pointer text-slate-500 hover:text-green-600 transition-colors"
              }
              onClick={() => handleEdit(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("Delete")}>
            <Trash2Icon
              className={
                "size-4 cursor-pointer text-slate-500 hover:text-red-600 transition-colors"
              }
              onClick={() => handleDelete(id)}
            />
          </MyTooltip>
        </div>
      );
    },
  },
];

export default createOrderColumns;
