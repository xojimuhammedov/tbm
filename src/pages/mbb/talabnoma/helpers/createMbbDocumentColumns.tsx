import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { MbbDocumentInterface } from "../interfaces/MbbDocument.interface";

const createMbbDocumentColumns = (
  t: (...args: TranslationArgsType) => string,
  handleEdit: (id: string) => void,
  handleDelete: (id: string) => void,
  handleView: (id: string) => void,
): ColumnType<MbbDocumentInterface>[] => [
  {
    key: "code",
    dataIndex: "code",
    name: t("So'rov raqami"),
    render: (value: string) => <span className="font-medium">{value}</span>,
  },
  {
    key: "document_type",
    dataIndex: "document_type",
    name: t("Hujjat turi"),
    render: (value: string) => (
      <span
        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
          value === "REQUISITION"
            ? "bg-blue-100 text-blue-800"
            : "bg-green-100 text-green-800"
        }`}
      >
        {value === "REQUISITION" ? "Talabnoma" : "Ma'lumotnoma"}
      </span>
    ),
  },
  {
    key: "signer",
    dataIndex: "signer",
    name: t("Qabul qiluvchi"),
    render: (signer: any) =>
      `${signer?.first_name || ""} ${signer?.second_name || ""} ${signer?.middle_name || ""}`,
  },
  {
    key: "created_by",
    dataIndex: "created_by",
    name: t("Yuboruvchi"),
    render: (created_by: any) =>
      `${created_by?.first_name || ""} ${created_by?.second_name || ""} ${created_by?.middle_name || ""}`,
  },
  {
    key: "actions",
    dataIndex: "_id",
    name: "",
    render: (rid: string) => (
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
            className={
              "size-4 cursor-pointer text-gray-500 hover:text-red-500"
            }
            onClick={() => handleDelete(rid)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createMbbDocumentColumns;
