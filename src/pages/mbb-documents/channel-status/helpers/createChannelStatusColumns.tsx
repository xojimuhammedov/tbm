import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ChannelStatusDocument } from "../interfaces/channel-status.interface";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";

const createChannelStatusColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<ChannelStatusDocument>[] => [
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
    key: "device_type",
    dataIndex: "device_type",
    name: t("Qurilma turi"),
  },
  {
    key: "point_name",
    dataIndex: "point_name",
    name: t("Nuqta nomi"),
  },
  {
    key: "duty_officer",
    dataIndex: "duty_officer",
    name: t("Navbatchi"),
  },
  {
    key: "ko_status_at_shift_handover",
    dataIndex: "ko_status_at_shift_handover",
    name: t("KO holati"),
  },
  {
    key: "shift_handover_at",
    dataIndex: "shift_handover_at",
    name: t("Smenani topshirish vaqti"),
    render: (val) => dateFormatter(val, DATE_TIME),
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

export default createChannelStatusColumns;
