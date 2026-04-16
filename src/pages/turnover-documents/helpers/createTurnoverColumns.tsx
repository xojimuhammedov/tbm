import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { TurnoverDocument } from "../interfaces/turnover.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

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
    render: (to: string[]) => {
      if (!to || to.length === 0) return "-";
      return (
        <div className="max-w-xs truncate" title={to.join(", ")}>
          {to.join(", ")}
        </div>
      );
    },
  },
  {
    key: "copy",
    dataIndex: "copy",
    name: t("Copy"),
    render: (copy: string[]) => {
      if (!copy || copy.length === 0) return "-";
      return (
        <div className="max-w-xs truncate" title={copy.join(", ")}>
          {copy.join(", ")}
        </div>
      );
    },
  },
  {
    key: "reason",
    dataIndex: "reason",
    name: t("Reason"),
    render: (reason: string) => (
      <div className="max-w-md truncate" title={reason}>
        {reason}
      </div>
    ),
  },
];

export default createTurnoverColumns;
