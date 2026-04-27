import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { TvRvOutputLogDocument } from "../interfaces/tv-rv-output-log.interface";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants.ts";

const createTvRvOutputLogColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<TvRvOutputLogDocument>[] => [
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
    key: "record_date",
    dataIndex: "record_date",
    name: t("Sana"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "output_type",
    dataIndex: "output_type",
    name: t("Turi"),
  },
  {
    key: "tv_output_section",
    dataIndex: "tv_output_section",
    name: t("Bo'lim"),
  },
  {
    key: "planned_time",
    dataIndex: "planned_time",
    name: t("Rejalashtirilgan vaqt"),
    render: (val) => dateFormatter(val, DATE_TIME),
  },
  {
    key: "actual_time",
    dataIndex: "actual_time",
    name: t("Haqiqiy vaqt"),
    render: (val) => dateFormatter(val, DATE_TIME),
  },
  {
    key: "recipient_address",
    dataIndex: "recipient_address",
    name: t("Qabul qiluvchi manzili"),
  },
  {
    key: "transferred_to",
    dataIndex: "transferred_to",
    name: t("Kimga uzatildi"),
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

export default createTvRvOutputLogColumns;
