import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FApplicationInterface } from "@/pages/rh-252/f-252/interfaces/f-252.interface.ts";

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

const createFApplicationColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<FApplicationInterface>[] => [
  {
    key: "requestNumber",
    dataIndex: "requestNumber",
    name: t("So'rov raqami"),
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "sender",
    dataIndex: "sender",
    name: t("Yuboruvchi"),
  },
  {
    key: "recipient",
    dataIndex: "recipient",
    name: t("Qabul qiluvchi"),
  },
  {
    key: "leader",
    dataIndex: "leader",
    name: t("Rahbar"),
  },
  {
    key: "actionType",
    dataIndex: "actionType",
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
    key: "created_at",
    dataIndex: "created_at",
    name: t("Yaratilgan vaqt"),
    render: (val) => dateFormatter(val, DATE_TIME),
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

export default createFApplicationColumns;
