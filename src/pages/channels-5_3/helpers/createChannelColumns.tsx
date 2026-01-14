import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";

const createChannelColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
    selectedRowKeys: string[],
    onSelectRow: (id: string) => void,
    onSelectAll: (ids: string[]) => void,
    allIds: string[]
): ColumnType<ChannelInterface>[] => [
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
    key: "code",
    dataIndex: "code",
    name: t("Code"),
  },
  {
    key: "stream_identifier",
    dataIndex: "stream_identifier",
    name: t("Stream identifier"),
  },
  {
    key: "channel_identifier",
    dataIndex: "channel_identifier",
    name: t("Channel identifier"),
  },
  {
    key: "site_a",
    dataIndex: "site_a",
    name: t("Site A"),
  },
  {
    key: "site_z",
    dataIndex: "site_z",
    name: t("Site Z"),
  },
  {
    key: "updated_at",
    dataIndex: "updated_at",
    name: t("Updated date"),
    render: (updated_at) => dateFormatter(updated_at, DATE_TIME),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t(""),
    render: (id) => (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("Edit")}>
            <EditIcon
                className={"size-4 cursor-pointer text-blue-500"}
                onClick={() => handleEdit(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("Delete")}>
            <Trash2Icon
                className={"size-4 cursor-pointer text-red-500"}
                onClick={() => handleDelete(id)}
            />
          </MyTooltip>
        </div>
    ),
  },
];

export default createChannelColumns;