import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { F56DocumentInterface } from "@/pages/rtsi/f-56/interfaces/f56Document.interface.ts";

const statusVariant = (status: F56DocumentInterface["status"]) => {
  switch (status) {
    case "approved":
      return "green-outlined" as const;
    case "sent":
      return "blue-outlined" as const;
    case "rejected":
      return "red-outlined" as const;
    default:
      return "gray-outlined" as const;
  }
};

const createF56Columns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<F56DocumentInterface>[] => [
  {
    key: "description",
    dataIndex: "description",
    name: t("Description"),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Created time"),
    render: (val) => dateFormatter(val, DATE_TIME),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Status"),
    render: (status) => <Badge variant={statusVariant(status)}>{status}</Badge>,
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (rid) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon
            className={"size-4 cursor-pointer"}
            onClick={() => handleView(rid)}
          />
        </MyTooltip>
        <MyTooltip content={t("Edit")}>
          <EditIcon
            className={"size-4 cursor-pointer"}
            onClick={() => handleEdit(rid)}
          />
        </MyTooltip>
        <MyTooltip content={t("Delete")}>
          <Trash2Icon
            className={"size-4 cursor-pointer"}
            onClick={() => handleDelete(rid)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createF56Columns;
