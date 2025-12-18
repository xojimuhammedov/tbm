import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { OrderApplication } from "../interfaces/order.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

const createOrderColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<OrderApplication>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("Order code"),
  },
  {
    key: "order_date",
    dataIndex: "order_date",
    name: t("Order time"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "dead_line",
    dataIndex: "dead_line",
    name: t("Deadline"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (id) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon
            className={"size-4 cursor-pointer"}
            onClick={() => handleView(id)}
          />
        </MyTooltip>
        <MyTooltip content={t("Edit")}>
          <EditIcon
            className={"size-4 cursor-pointer"}
            onClick={() => handleEdit(id)}
          />
        </MyTooltip>
        <MyTooltip content={t("Delete")}>
          <Trash2Icon
            className={"size-4 cursor-pointer"}
            onClick={() => handleDelete(id)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createOrderColumns;
