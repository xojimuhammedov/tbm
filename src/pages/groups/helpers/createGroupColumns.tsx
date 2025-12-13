import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { GroupInterface } from "@/pages/groups/interfaces/group.interface.ts";

const createGroupColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<GroupInterface>[] => [
  {
    key: "name",
    dataIndex: "name",
    name: t("Group name"),
  },
  {
    key: "description",
    dataIndex: "description",
    name: t("Group description"),
  },
  {
    key: "userCount",
    dataIndex: "userCount",
    name: t("Users count"),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Created date"),
    render: (created_at) => dateFormatter(created_at, DATE_TIME),
  },
  {
    key: "updated_at",
    dataIndex: "updated_at",
    name: t("Updated date"),
    render: (updated_at) => dateFormatter(updated_at, DATE_TIME),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t(""),
    render: (id) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon className={"size-4"} onClick={() => handleView(id)} />
        </MyTooltip>
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

export default createGroupColumns;
