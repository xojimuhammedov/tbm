import { ColumnType, TranslationArgsType } from "dgz-ui-shared/types";
import { EditIcon, EyeIcon, Trash2Icon, PencilLineIcon, ShieldCheckIcon, FileSignature } from "lucide-react";
import { MyTooltip } from "@/shared/components/atoms/tooltip";
import {
    OrderApplication,
    ResponsibleUser,
} from "../interfaces/order.interface";
import { dateFormatter } from "@/shared/utils/utils";
import { DATE, DATE_TIME } from "@/shared/constants/date.constants";

// Statuslar uchun ranglar va tarjimalar konfiguratsiyasi
const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    SIGNED: {
        color: "text-emerald-700",
        bg: "bg-emerald-100",
        label: "Imzolangan",
    },
    EXECUTED: {
        color: "text-blue-700",
        bg: "bg-blue-100",
        label: "Bajarilgan",
    },
    SIGNING: {
        color: "text-amber-700",
        bg: "bg-amber-100",
        label: "Imzolanmoqda",
    },
    DELETED: {
        color: "text-red-700",
        bg: "bg-red-100",
        label: "O'chirilgan",
    },
};

const createOrderColumns = (
    t: (...args: TranslationArgsType) => string,
    handleEdit: (id: string) => void,
    handleDelete: (id: string) => void,
    handleView: (id: string) => void,
    handleEditCode: (id: string, code: string) => void,
    handleEImzo: (id: string) => void,
    handleEImzoProgress: (id: string) => void
): ColumnType<OrderApplication>[] => [
    {
        key: "code",
        dataIndex: "code",
        name: t("Order code"),
        render: (code: string | undefined, record: OrderApplication) => {
            if (!code || !record._id) return code || "-";
            return (
                <div className="flex items-center gap-2 font-medium">
                    <span>{code}</span>
                    <MyTooltip content={t("Edit code")}>
                        <PencilLineIcon
                            className="size-3.5 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEditCode(record._id!, code);
                            }}
                        />
                    </MyTooltip>
                </div>
            );
        },
    },
    {
        key: "status",
        dataIndex: "status",
        name: t("Status"),
        render: (status: string) => {
            const config = statusConfig[status] || {
                color: "text-gray-700",
                bg: "bg-gray-100",
                label: status,
            };
            return (
                <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${config.bg} ${config.color} border border-current/10`}
                >
          {t(config.label)}
        </span>
            );
        },
    },
    {
        key: "order_date",
        dataIndex: "order_date",
        name: t("Order date"),
        render: (val: string) => (
            <span className="whitespace-nowrap">{dateFormatter(val, DATE)}</span>
        ),
    },
    {
        key: "to",
        dataIndex: "to",
        name: t("To"),
        render: (to: string[]) => {
            if (!to || to.length === 0) return "-";
            return (
                <div className="max-w-[150px] truncate text-slate-600" title={to.join(", ")}>
                    {to.slice(0, 1).join(", ")}
                    {to.length > 1 && (
                        <span className="text-blue-600 font-medium ml-1">+{to.length - 1}</span>
                    )}
                </div>
            );
        },
    },
    {
        key: "responsible",
        dataIndex: "responsible",
        name: t("Mas'ul xodim"),
        render: (responsible: ResponsibleUser) =>
            responsible ? (
                <div className="flex flex-col">
          <span className="text-sm font-medium leading-none">
            {responsible.first_name} {responsible.second_name}
          </span>
                    <span className="text-[10px] text-slate-400 mt-1 italic">{responsible.phone}</span>
                </div>
            ) : (
                "---"
            ),
    },
    {
        key: "created_at",
        dataIndex: "created_at",
        name: t("Yaratilgan vaqt"),
        render: (val: string) => (
            <div className="text-xs text-slate-500 whitespace-nowrap">
                {val ? dateFormatter(val, DATE_TIME) : "---"}
            </div>
        ),
    },
    {
        key: "actions",
        dataIndex: "_id",
        name: "",
        render: (id: string | undefined, record: OrderApplication) => {
            if (!id) return null;
            return (
                <div className={"flex items-center gap-2 justify-end"}>
                    {record.status !== "SIGNED" && (
                        <>
                            <MyTooltip content={t("Imzolash jarayoni")}>
                                <FileSignature
                                    className="size-4 cursor-pointer text-slate-500 hover:text-emerald-600 transition-colors"
                                    onClick={() => handleEImzoProgress(id)}
                                />
                            </MyTooltip>
                            <MyTooltip content={t("E-IMZO bilan imzolash")}>
                                <ShieldCheckIcon
                                    className="size-4 cursor-pointer text-slate-500 hover:text-blue-600 transition-colors"
                                    onClick={() => handleEImzo(id)}
                                />
                            </MyTooltip>
                        </>
                    )}

                    <div className="h-4 w-[1px] bg-slate-200 mx-1" />

                    <MyTooltip content={t("View")}>
                        <EyeIcon
                            className="size-4 cursor-pointer text-slate-500 hover:text-indigo-600 transition-colors"
                            onClick={() => handleView(id)}
                        />
                    </MyTooltip>

                    <MyTooltip content={t("Edit")}>
                        <EditIcon
                            className="size-4 cursor-pointer text-slate-500 hover:text-amber-600 transition-colors"
                            onClick={() => handleEdit(id)}
                        />
                    </MyTooltip>

                    <MyTooltip content={t("Delete")}>
                        <Trash2Icon
                            className="size-4 cursor-pointer text-slate-500 hover:text-red-600 transition-colors"
                            onClick={() => handleDelete(id)}
                        />
                    </MyTooltip>
                </div>
            );
        },
    },
];

export default createOrderColumns;