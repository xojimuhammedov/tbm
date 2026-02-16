import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE } from "@/shared/constants/date.constants.ts";
import {OutgoingInterface} from "@/pages/Journals/outgoing/interfaces/outgoing.interface.ts";

const createOutgoingColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
    selectedRowKeys: string[],
    onSelectRow: (id: string) => void,
    onSelectAll: (ids: string[]) => void,
    allIds: string[],
): ColumnType<OutgoingInterface>[] => [
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
    key: "doc_index",
    dataIndex: "doc_index",
    name: t("Hujjat indeksi"),
  },
  {
    key: "registration_date",
    dataIndex: "registration_date",
    name: t("Sana"),
    render: (val) => (val ? dateFormatter(val, DATE) : "-"),
  },
  {
    key: "recipient",
    dataIndex: "recipient",
    name: t("Qabul qiluvchi"),
  },
  {
    key: "summary",
    dataIndex: "summary",
    name: t("Mazmuni"),
    render: (val: string) => val?.length > 50 ? `${val.substring(0, 50)}...` : val,
  },
  {
    key: "user",
    dataIndex: "user",
    name: t("Mas'ul xodim"),
    render: (user) => {
      return <span>{user?.first_name || "-"}</span>;
    },
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

export default createOutgoingColumns;