import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon, EyeIcon, Download } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";
import { Badge } from "dgz-ui";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";

const renderHeader = (label: string) => (
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
);

const renderValue = (value: any) => {
  if (value === undefined || value === null || value === "") return <span>-</span>;

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

const createFlowColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
    handleView: (id: string) => void,
    selectedRowKeys: string[],
    onSelectRow: (id: string) => void,
    onSelectAll: (ids: string[]) => void,
    allIds: string[],
): ColumnType<FlowInterface>[] => {

  const handleDownloadFile = (baseFile: string) => {
    const fileUrl = `/api/upload/${baseFile}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = baseFile;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderOrder = (orders: any[]) => {
    if (!orders || orders.length === 0) return <span>-</span>;
    const firstOrder = orders[0];
    const orderCode = firstOrder?.order_code || "-";
    const baseFile = firstOrder?.base_file;

    if (baseFile) {
      return (
          <div className="flex items-center gap-2">
            <button
                onClick={() => handleDownloadFile(baseFile)}
                className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-medium whitespace-nowrap"
            >
              {orderCode}
            </button>
            <Download
                className="size-4 cursor-pointer text-blue-600"
                onClick={() => handleDownloadFile(baseFile)}
            />
          </div>
      );
    }
    return <span className="whitespace-nowrap">{orderCode}</span>;
  };

  return [
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
      key: "name_point_a",
      dataIndex: "name_point_a",
      name: renderHeader(t("Point A Name")),
      render: (value) => renderValue(value),
    },
    {
      key: "point_a",
      dataIndex: "point_a",
      name: renderHeader(t("Point A")),
      render: (value) => renderValue(value),
    },
    {
      key: "name_point_b",
      dataIndex: "name_point_b",
      name: renderHeader(t("Point B Name")),
      render: (value) => renderValue(value),
    },
    {
      key: "point_b",
      dataIndex: "point_b",
      name: renderHeader(t("Point B")),
      render: (value) => renderValue(value),
    },
    {
      key: "signal_level",
      dataIndex: "signal_level",
      name: renderHeader(t("Уровень сигнала")),
      render: (value) => renderValue(value),
    },
    {
      key: "organization_order",
      dataIndex: "organization_order",
      name: renderHeader(t("Распоряжение об организации")),
      render: (value) => renderOrder(value),
    },
    {
      key: "dissolution_order",
      dataIndex: "dissolution_order",
      name: renderHeader(t("Распоряжение o расформировании")),
      render: (value) => renderOrder(value),
    },
    {
      key: "organization_archive",
      dataIndex: "organization_archive",
      name: renderHeader(t("Архив организации")),
      render: (value) => renderValue(value),
    },
    {
      key: "deciphering_archive",
      dataIndex: "deciphering_archive",
      name: renderHeader(t("Архив расформирования")),
      render: (value) => renderValue(value),
    },
    {
      key: "note",
      dataIndex: "note",
      name: renderHeader(t("Примечание")),
      render: (value) => renderValue(value),
    },
    {
      key: "status",
      dataIndex: "status",
      name: renderHeader(t("Статус")),
      render: (value) => (
          <Badge variant={value === "active" ? "green" : "red"}>
            {value === "active" ? t("Active") : t("InActive")}
          </Badge>
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
          <div className="flex items-center gap-2">
            <MyTooltip content={t("View")}>
              <EyeIcon
                  className="size-4 cursor-pointer hover:text-blue-500"
                  onClick={() => handleView(id)}
              />
            </MyTooltip>
            <MyTooltip content={t("Edit")}>
              <EditIcon
                  className="size-4 cursor-pointer text-blue-500"
                  onClick={() => handleEdit(id)}
              />
            </MyTooltip>
            <MyTooltip content={t("Delete")}>
              <Trash2Icon
                  className="size-4 cursor-pointer text-red-500"
                  onClick={() => handleDelete(id)}
              />
            </MyTooltip>
          </div>
      ),
    },
  ];
};

export default createFlowColumns;