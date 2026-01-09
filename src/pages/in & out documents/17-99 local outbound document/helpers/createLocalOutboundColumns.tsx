import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import {
  LocalOutboundInterface
} from "@/pages/in & out documents/17-99 local outbound document/interfaces/local.outbound.interface.ts";

const createLocalOutboundColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
): ColumnType<LocalOutboundInterface>[] => [
  {
    key: "reg_num",
    dataIndex: "reg_num",
    name: t("Reg. №"),
  },
  {
    key: "reg_date",
    dataIndex: "reg_date",
    name: t("Sana"),
  },
  {
    key: "journal_index",
    dataIndex: "journal_index",
    name: t("Jurnal indeksi"),
  },
  {
    key: "recipient_address",
    dataIndex: "recipient_address",
    name: t("Qabul qiluvchi"),
  },
  {
    key: "summary",
    dataIndex: "summary",
    name: t("Qisqacha mazmun"),
    render: (text) => <div className="max-w-[250px] truncate" title={text}>{text}</div>
  },
  {
    key: "notes",
    dataIndex: "notes",
    name: t("Eslatma"),
    render: (text) => <span className="text-orange-600 font-semibold">{text}</span>
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t("Amallar"),
    render: (id) => (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("Tahrirlash")}>
            <EditIcon
                className={"size-4 cursor-pointer hover:text-blue-500 transition-colors"}
                onClick={() => handleEdit(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("O'chirish")}>
            <Trash2Icon
                className={"size-4 cursor-pointer hover:text-red-500 transition-colors"}
                onClick={() => handleDelete(id)}
            />
          </MyTooltip>
        </div>
    ),
  },
];

export default createLocalOutboundColumns;