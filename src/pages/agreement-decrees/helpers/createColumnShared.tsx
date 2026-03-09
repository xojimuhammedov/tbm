import MyTooltip from "@/shared/components/atoms/tooltip/MyTooltip.tsx";
import { dayjs } from "@/shared/utils/day.ts";
import { Badge } from "dgz-ui";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { AlertCircle, CheckCircle2, EyeIcon, XCircle } from "lucide-react";
import {
  SharedItemInterface,
  SharedStatus,
} from "../interfaces/shared.interface.ts";

const renderHeader = (label: string) => (
  <span style={{ whiteSpace: "nowrap" }}>{label}</span>
);


const statusColors: Record<
  string,
  "red" | "orange" | "green" | "gray" | "default"
> = {
  REJECTED: "red",
  PENDING: "orange",
  ACCEPTED: "green",
  CANCEL: "gray",
};

const createSharedColumns = (
  t: (...args: TranslationArgsType) => string,
  handleView: (record: SharedItemInterface) => void,
): ColumnType<SharedItemInterface>[] => [
    {
      key: "document_id",
      dataIndex: "document_id",
      name: t("Hujjat", { defaultValue: "Hujjat" }),
      render: (_, record) => record.document_id?.code || "-",
    },
    {
      key: "from_id",
      dataIndex: "from_id",
      name: t("Jo'natgan odam", { defaultValue: "Jo'natgan odam" }),
      render: (_, record) => {
        const from = record.from_id;
        if (!from) return "-";
        return `${from.second_name || ""} ${from.first_name || ""} ${from.middle_name || ""}`.trim();
      },
    },
    {
      key: "created_at",
      dataIndex: "created_at",
      name: t("Jo'natilgan vaqt", { defaultValue: "Jo'natilgan vaqt" }),
      render: (value: string) => {
        return value ? dayjs(value).format("DD.MM.YYYY HH:mm") : "-";
      },
    },
    {
      key: "status",
      dataIndex: "status",
      name: t("Holat", { defaultValue: "Holat" }),
      render: (value: SharedStatus) => {
        if (value === "PENDING") {
          return (
            <span className="inline-flex items-center px-2  rounded-md border border-purple-200 text-[12px] font-medium bg-purple-100 text-purple-700">
              {t("Yangi", { defaultValue: "Yangi" })}
            </span>
          );
        }
        if (value === "ACCEPTED") {
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-green-200 text-[13px] font-medium bg-green-100 text-green-700">
              <CheckCircle2 className="w-4 h-4 fill-green-500 text-white" />
              {t("Imzolangan", { defaultValue: "Imzolangan" })}
            </span>
          );
        }
        if (value === "REJECTED") {
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-red-200 text-[13px] font-medium bg-red-100 text-red-700">
              <XCircle className="w-4 h-4 fill-red-500 text-white" />
              {t("Rad etilgan", { defaultValue: "Rad etilgan" })}
            </span>
          );
        }
        if (value === "CANCEL") {
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-slate-200 text-[13px] font-medium bg-slate-100 text-slate-700">
              <AlertCircle className="w-4 h-4" />
              {t("Bekor qilingan", { defaultValue: "Bekor qilingan" })}
            </span>
          );
        }
        return <Badge variant={statusColors[value] || "default"}>{value || "-"}</Badge>;
      },
    },
    {
      key: "document_id",
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
