import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { DocumentMbb33 } from "../interfaces/document-mbb-3-3.interface";
import { dateFormatter } from "@/shared/utils/utils.ts";
import { DATE } from "@/shared/constants/date.constants.ts";

const createDocumentMbb33Columns = (
  t: (...args: TranslationArgsType) => string,
): ColumnType<DocumentMbb33>[] => [
  {
    key: "document_index",
    dataIndex: "document_index",
    name: t("Hujjat indeksi"),
  },
  {
    key: "order_date",
    dataIndex: "order_date",
    name: t("Sana"),
    render: (val) => dateFormatter(val, DATE),
  },
  {
    key: "code",
    dataIndex: "code",
    name: t("Kod"),
  },
  {
    key: "created_at",
    dataIndex: "created_at",
    name: t("Yaratilgan vaqt"),
    render: (val) => dateFormatter(val, DATE),
  },
];

export default createDocumentMbb33Columns;
