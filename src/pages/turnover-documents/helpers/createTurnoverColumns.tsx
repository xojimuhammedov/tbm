import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { TurnoverDocument } from "../interfaces/turnover.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";
import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";

const createTurnoverColumns = (
  t: (...args: TranslationArgsType) => string,
): ColumnType<TurnoverDocument>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("Order code"),
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
    key: "register_code",
    dataIndex: "register_code",
    name: t("Register code"),
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
    key: "copy",
    dataIndex: "copy",
    name: t("Copy"),
    render: (copy: GroupInterface[] | string[]) => {
      if (!copy || copy.length === 0) return "-";
      const names = copy
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
];

export default createTurnoverColumns;
