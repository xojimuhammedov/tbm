import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";

const createFlowColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
): ColumnType<FlowInterface>[] => [
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
    name: t("Organization order number"),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t(""),
    render: (id) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("Edit")}>
          <EditIcon className={"size-4"} onClick={() => handleEdit(id)} />
        </MyTooltip>
        <MyTooltip content={t("Delete")}>
          <Trash2Icon className={"size-4"} onClick={() => handleDelete(id)} />
        </MyTooltip>
      </div>
    ),
  },
];

export default createFlowColumns;
