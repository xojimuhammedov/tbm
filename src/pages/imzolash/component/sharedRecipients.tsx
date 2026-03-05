import { MySelect } from "dgz-ui-shared/components/form";
import { Button } from "dgz-ui/button";
import { LoaderCircleIcon } from "lucide-react";
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
            <div
                className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden"
                style={{ animation: "slideDown 0.25s cubic-bezier(0.34,1.1,0.64,1)" }}
            >
                <style>{`
                    @keyframes slideDown {
                        from { opacity: 0; transform: translateY(-10px); }
                        to   { opacity: 1; transform: translateY(0); }
                    }
                `}</style>

                {/* Header */}
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="font-bold text-sm text-slate-800">
                            Ko'rib chiqishga yuborish
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Tasdiqlash va imzolash uchun xodimlarni tanlang
                        </p>
                    </div>
                    <button
                        onClick={onCancel}
                        className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 text-sm transition-all duration-150"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                    {/* ── APPROVAL block ── */}
                    <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-amber-50/60 to-orange-50/30 p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-4 rounded-full bg-amber-400" />
                            <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider">
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
                            <div className="mt-4 pt-3 border-t border-amber-100/50">
                                <p className="text-[10.5px] font-bold text-amber-700/60 uppercase tracking-wider mb-2">
                                    Tahrirlash huquqlari
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                                                className="flex items-center gap-2.5 bg-white/60 p-2 rounded-lg border border-amber-100/50 hover:bg-white cursor-pointer transition-colors group"
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
                                                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                                                        canEdit ? "bg-amber-400" : "bg-slate-200"
                                                    }`}
                                                >
                          <span
                              className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform ${
                                  canEdit ? "translate-x-4" : "translate-x-0"
                              }`}
                          />
                                                </button>
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-[11px] font-semibold text-slate-700 truncate">
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
                    <div className="rounded-xl border border-slate-100 bg-gradient-to-br from-violet-50/60 to-indigo-50/30 p-4 space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-4 rounded-full bg-violet-400" />
                            <span className="text-[10.5px] font-bold text-slate-600 uppercase tracking-wider">
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
                <div className="px-5 pb-5 flex gap-2.5">
                    <Button
                        variant="default"
                        onClick={onCancel}
                        className="flex-1 h-10 text-[12.5px] font-semibold text-slate-600"
                    >
                        Bekor qilish
                    </Button>
                    <Button
                        onClick={onSubmit}
                        disabled={isSending}
                        className="flex-[2] h-10 text-[12.5px] font-semibold bg-sky-500 hover:bg-sky-600 text-white shadow-sm"
                    >
                        {isSending ? (
                            <>
                                <LoaderCircleIcon className="size-3.5 animate-spin" />
                                Yuborilmoqda...
                            </>
                        ) : (
                            <>
                                <svg
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                                Yuborish
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </FormProvider>
    );
}