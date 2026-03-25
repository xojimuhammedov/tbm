import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE } from "@/shared/constants/date.constants.ts";
import { DecreesInterface } from "@/pages/Journals/decrees/interfaces/decrees.interface.ts";

const createDecreesColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<DecreesInterface>[] => [
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
    key: "registration_date",
    dataIndex: "registration_date",
    name: t("Ro'yxat sanasi"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "summary",
    dataIndex: "summary",
    name: t("Qisqacha mazmuni"),
  },
  {
    key: "prepared_by",
    dataIndex: "prepared_by",
    name: t("Tayyorladi"),
  },
  {
    key: "signed_by",
    dataIndex: "signed_by",
    name: t("Imzoladi"),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: "",
    render: (id) => (
      <div className={"flex items-center gap-3 justify-end"}>
        <MyTooltip content={t("Tahrirlash")}>
          <button
            type="button"
            onClick={() => handleEdit(id)}
            className="hover:bg-blue-50 p-1 rounded-md transition-colors"
          >
            <EditIcon className={"size-4 cursor-pointer text-blue-600"} />
          </button>
        </MyTooltip>

        <MyTooltip content={t("O'chirish")}>
          <button
            type="button"
            onClick={() => handleDelete(id)}
            className="hover:bg-red-50 p-1 rounded-md transition-colors"
          >
            <Trash2Icon className={"size-4 cursor-pointer text-red-600"} />
          </button>
        </MyTooltip>
      </div>
    ),
  },
];

export default createDecreesColumns;
