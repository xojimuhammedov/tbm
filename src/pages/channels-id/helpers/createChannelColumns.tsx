import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";

const renderHeader = (label: string) => (
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
);

const renderValue = (value: any) => {
  if (value === null || value === undefined || value === "") return <span>-</span>;

  const stringValue = value.toString();
  const maxLength = 43;

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
    key: "code",
    dataIndex: "code",
    name: renderHeader(t("Код")),
    render: (value) => renderValue(value),
  },
  {
    key: "consumer_name",
    dataIndex: "consumer_name",
    name: renderHeader(t("Наименование потребителя")),
    render: (value) => renderValue(value),
  },
  {
    key: "point_a",
    dataIndex: "point_a",
    name: renderHeader(t("Пункт А")),
    render: (value) => renderValue(value),
  },
  {
    key: "point_b",
    dataIndex: "point_b",
    name: renderHeader(t("Пункт Б")),
    render: (value) => renderValue(value),
  },
  {
    key: "link_N1",
    dataIndex: "link_N1",
    name: renderHeader(t("Линк N1")),
    render: (value) => renderValue(value),
  },
  {
    key: "organization_order",
    dataIndex: "organization_order",
    name: renderHeader(t("Распоряжение об организации")),
    render: (value) => renderValue(value),
  },
  {
    key: "organization_order_date",
    dataIndex: "organization_order_date",
    name: renderHeader(t("Дата распоряжения")),
    render: (date) => renderValue(date ? dateFormatter(date, DATE_TIME) : null),
  },
  {
    key: "status",
    dataIndex: "status",
    name: renderHeader(t("Статус")),
    render: (value) => (
        <span className={value === "active" ? "text-green-600" : "text-gray-500"}>
        {renderValue(value)}
      </span>
    ),
  },
  {
    key: "is_archived",
    dataIndex: "is_archived",
    name: renderHeader(t("Архивирован")),
    render: (value) => (
        <span>{value ? t("Да") : t("Нет")}</span>
    ),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: renderHeader(t("Дата создания")),
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
          <MyTooltip content={t("Уdaлить")}>
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