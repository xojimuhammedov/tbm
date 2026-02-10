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
  { key: "flow_code", dataIndex: "flow_code", name: "ID" },
  { key: "forward", dataIndex: "forward", name: "прямой" },
  { key: "reverse", dataIndex: "reverse", name: "обратный" },
  { key: "start", dataIndex: "start", name: "Начало" },
  { key: "port_a", dataIndex: "port_a", name: "Port_A" },
  { key: "mux_a", dataIndex: "mux_a", name: "Mux_A" },
  { key: "pa", dataIndex: "pa", name: "пА" },
  { key: "final_ms_name", dataIndex: "final_ms_name", name: "Name_MS_final" },
  { key: "signal_level", dataIndex: "signal_transmission_level", name: "Уровень п" },
  { key: "au4", dataIndex: "au4", name: "_AU-4" },
  { key: "ts", dataIndex: "ts", name: "_ts" },
  { key: "pb", dataIndex: "pb", name: "пВ" },
  { key: "transit", dataIndex: "transit", name: "транзит" },
  { key: "mux_b", dataIndex: "mux_b", name: "Mux_B" },
  { key: "port_b", dataIndex: "port_b", name: "Port_B" },
  { key: "end", dataIndex: "end", name: "Конец" },
  { key: "consumer", dataIndex: "consumer", name: "Пoтребитель" },
  { key: "order_number", dataIndex: "order_number", name: "Распоряжения" },
  { key: "interest_level", dataIndex: "interest_level", name: "Заинтересованность" },
  { key: "mt", dataIndex: "mt", name: "М/Т" },
  { key: "speed", dataIndex: "speed", name: "Скорость" },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (id: string) => (
        <div className="flex items-center gap-2">
          <MyTooltip content={t("Edit")}>
            <EditIcon className="size-4 cursor-pointer text-blue-500" onClick={() => handleEdit(id)} />
          </MyTooltip>
          <MyTooltip content={t("Delete")}>
            <Trash2Icon className="size-4 cursor-pointer text-red-500" onClick={() => handleDelete(id)} />
          </MyTooltip>
        </div>
    ),
  },
];

export default createFlowColumns;