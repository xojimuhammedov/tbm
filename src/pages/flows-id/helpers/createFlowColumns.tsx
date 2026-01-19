import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon, EyeIcon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";

const createFlowColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  handleView: (id: string) => void,
  selectedRowKeys: string[],
  onSelectRow: (id: string) => void,
  onSelectAll: (ids: string[]) => void,
  allIds: string[],
): ColumnType<FlowInterface>[] => [
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
    name: t("ID nomer"),
  },
  {
    key: "name_point_a",
    dataIndex: "point_a",
    name: t("Point A"),
  },
  {
    key: "name_point_b",
    dataIndex: "point_b",
    name: t("Point B"),
  },
  {
    key: "organization_order",
    dataIndex: "organization_order",
    name: t("Organization order"),
    render: (value) => {
      if (!value) return "-";
      if (Array.isArray(value)) {
        return value.map((item) => item.order_code).join(", ");
      }
      return value.toString();
    },
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t(""),
    render: (id) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon
            className={"size-4 cursor-pointer hover:text-blue-500"}
            onClick={() => handleView(id)}
          />
        </MyTooltip>

        <MyTooltip content={t("Edit")}>
          <EditIcon
            className={"size-4 cursor-pointer hover:text-orange-500"}
            onClick={() => handleEdit(id)}
          />
        </MyTooltip>

        <MyTooltip content={t("Delete")}>
          <Trash2Icon
            className={"size-4 cursor-pointer hover:text-red-500"}
            onClick={() => handleDelete(id)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createFlowColumns;
