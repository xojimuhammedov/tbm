import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";

const renderHeader = (label: string) => (
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
);

const renderValue = (value: any) => (
    <span style={{ whiteSpace: 'nowrap' }}>
    {value && value !== "" ? value : "-"}
  </span>
);

const createChannelColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
    selectedRowKeys: string[],
    onSelectRow: (id: string) => void,
    onSelectAll: (ids: string[]) => void,
    allIds: string[],
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
    name: renderHeader(t("Code")),
    render: (value) => renderValue(value),
  },
  {
    key: "flow_code",
    dataIndex: "flow_code",
    name: renderHeader(t("Flow Code")),
    render: (value) => renderValue(value),
  },
  {
    key: "international_stream_number",
    dataIndex: "international_stream_number",
    name: renderHeader(t("Int stream number")),
    render: (value) => renderValue(value),
  },
  {
    key: "rcpu_site_id_a",
    dataIndex: "rcpu_site_id_a",
    name: renderHeader(t("RCPU Site A")),
    render: (value) => renderValue(value),
  },
  {
    key: "icm_a_stream",
    dataIndex: "icm_a_stream",
    name: renderHeader(t("ICM A Stream")),
    render: (value) => renderValue(value),
  },
  {
    key: "rcpu_site_id_z",
    dataIndex: "rcpu_site_id_z",
    name: renderHeader(t("RCPU Site Z")),
    render: (value) => renderValue(value),
  },
  {
    key: "icm_b_stream",
    dataIndex: "icm_b_stream",
    name: renderHeader(t("ICM B Stream")),
    render: (value) => renderValue(value),
  },
  {
    key: "channel_link",
    dataIndex: "channel_link",
    name: renderHeader(t("Channel Link")),
    render: (value) => renderValue(value),
  },
  {
    key: "channel_number_in_stream",
    dataIndex: "channel_number_in_stream",
    name: renderHeader(t("Channel num in Stream")),
    render: (value) => renderValue(value),
  },
  {
    key: "channel_mode",
    dataIndex: "channel_mode",
    name: renderHeader(t("Mode")),
    render: (value) => renderValue(value),
  },
  {
    key: "site_a",
    dataIndex: "site_a",
    name: renderHeader(t("Site A")),
    render: (value) => renderValue(value),
  },
  {
    key: "ne_a_id",
    dataIndex: "ne_a_id",
    name: renderHeader(t("NE A ID")),
    render: (value) => renderValue(value),
  },
  {
    key: "a_port_nms",
    dataIndex: "a_port_nms",
    name: renderHeader(t("A Port NMS")),
    render: (value) => renderValue(value),
  },
  {
    key: "site_z",
    dataIndex: "site_z",
    name: renderHeader(t("Site Z")),
    render: (value) => renderValue(value),
  },
  {
    key: "ne_z_id",
    dataIndex: "ne_z_id",
    name: renderHeader(t("NE Z ID")),
    render: (value) => renderValue(value),
  },
  {
    key: "z_port_nms",
    dataIndex: "z_port_nms",
    name: renderHeader(t("Z Port NMS")),
    render: (value) => renderValue(value),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: renderHeader(t("Created date")),
    render: (date) => renderValue(date ? dateFormatter(date, DATE_TIME) : null),
  },
  {
    key: "updated_at",
    dataIndex: "updated_at",
    name: renderHeader(t("Updated date")),
    render: (date) => renderValue(date ? dateFormatter(date, DATE_TIME) : null),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: renderHeader(t("Actions")),
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