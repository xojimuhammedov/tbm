import { MySelect } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui/button";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ApprovalShareFormValues } from "../schema/approvalShare.schema";

interface Props {
    form: UseFormReturn<ApprovalShareFormValues>;
    staffOptions: { value: string; label: string }[];
    onCancel: () => void;
    onSubmit: () => void;
    isSending: boolean;
}

export function ShareFormPanel({ form, staffOptions, onCancel, onSubmit, isSending }: Props) {
    const { t } = useTranslation();
    const approverIds = form.watch("approver_ids");

    useEffect(() => {
        if (approverIds) {
            approverIds.forEach((uid: string) => {
                if (form.getValues(`approver_edit_permissions.${uid}`) === undefined) {
                    form.setValue(`approver_edit_permissions.${uid}`, false);
                }
            });
        }
    }, [approverIds, form]);

    return (
        <FormProvider {...form}>
            <div className="w-full flex flex-col gap-3">

                <div className="rounded-xl border border-slate-100 bg-white p-4 space-y-3">
                    <div className="relative">
                        <MySelect
                            control={form.control}
                            name="approver_ids"
                            options={staffOptions}
                            label={t("Ko'rib chiquvchilar")}
                            placeholder={t("Tanlang...")}
                            isClearable
                            required
                            isMulti={true}
                        />
                    </div>

                    {approverIds && approverIds.length > 0 && (
                        <div className="pt-3 border-t border-slate-100">
                            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                                Tahrirlash huquqlari
                            </p>
                            <div className="space-y-1">
                                {approverIds.map((uid: string) => {
                                    const userLabel = staffOptions.find((o) => o.value === uid)?.label ?? "Noma'lum";
                                    const editPermissions = form.watch("approver_edit_permissions") || {};
                                    const canEdit = editPermissions[uid] || false;
                                    return (
                                        <div key={uid} className="flex items-center justify-between gap-3 py-2 px-1">
                                            <p className="text-sm text-slate-700 truncate flex-1">{userLabel}</p>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const current = form.getValues("approver_edit_permissions") || {};
                                                    form.setValue(
                                                        "approver_edit_permissions",
                                                        { ...current, [uid]: !canEdit },
                                                        { shouldDirty: true },
                                                    );
                                                }}
                                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                                                    canEdit ? "bg-blue-500" : "bg-slate-200"
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform ${
                                                        canEdit ? "translate-x-4" : "translate-x-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                <div className="rounded-xl border border-slate-100 bg-white p-4">
                    <MySelect
                        control={form.control}
                        name="director_id"
                        options={staffOptions}
                        label={t("Imzolovchi")}
                        placeholder={t("Tanlang...")}
                        isClearable
                    />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end gap-2 pt-1">
                    <Button variant="secondary" onClick={onCancel} className="min-w-[110px]">
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isSending}
                        className="min-w-[110px] bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        {isSending ? (
                            <span className="flex items-center gap-2">
                                <LoaderCircle className="size-4 animate-spin" />
                                Yuborilmoqda...
                            </span>
                        ) : (
                            "Yuborish"
                        )}
                    </Button>
                </div>
            </div>
        </FormProvider>
    );
}