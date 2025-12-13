import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DATE_TIME } from "@/shared/constants/date.constants.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { StaffInterface } from "@/pages/staff/interfaces/staff.interface.ts";

const createStaffColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<StaffInterface>[] => [
  {
    key: "first_name",
    dataIndex: "first_name",
    name: t("Staff"),
    render: (first_name, record) => (
      <div>
        {first_name} {record.second_name}
      </div>
    ),
  },
  {
    key: "pinfl",
    dataIndex: "pinfl",
    name: t("PINFL"),
  },
  {
    key: "email",
    dataIndex: "email",
    name: t("Email"),
  },
  {
    key: "phone",
    dataIndex: "phone",
    name: t("Phone"),
  },
  {
    key: "role",
    dataIndex: "role",
    name: t("Role"),
    render: (role) => role?.name,
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

export default createStaffColumns;
