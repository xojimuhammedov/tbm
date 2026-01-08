import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { rh_231_Interface } from "../interfaces/rh-231.interface.ts";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE } from "@/shared/constants/date.constants";

const createOrderColumns = (
    t: (...args: TranslationArgsType) => string,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleView: (id: string) => void,
): ColumnType<rh_231_Interface>[] => [
  {
    key: "title",
    dataIndex: "title",
    name: t("Title"),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Status"),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Created date"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "dead_line",
    dataIndex: "dead_line",
    name: t("Deadline"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "responsibleStation",
    dataIndex: "responsibleStation",
    name: t("Responsible station"),
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (id) => (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("View")}>
            <EyeIcon
                className={"size-4 cursor-pointer text-blue-500"}
                onClick={() => handleView(id)}
            />
          </MyTooltip>
          <MyTooltip content={t("Edit")}>
            <EditIcon
                className={"size-4 cursor-pointer text-amber-500"}
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

export default createOrderColumns;