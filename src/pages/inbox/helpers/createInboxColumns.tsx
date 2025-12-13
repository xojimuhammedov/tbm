import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { Badge } from "dgz-ui/badge";
import { EyeIcon, File } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { TelevisionDocumentInterface } from "@/pages/television/interfaces/televisionDocument.interface.ts";
import { config } from "@/shared/utils/config.ts";
import { InboxInterface } from "@/pages/inbox/interfaces/inbox.interface.ts";

const statusVariant = (status?: TelevisionDocumentInterface["status"]) => {
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

const createInboxColumns = (
  t: (...args: TranslationArgsType) => string,
  handleView: (id: string) => void,
): ColumnType<InboxInterface>[] => [
  {
    key: "title",
    dataIndex: "title",
    name: t("Document"),
    render: (value, record) => {
      const href =
        record.files && record.files[0]
          ? `${config.BASE_PATH}${record.files[0]}`
          : undefined;
      return href ? (
        <a
          className={"flex items-center gap-2 cursor-pointer"}
          href={href}
          target={"_blank"}
        >
          <File size={15} /> {value}
        </a>
      ) : (
        <div className={"flex items-center gap-2"}>
          <File size={15} /> {value}
        </div>
      );
    },
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Sent time"),
    render: (val) => (val ? dateFormatter(val, DATE_TIME) : "-"),
  },
  {
    key: "sender",
    dataIndex: "creatorId",
    name: t("Sender"),
    render: (val) => (
      <div>
        {val?.first_name} {val?.second_name}
      </div>
    ),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Status"),
    render: (status) => (
      <Badge variant={statusVariant(status)}>{status || "-"}</Badge>
    ),
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
      </div>
    ),
  },
];

export default createInboxColumns;
