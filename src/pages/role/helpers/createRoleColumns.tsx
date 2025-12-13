import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { RoleInterface } from "@/pages/role/interfaces/role.interface.ts";
import { Badge } from "dgz-ui/badge";

const createRoleColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
): ColumnType<RoleInterface>[] => [
  {
    key: "name",
    dataIndex: "name",
    name: t("Role"),
  },
  {
    key: "permissions",
    dataIndex: "permissions",
    name: t("Permissions"),
    render: (permissions) => (
      <div className={"max-w-60"}>
        {permissions.map((permission) => (
          <Badge key={permission} variant={"blue-outlined"}>
            {permission}
          </Badge>
        ))}
      </div>
    ),
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

export default createRoleColumns;
