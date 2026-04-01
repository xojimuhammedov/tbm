import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { LocalInboundInterface } from "@/pages/in & out documents/17-98 local inbound document/interfaces/local.inbound.interface.ts";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

const createLocalInboundColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<LocalInboundInterface>[] => [
  {
    key: "selection",
    dataIndex: "_id",
    name: (
      <input
        type="checkbox"
        className="cursor-pointer size-4"
        onChange={(e) => onSelectAll(e.target.checked ? allIds : [])}
        checked={allIds.length > 0 && selectedRowKeys.length === allIds.length}
      />
    ),
    render: (id: string) => (
      <input
        type="checkbox"
        className="cursor-pointer size-4"
        checked={selectedRowKeys.includes(id)}
        onChange={() => onSelectRow(id)}
      />
    ),
  },
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
    key: "journal_index",
    dataIndex: "journal_index",
    name: t("Jurnal indeksi"),
  },
  {
    key: "recipient",
    dataIndex: "recipient",
    name: t("Qabul qiluvchi"),
  },
  {
    key: "summary",
    dataIndex: "summary",
    name: t("Qisqacha mazmuni"),
  },
  {
    key: "order_id",
    dataIndex: "order_id",
    name: t("Buyruq ID"),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t("Amallar"),
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

export default createLocalInboundColumns;
