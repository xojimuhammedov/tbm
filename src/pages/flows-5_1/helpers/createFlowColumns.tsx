import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";
import { ReactNode } from "react";

const renderHeader = (label: string): ReactNode => (
    <span style={{ whiteSpace: 'nowrap' }}>{label}</span>
);

const renderCell = (val: unknown): ReactNode => {
  const content = (val !== undefined && val !== null && val !== "") ? String(val) : "-";
  return <span style={{ whiteSpace: 'nowrap' }}>{content}</span>;
};

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
  { key: "flow_code", dataIndex: "flow_code", name: renderHeader("ID"), render: renderCell },
  { key: "forward", dataIndex: "forward", name: renderHeader(t("прямой")), render: renderCell },
  { key: "reverse", dataIndex: "reverse", name: renderHeader(t("обратный")), render: renderCell },
  { key: "start", dataIndex: "start", name: renderHeader(t("Начало")), render: renderCell },
  { key: "port_a", dataIndex: "port_a", name: renderHeader("Port A"), render: renderCell },
  { key: "mux_a", dataIndex: "mux_a", name: renderHeader("Mux A"), render: renderCell },
  { key: "pa", dataIndex: "pa", name: renderHeader("пА"), render: renderCell },
  { key: "final_ms_name", dataIndex: "final_ms_name", name: renderHeader("Name MS final"), render: renderCell },
  { key: "signal_level", dataIndex: "signal_transmission_level", name: renderHeader(t("Уровень п")), render: renderCell },
  { key: "au4", dataIndex: "au4", name: renderHeader("AU-4"), render: renderCell },
  { key: "ts", dataIndex: "ts", name: renderHeader("ts"), render: renderCell },
  { key: "pb", dataIndex: "pb", name: renderHeader("пВ"), render: renderCell },
  { key: "transit", dataIndex: "transit", name: renderHeader(t("транзит")), render: renderCell },
  { key: "mux_b", dataIndex: "mux_b", name: renderHeader("Mux B"), render: renderCell },
  { key: "port_b", dataIndex: "port_b", name: renderHeader("Port B"), render: renderCell },
  { key: "end", dataIndex: "end", name: renderHeader(t("Конец")), render: renderCell },
  { key: "consumer", dataIndex: "consumer", name: renderHeader(t("Пoтребитель")), render: renderCell },
  { key: "order_number", dataIndex: "order_number", name: renderHeader(t("Распоряжения")), render: renderCell },
  { key: "interest_level", dataIndex: "interest_level", name: renderHeader(t("Заинтересованность")), render: renderCell },
  { key: "mt", dataIndex: "mt", name: renderHeader("М/Т"), render: renderCell },
  { key: "speed", dataIndex: "speed", name: renderHeader(t("Скорость")), render: renderCell },
  {
    key: "actions",
    dataIndex: "_id",
    name: renderHeader(t("Actions")),
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