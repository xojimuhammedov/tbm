import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon, PencilLineIcon } from "lucide-react"; // ShieldCheckIcon
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import {
  OrderApplication,
  ResponsibleUser,
} from "../interfaces/order.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";

const createOrderColumns = (
    t: (...args: TranslationArgsType) => string,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleView: (id: string) => void,
    handleEditCode: (id: string, code: string) => void,
    // handleEImzo: (id: string) => void,
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
    key: "first_name",
    dataIndex: "responsible",
    name: t("Mas'ul xodim"),
    render: (responsible: ResponsibleUser) => responsible?.first_name || "---",
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Yaratilgan vaqt"),
    render: (val: string | number | Date | undefined) =>
        val ? dateFormatter(val, DATE_TIME) : "---",
  },

  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (id: string | undefined) => {
      if (!id) return null;
      return (
          <div className={"flex items-center gap-2"}>
            {/* E-IMZO — View oldida */}
            {/*<MyTooltip content={t("E-IMZO bilan imzolash")}>*/}
            {/*  <ShieldCheckIcon*/}
            {/*      className={*/}
            {/*        "size-4 cursor-pointer text-slate-500 hover:text-emerald-600 transition-colors"*/}
            {/*      }*/}
            {/*      onClick={() => handleEImzo(id)}*/}
            {/*  />*/}
            {/*</MyTooltip>*/}

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