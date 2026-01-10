import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { ExternalOutboundInterface } from "@/pages/in & out documents/17-97 external outbound document/interfaces/external.outbound.interface.ts";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

const createExternalOutboundColumns = (
  t: (...args: TranslationArgsType) => string,
  handleDelete: (id: string) => void,
  handleEdit: (id: string) => void,
): ColumnType<ExternalOutboundInterface>[] => [
  {
    key: "reg_num",
    dataIndex: "reg_num",
    name: t("Bo‘lim tartib raqami"),
  },
  {
    key: "reg_date",
    dataIndex: "reg_date",
    name: t("Bo‘lim ro‘yxat sanasi"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "external_out_doc_number",
    dataIndex: "external_out_doc_number",
    name: t("Chiquvchi hujjat raqami"),
  },
  {
    key: "recipient",
    dataIndex: "recipient",
    name: t("Qabul qiluvchi"),
  },
  {
    key: "summary",
    dataIndex: "summary",
    name: t("Qisqacha mazmuni"),
  },
  {
    key: "response_reference_number",
    dataIndex: "response_reference_number",
    name: t("Javob xati raqami"),
    render: (value) => value || t("-"),
  },
  {
    key: "_id",
    dataIndex: "_id",
    name: t("Amallar"),
    render: (id: string) => (
      <div className={"flex items-center gap-2"}>
        <MyTooltip content={t("Tahrirlash")}>
          <EditIcon
            className={"size-4 cursor-pointer text-blue-600"}
            onClick={() => handleEdit(id)}
          />
        </MyTooltip>
        <MyTooltip content={t("O‘chirish")}>
          <Trash2Icon
            className={"size-4 cursor-pointer text-red-600"}
            onClick={() => handleDelete(id)}
          />
        </MyTooltip>
      </div>
    ),
  },
];

export default createExternalOutboundColumns;
