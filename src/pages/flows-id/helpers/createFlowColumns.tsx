import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, Trash2Icon, EyeIcon, Download } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import { FlowInterface } from "@/pages/flows-id/interfaces/flow.interface.ts";
import { Badge } from "dgz-ui";

const createFlowColumns = (
    t: (...args: TranslationArgsType) => string,
    handleDelete: (id: string) => void,
    handleEdit: (id: string) => void,
    handleView: (id: string) => void,
    selectedRowKeys: string[],
    onSelectRow: (id: string) => void,
    onSelectAll: (ids: string[]) => void,
    allIds: string[],
    statusFilterValue?: string
): ColumnType<FlowInterface>[] => {

  const handleDownloadFile = (baseFile: string) => {
    const fileUrl = `/api/upload/${baseFile}`;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = baseFile;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: ColumnType<FlowInterface>[] = [
    {
      key: "selection",
      dataIndex: "_id",
      name: (
          <input
              type="checkbox"
              className="cursor-pointer size-4"
              onChange={(e) => onSelectAll(e.target.checked ? allIds : [])}
              checked={allIds.length > 0 && selectedRowKeys.length === allIds.length}
          />
      ),
      render: (id: string) => (
          <input
              type="checkbox"
              className="cursor-pointer size-4"
              checked={selectedRowKeys.includes(id)}
              onChange={() => onSelectRow(id)}
          />
      ),
    },
    { key: "code", dataIndex: "code", name: t("ID nomer") },
    { key: "name_point_a", dataIndex: "point_a", name: t("Point A") },
    { key: "name_point_b", dataIndex: "point_b", name: t("Point B") },

    {
      key: "organization_order",
      dataIndex: "organization_order",
      name: t("Organization order"),
      render: (value) => {
        if (!value) return "-";
        if (Array.isArray(value) && value.length > 0) {
          const firstOrder = value[0];
          const orderCode = firstOrder?.order_code || "-";
          const baseFile = firstOrder?.base_file;

          if (baseFile) {
            return (
                <div className="flex items-center gap-2">
                  <button
                      onClick={() => handleDownloadFile(baseFile)}
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-medium"
                  >
                    {orderCode}
                  </button>
                  <MyTooltip content={t("Download file")}>
                    <Download
                        className="size-4 cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={() => handleDownloadFile(baseFile)}
                    />
                  </MyTooltip>
                </div>
            );
          }

          return orderCode;
        }
        return value.toString();
      },
    },

    {
      key: "status",
      dataIndex: "status",
      name: t("Status"),
      render: (value) => {
        if (!value) return "-";
        return (
            <Badge variant={value === "active" ? "green" : "red"}>
              {value === "active" ? t("Active") : t("InActive")}
            </Badge>
        );
      },
    },

    {
      key: "_id",
      dataIndex: "_id",
      name: t(""),
      render: (id) => (
          <div className="flex items-center gap-2">
            <MyTooltip content={t("View")}>
              <EyeIcon
                  className="size-4 cursor-pointer hover:text-blue-500"
                  onClick={() => handleView(id)}
              />
            </MyTooltip>

            <MyTooltip content={t("Edit")}>
              <EditIcon
                  className="size-4 cursor-pointer hover:text-orange-500"
                  onClick={() => handleEdit(id)}
              />
            </MyTooltip>

            <MyTooltip content={t("Delete")}>
              <Trash2Icon
                  className="size-4 cursor-pointer hover:text-red-500"
                  onClick={() => handleDelete(id)}
              />
            </MyTooltip>
          </div>
      ),
    },
  ];

  if (statusFilterValue === "inactive") {
    const dissolutionColumn: ColumnType<FlowInterface> = {
      key: "dissolution_order",
      dataIndex: "dissolution_order",
      name: t("Dissolution order"),
      render: (value) => {
        if (!value) return "-";
        if (Array.isArray(value) && value.length > 0) {
          const firstOrder = value[0];
          const orderCode = firstOrder?.order_code || "-";
          const baseFile = firstOrder?.base_file;

          if (baseFile) {
            return (
                <div className="flex items-center gap-2">
                  <button
                      onClick={() => handleDownloadFile(baseFile)}
                      className="text-blue-600 hover:text-blue-800 underline cursor-pointer font-medium"
                  >
                    {orderCode}
                  </button>
                  <MyTooltip content={t("Download file")}>
                    <Download
                        className="size-4 cursor-pointer text-blue-600 hover:text-blue-800"
                        onClick={() => handleDownloadFile(baseFile)}
                    />
                  </MyTooltip>
                </div>
            );
          }

          return orderCode;
        }
        return value.toString();
      },
    };

    const orgIndex = columns.findIndex((c: any) => c.key === "organization_order");
    const insertAt = orgIndex >= 0 ? orgIndex + 1 : 4;
    columns.splice(insertAt, 0, dissolutionColumn);
  }

  return columns;
};

export default createFlowColumns;