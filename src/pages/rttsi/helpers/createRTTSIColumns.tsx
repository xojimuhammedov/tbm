import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EditIcon, EyeIcon, File, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { RTTSIDocumentInterface } from "@/pages/rttsi/interfaces/rttsiDocument.interface.ts";
import { config } from "@/shared/utils/config.ts";

const statusVariant = (status: RTTSIDocumentInterface["status"]) => {
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

const createRTTSIColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<RTTSIDocumentInterface>[] => [
  {
    key: "title",
    dataIndex: "title",
    name: t("Document"),
    render: (value, record) => (
      <a
        className={"flex items-center gap-2 cursor-pointer"}
        href={`${config.BASE_PATH}${record.files[0]}`}
        target={"_blank"}
      >
        <File size={15} /> {value}
      </a>
    ),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Sent time"),
    render: (val) => dateFormatter(val, DATE_TIME),
  },
  {
    key: "sender",
    dataIndex: "creatorId",
    name: t("Sender"),
    render: (val) => (
      <div>
        {val.first_name} {val.second_name}
      </div>
    ),
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

export default createRTTSIColumns;
