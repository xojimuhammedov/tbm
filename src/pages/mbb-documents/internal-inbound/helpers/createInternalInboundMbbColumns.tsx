import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { InternalInboundMbbDocument } from "@/pages/mbb-documents/internal-inbound/interfaces/internal-inbound-mbb.interface";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

const createInternalInboundMbbColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<InternalInboundMbbDocument>[] => [
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
    key: "organization",
    dataIndex: "organization",
    name: t("Tashkilot"),
  },
  {
    key: "summary",
    dataIndex: "summary",
    name: t("Qisqacha mazmuni"),
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

export default createInternalInboundMbbColumns;
