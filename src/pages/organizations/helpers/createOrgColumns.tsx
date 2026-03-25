import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { StaffInterface } from "@/pages/organizations/interfaces/org.interface.ts";

const createOrgColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<StaffInterface>[] => [
  {
    key: "name",
    dataIndex: "name",
    name: t("Organizations"),
    render: (name) => <div>{name}</div>,
  },
  {
    key: "description",
    dataIndex: "description",
    name: t("Description"),
    render: (description: string) => (
      <div className={"max-w-[360px] truncate"}>{description}</div>
    ),
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

export default createOrgColumns;
