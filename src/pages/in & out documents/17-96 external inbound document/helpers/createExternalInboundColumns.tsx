import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ExternalInboundDocument } from "@/pages/in & out documents/17-96 external inbound document/interfaces/ex-in.interface.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

const createExternalInboundColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
): ColumnType<ExternalInboundDocument>[] => [
  {
    key: "reg_num",
    dataIndex: "reg_num",
    name: t("Ro'yxat raqami"),
  },
  {
    key: "reg_date",
    dataIndex: "reg_date",
    name: t("Sana"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "organization",
    dataIndex: "organization",
    name: t("Tashkilot"),
  },
  {
    key: "content",
    dataIndex: "content",
    name: t("Mazmuni"),
  },
  {
    key: "assignee",
    dataIndex: "assignee",
    name: t("Ijrochi"),
  },
  {
    key: "deadline",
    dataIndex: "deadline",
    name: t("Muddat"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Holat"),
    render: (status) => (
      <span className={`status-badge status-${status}`}>
        {t(status.charAt(0).toUpperCase() + status.slice(1))}
      </span>
    ),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t(""),
    render: (id) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("Tahrirlash")}>
          <EditIcon
            className={"size-4 cursor-pointer text-blue-500"}
            onClick={() => handleEdit(id)}
          />
        </MyTooltip>
        <MyTooltip content={t("O'chirish")}>
          <Trash2Icon
            className={"size-4 cursor-pointer text-red-500"}
            onClick={() => handleDelete(id)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createExternalInboundColumns;
