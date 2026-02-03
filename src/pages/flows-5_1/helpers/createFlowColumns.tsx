import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";

const createFlowColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
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
    dataIndex: "flow_id",
    name: t("Code"),
    render: (flowId: FlowInterface["flow_id"]) => flowId?.code || "-",
  },
  {
    key: "mux_a",
    dataIndex: "mux_a",
    name: t("Mux A"),
    render: (value: string) => value || "-",
  },
  {
    key: "pa",
    dataIndex: "pa",
    name: t("PA"),
    render: (value: string) => value || "-",
  },
  {
    key: "mux_b",
    dataIndex: "mux_b",
    name: t("Mux B"),
    render: (value: string) => value || "-",
  },
  {
    key: "port_b",
    dataIndex: "port_b",
    name: t("Port B"),
    render: (value: string) => value || "-",
  },
  {
    key: "speed",
    dataIndex: "speed",
    name: t("Speed"),
    render: (value: string) => value || "-",
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: t(""),
    render: (id: string) => (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("Edit")}>
            <EditIcon
                className={"size-4 cursor-pointer text-blue-500 hover:text-blue-700"}
                onClick={() => handleEdit(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("Delete")}>
            <Trash2Icon
                className={"size-4 cursor-pointer text-red-500 hover:text-red-700"}
                onClick={() => handleDelete(id)}
            />
          </MyTooltip>
        </div>
    ),
  },
];

export default createFlowColumns;