import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { Num3ApplicationInterface } from "../interfaces/Num3.interface";


const createNum3ApplicationColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<Num3ApplicationInterface>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("So'rov raqami"),
    render: (value) => <span className="font-medium">{value}</span>,
  },
  {
    key: "title",
    dataIndex: "title",
    name: t("Hujjat sarlavhasi"),
  },
  {
    key: "signer",
    dataIndex: "signer",
    name: t("Qabul qiluvchi"),
    render: (signer: any) => `${signer?.first_name} ${signer?.second_name} ${signer?.middle_name}`,
  },
  {
    key: "created_by",
    dataIndex: "created_by",
    name: t("Yuboruvchi"),
    render: (created_by: any) => `${created_by?.first_name} ${created_by?.second_name} ${created_by?.middle_name}`,
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (rid) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("View")}>
          <EyeIcon
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-blue-500"
            }
            onClick={() => handleView(rid)}
          />
        </MyTooltip>
        <MyTooltip content={t("Edit")}>
          <EditIcon
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-green-500"
            }
            onClick={() => handleEdit(rid)}
          />
        </MyTooltip>
        <MyTooltip content={t("Delete")}>
          <Trash2Icon
            className={"size-4 cursor-pointer text-gray-500 hover:text-red-500"}
            onClick={() => handleDelete(rid)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createNum3ApplicationColumns;
