import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ChannelInterface } from "@/pages/channels-5_3/interfaces/channel.interface.ts";

const renderHeader = (label: string) => (
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
);

const renderValue = (value: any) => {
  if (!value || value === "") return <span>-</span>;

  const stringValue = value.toString();
  const maxLength = 40;

  if (stringValue.length > maxLength) {
    const truncated = stringValue.substring(0, maxLength) + "...";
    return (
        <MyTooltip content={stringValue}>
        <span style={{ whiteSpace: 'nowrap', cursor: 'pointer' }}>
          {truncated}
        </span>
        </MyTooltip>
    );
  }

  return <span style={{ whiteSpace: 'nowrap' }}>{stringValue}</span>;
};

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
    key: "flow_code",
    dataIndex: "flow_code",
    name: renderHeader(t("ID")),
    render: (value) => renderValue(value),
  },
  {
    key: "international_stream_number",
    dataIndex: "international_stream_number",
    name: renderHeader(t("Международный номер потока")),
    render: (value) => renderValue(value),
  },
  {
    key: "rcpu_site_id_a",
    dataIndex: "rcpu_site_id_a",
    name: renderHeader(t("RCU site ID A потока")),
    render: (value) => renderValue(value),
  },
  {
    key: "icm_a_stream",
    dataIndex: "icm_a_stream",
    name: renderHeader(t("ИКМ A потока")),
    render: (value) => renderValue(value),
  },
  {
    key: "rcpu_site_id_z",
    dataIndex: "rcpu_site_id_z",
    name: renderHeader(t("RCU site ID Z потока")),
    render: (value) => renderValue(value),
  },
  {
    key: "icm_b_stream",
    dataIndex: "icm_b_stream",
    name: renderHeader(t("ИКМ В потока")),
    render: (value) => renderValue(value),
  },
  {
    key: "channel_link",
    dataIndex: "channel_link",
    name: renderHeader(t("линк канала")),
    render: (value) => renderValue(value),
  },
  {
    key: "channel_number_in_stream",
    dataIndex: "channel_number_in_stream",
    name: renderHeader(t("№ канала в потоке")),
    render: (value) => renderValue(value),
  },
  {
    key: "channel_mode",
    dataIndex: "channel_mode",
    name: renderHeader(t("РЕЖИМ канала")),
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
    name: renderHeader(t("A port NMS")),
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
    name: renderHeader(t("Z port NMS")),
    render: (value) => renderValue(value),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: renderHeader(t("Дата создания")),
    render: (date) => renderValue(date ? dateFormatter(date, DATE_TIME) : null),
  },
  {
    key: "updated_at",
    dataIndex: "updated_at",
    name: renderHeader(t("Дата обновления")),
    render: (date) => renderValue(date ? dateFormatter(date, DATE_TIME) : null),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: renderHeader(t("Действия")),
    render: (id) => (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("Редактировать")}>
            <EditIcon
                className={"size-4 cursor-pointer text-blue-500"}
                onClick={() => handleEdit(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("Удалить")}>
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