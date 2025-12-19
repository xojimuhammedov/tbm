import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { DApplicationInterface } from "@/pages/rh-252/d-252/interfaces/d-252.interface.ts";

const getActionVariant = (type: string) => {
  switch (type) {
    case "create":
      return "green-outlined" as const;
    case "read":
      return "gray-outlined" as const;
    case "update":
      return "blue-outlined" as const;
    case "delete":
      return "red-outlined" as const;
    default:
      return "gray-outlined" as const;
  }
};

const createDApplicationColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<DApplicationInterface>[] => [
  {
    key: "request_number",
    dataIndex: "request_number",
    name: t("So'rov raqami"),
    render: (value) => <span className="font-medium">{value || "---"}</span>,
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
              {t(type)}
            </Badge>
          ))
        ) : (
          <Badge variant="gray-outlined">{t("No actions")}</Badge>
        )}
      </div>
    ),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Yaratilgan vaqt"),
    render: (val) => (val ? dateFormatter(val, DATE_TIME) : "---"),
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (_id, record) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("Ko'rish")}>
          <EyeIcon
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-blue-500"
            }
            onClick={() => handleView(record._id)}
          />
        </MyTooltip>
        <MyTooltip content={t("Tahrirlash")}>
          <EditIcon
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-green-500"
            }
            onClick={() => handleEdit(record._id)}
          />
        </MyTooltip>
        <MyTooltip content={t("O'chirish")}>
          <Trash2Icon
            className={"size-4 cursor-pointer text-gray-500 hover:text-red-500"}
            onClick={() => handleDelete(record._id)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createDApplicationColumns;
