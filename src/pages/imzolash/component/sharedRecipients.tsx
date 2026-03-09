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

export function ShareFormPanel({
                                   form,
                                   staffOptions,
                                   onCancel,
                                   onSubmit,
                                   isSending,
                               }: Props) {
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
            <div className="w-full flex flex-col">
                <div className="flex-1 space-y-5 p-1 max-h-[65vh] overflow-y-auto" style={{ scrollbarWidth: "thin", minHeight: "350px" }}>
                    {/* ── APPROVAL block ── */}
                    <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-4 sm:p-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 rounded-full bg-amber-400" />
                            <span className="text-[11px] sm:text-[13px] font-bold text-slate-600 uppercase tracking-wider">
                                Tasdiqlash bosqichi
                            </span>
                        </div>

                        <MySelect
                            control={form.control}
                            name="approver_ids"
                            options={staffOptions}
                            label={t("Mas'ul xodim")}
                            placeholder={t("Select staffs")}
                            isClearable
                            required
                            isMulti={true}
                        />

                        {/* Edit toggle per user - more compact UI */}
                        {approverIds && approverIds.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-amber-100/50">
                                <p className="text-[11px] sm:text-[13px] font-bold text-amber-700/60 uppercase tracking-wider mb-3">
                                    Tahrirlash huquqlari
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                                    {approverIds.map((uid: string) => {
                                        const userLabel =
                                            staffOptions.find((o) => o.value === uid)?.label ||
                                            "Noma'lum";
                                        const editPermissions =
                                            form.watch("approver_edit_permissions") || {};
                                        const canEdit = editPermissions[uid] || false;
                                        return (
                                            <label
                                                key={uid}
                                                className="flex items-center gap-3 bg-white/80 p-3 rounded-xl border border-amber-100/50 hover:bg-white cursor-pointer transition-colors group"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const current =
                                                            form.getValues("approver_edit_permissions") || {};
                                                        form.setValue(
                                                            "approver_edit_permissions",
                                                            { ...current, [uid]: !canEdit },
                                                            { shouldDirty: true },
                                                        );
                                                    }}
                                                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                                                        canEdit ? "bg-amber-400" : "bg-slate-200"
                                                    }`}
                                                >
                                                    <span
                                                        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-sm ring-0 transition-transform ${
                                                            canEdit ? "translate-x-5" : "translate-x-0"
                                                        }`}
                                                    />
                                                </button>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[12px] sm:text-[14px] font-semibold text-slate-700 truncate">
                                                        {userLabel}
                                                    </p>
                                                </div>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── SIGNING block ── */}
                    <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-violet-50/60 to-indigo-50/30 p-4 sm:p-5 space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-5 rounded-full bg-violet-400" />
                            <span className="text-[11px] sm:text-[13px] font-bold text-slate-600 uppercase tracking-wider">
                                Imzolash bosqichi
                            </span>
                        </div>

                        <MySelect
                            control={form.control}
                            name="director_id"
                            options={staffOptions}
                            label={t("Direktor")}
                            placeholder={t("Select director")}
                            isClearable
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 flex gap-3 px-1">
                    <Button
                        variant="default"
                        onClick={onCancel}
                        className="flex-1 h-12 text-[13px] sm:text-[15px] font-semibold text-rose-600 bg-rose-600 hover:bg-rose-800 border-none transition-colors"
                    >
                        Bekor qilish
                    </Button>
                    <Button
    onClick={onSubmit}
    disabled={isSending}
    className="flex-[2] h-12 text-[13px] sm:text-[15px] font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-md gap-2"
>
    {isSending ? (
        <>
            <LoaderCircle className="size-4 sm:size-5 animate-spin" />
            Yuborilmoqda...
        </>
    ) : (
        <>
            Yuborish
        </>
    )}
</Button>
                </div>
            </div>
        </FormProvider>
    );
}