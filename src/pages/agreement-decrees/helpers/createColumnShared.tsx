import MyTooltip from "@/shared/components/atoms/tooltip/MyTooltip.tsx";
import { Badge } from "dgz-ui";
import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EyeIcon } from "lucide-react";
import {
  SharedItemInterface,
  SharedStage,
  SharedStatus,
  SharedType,
} from "../interfaces/shared.interface.ts";

const renderHeader = (label: string) => (
  <span style={{ whiteSpace: "nowrap" }}>{label}</span>
);

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
  handleView: (record: SharedItemInterface) => void,
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
    {
      key: "document_id",
      dataIndex: "document_id",
      name: renderHeader(t("Действия")),
      render: (_, record) => (
        <div className={"flex items-center gap-2"}>
          <MyTooltip content={t("View")}>
            <EyeIcon
              className="size-4 cursor-pointer hover:text-blue-500"
              onClick={() => record && handleView(record)}
            />
          </MyTooltip>
        </div>
      ),
    },
  ];

export default createSharedColumns;
