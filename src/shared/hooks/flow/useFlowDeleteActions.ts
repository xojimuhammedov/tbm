import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/shared/hooks/useToast.ts";
import { useConfirm } from "dgz-ui-shared/hooks";
import { get } from "lodash";

interface UseFlowDeleteActionsProps {
    refetch: () => void;
    onSuccess?: () => void;
}

export const useFlowDeleteActions = ({
                                         refetch,
                                         onSuccess
                                     }: UseFlowDeleteActionsProps) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const { confirm }: any = useConfirm();

    const handleDeleteAll = useCallback((
        removeFn: (endpoint: string, data?: any) => Promise<any>
    ) => {
        confirm({
            title: t("Barchasini o'chirish"),
            description: t("Haqiqatan ham barcha ma'lumotlarni butunlay o'chirib tashlamoqchimisiz?"),
            onConfirm: async () => {
                try {
                    await removeFn("hard-delete-all", {});

                    toast({
                        variant: "success",
                        title: t("Muvaffaqiyatli"),
                        description: t("Barcha ma'lumotlar o'chirildi"),
                    });

                    refetch();
                    onSuccess?.();
                } catch (error) {
                    console.error("Delete all error:", error);
                    toast({
                        variant: "destructive",
                        title: t("Error"),
                        description: t(
                            `${get(error, "response.data.message", "An error occurred.")}`,
                        ),
                    });
                }
            },
        });
    }, [confirm, t, refetch, onSuccess, toast]);

    const handleDeleteMany = useCallback((
        selectedIds: string[],
        removeFn: (endpoint: string, data: { ids: string[] }) => Promise<any>
    ) => {
        if (selectedIds.length === 0) {
            toast({
                variant: "destructive",
                title: t("Xatolik"),
                description: t("Hech qanday element tanlanmagan"),
            });
            return;
        }

        confirm({
            title: t("Tasdiqlash"),
            description: t("{{count}} ta elementni o'chirishga ishonchingiz komilmi?", {
                count: selectedIds.length,
            }),
            onConfirm: () => {
                removeFn("delete-many", { ids: selectedIds })
                    .then(() => {
                        toast({
                            variant: "success",
                            title: t("Muvaffaqiyatli"),
                            description: t("{{count}} ta element o'chirildi", {
                                count: selectedIds.length,
                            }),
                        });

                        refetch();
                        onSuccess?.();
                    })
                    .catch((error: any) => {
                        toast({
                            variant: "destructive",
                            title: t(`${get(error, "response.statusText", "Error")}`),
                            description: t(
                                `${get(error, "response.data.message", "An error occurred.")}`,
                            ),
                        });
                    });
            },
        });
    }, [confirm, t, refetch, onSuccess, toast]);

    return {
        handleDeleteAll,
        handleDeleteMany,
    };
};