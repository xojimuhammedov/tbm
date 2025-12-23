import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ChannelInterface } from "@/pages/channels-id/interfaces/channel.interface.ts";

const createChannelColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
): ColumnType<ChannelInterface>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("Code"),
  },
  {
    key: "consumer_name",
    dataIndex: "consumer_name",
    name: t("Stream identifier"),
  },
  {
    key: "connection_number",
    dataIndex: "connection_number",
    name: t("Channel identifier"),
  },
  {
    key: "point_a",
    dataIndex: "point_a",
    name: t("Site A"),
  },
  {
    key: "point_b",
    dataIndex: "point_b",
    name: t("Site Z"),
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

export default createChannelColumns;
