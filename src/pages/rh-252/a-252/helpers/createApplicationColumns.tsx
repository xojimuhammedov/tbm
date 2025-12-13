import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ApplicationDocumentInterface } from "@/pages/rtsi/application/interfaces/applicationDocument.interface.ts";
import AcceptAction from "@/shared/components/moleculas/documents/AcceptAction.tsx";
import RejectAction from "@/shared/components/moleculas/documents/RejectAction.tsx";

const statusVariant = (status: ApplicationDocumentInterface["status"]) => {
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

const createApplicationColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
  baseKey: (string | number)[],
  onUpdated: () => void,
): ColumnType<ApplicationDocumentInterface>[] => [
  {
    key: "workProcedure",
    dataIndex: "workProcedure",
    name: t("Work produce"),
  },
  {
    key: "workDateTime",
    dataIndex: "workDateTime",
    name: t("Work date and time"),
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
        <AcceptAction baseKey={baseKey} id={id} onUpdated={onUpdated} />
        <RejectAction baseKey={baseKey} id={id} onUpdated={onUpdated} />
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

export default createApplicationColumns;
