import { Badge } from "dgz-ui";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import {
  SharedItemInterface,
  SharedStage,
  SharedType,
  SharedStatus,
} from "../interfaces/shared.interface.ts";

const stageColors: Record<
  string,
  "gray" | "blue" | "indigo" | "green" | "default"
> = {
  DRAFT: "gray",
  SIGNING: "blue",
  APPROVAL: "indigo",
  DONE: "green",
};

const typeColors: Record<string, "blue" | "indigo" | "default"> = {
  SIGNING: "blue",
  APPROVAL: "indigo",
};

const statusColors: Record<
  string,
  "red" | "orange" | "green" | "gray" | "default"
> = {
  REJECTED: "red",
  PENDING: "orange",
  ACCEPTED: "green",
  CANCEL: "gray",
};

const createSharedColumns = (
  t: (...args: TranslationArgsType) => string,
): ColumnType<SharedItemInterface>[] => [
  {
    key: "document_id",
    dataIndex: "document_id",
    name: t("Hujjat", { defaultValue: "Hujjat" }),
    render: (_, record) => record.document_id?.code || "-",
  },
  {
    key: "from_id",
    dataIndex: "from_id",
    name: t("Kimdan", { defaultValue: "Kimdan" }),
    render: (_, record) => {
      const from = record.from_id;
      if (!from) return "-";
      return `${from.second_name || ""} ${from.first_name || ""} ${from.middle_name || ""}`.trim();
    },
  },
  {
    key: "stages",
    dataIndex: "stages",
    name: t("Bosqich", { defaultValue: "Bosqich" }),
    render: (value: SharedStage) => (
      <Badge variant={stageColors[value] || "default"}>{value || "-"}</Badge>
    ),
  },
  {
    key: "type",
    dataIndex: "type",
    name: t("Turi", { defaultValue: "Turi" }),
    render: (value: SharedType) => (
      <Badge variant={typeColors[value] || "default"}>{value || "-"}</Badge>
    ),
  },
  {
    key: "status",
    dataIndex: "status",
    name: t("Holat", { defaultValue: "Holat" }),
    render: (value: SharedStatus) => (
      <Badge variant={statusColors[value] || "default"}>{value || "-"}</Badge>
    ),
  },
];

export default createSharedColumns;
