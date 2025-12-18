import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { Num3ApplicationInterface } from "../interfaces/Num3.interface";

const getActionVariant = (type: string) => {
  switch (type) {
    case "create":
      return "green-outlined" as const;
    case "update":
      return "blue-outlined" as const;
    case "delete":
      return "red-outlined" as const;
    default:
      return "gray-outlined" as const;
  }
};

const createNum3ApplicationColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<Num3ApplicationInterface>[] => [
  {
    key: "request_number",
    dataIndex: "request_number",
    name: t("So'rov raqami"),
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "ap_input",
    dataIndex: "ap_input",
    name: t("Yuboruvchi"),
  },
  {
    key: "ubp_input",
    dataIndex: "ubp_input",
    name: t("Qabul qiluvchi"),
  },
  {
    key: "action_type",
    dataIndex: "action_type",
    name: t("Harakat turi"),
    render: (types) => (
      <div className="flex flex-wrap gap-1">
        {Array.isArray(types) ? (
          types.map((type) => (
            <Badge key={type} variant={getActionVariant(type)}>
              {type}
            </Badge>
          ))
        ) : (
          <Badge variant="gray-outlined">{types}</Badge>
        )}
      </div>
    ),
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (rid) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-blue-500"
            }
            onClick={() => handleView(rid)}
          />
        </MyTooltip>
        <MyTooltip content={t("Edit")}>
          <EditIcon
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-green-500"
            }
            onClick={() => handleEdit(rid)}
          />
        </MyTooltip>
        <MyTooltip content={t("Delete")}>
          <Trash2Icon
            className={"size-4 cursor-pointer text-gray-500 hover:text-red-500"}
            onClick={() => handleDelete(rid)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createNum3ApplicationColumns;
