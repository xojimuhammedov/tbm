import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { MaintenanceLogDocument } from "../interfaces/maintenance-log.interface";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";

const createMaintenanceLogColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<MaintenanceLogDocument>[] => [
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
    key: "scheduled_at",
    dataIndex: "scheduled_at",
    name: t("Rejalashtirilgan vaqt"),
    render: (val) => dateFormatter(val, DATE_TIME),
  },
  {
    key: "actual_at",
    dataIndex: "actual_at",
    name: t("Haqiqiy vaqt"),
    render: (val) => dateFormatter(val, DATE_TIME),
  },
  {
    key: "ko_number",
    dataIndex: "ko_number",
    name: t("KO raqami"),
  },
  {
    key: "channel_designation",
    dataIndex: "channel_designation",
    name: t("Kanal belgisi"),
  },
  {
    key: "maintenance_type",
    dataIndex: "maintenance_type",
    name: t("Texnik xizmat turi"),
  },
  {
    key: "mbb_zone",
    dataIndex: "mbb_zone",
    name: t("MBB zonasi"),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t(""),
    render: (id) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("Tahrirlash")}>
          <EditIcon className={"size-4 cursor-pointer text-blue-500"} onClick={() => handleEdit(id)} />
        </MyTooltip>
        <MyTooltip content={t("O'chirish")}>
          <Trash2Icon className={"size-4 cursor-pointer text-red-500"} onClick={() => handleDelete(id)} />
        </MyTooltip>
      </div>
    ),
  },
];

export default createMaintenanceLogColumns;
