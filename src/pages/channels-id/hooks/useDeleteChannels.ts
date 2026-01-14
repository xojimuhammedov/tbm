import { useState, useCallback } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useToast } from "@/shared/hooks/useToast.ts";
import { get } from "lodash";
import {CHANNELS_ID_DELETE} from "@/pages/channels-id/constants/channels.constants.ts";

export const useDeleteChannels = (refetch: () => void) => {
    const { t } = useTranslation();
    const { toast } = useToast();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const handleSelectRow = useCallback((id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    }, []);

    const handleSelectAll = useCallback((ids: string[]) => {
        setSelectedIds((prev) => (prev.length === ids.length ? [] : ids));
    }, []);
    const deleteMany = useCallback(async () => {
        if (selectedIds.length === 0) return;

        const confirmed = window.confirm(
            t("{{count}} ta elementni o'chirishga ruxsat berasizmi?", { count: selectedIds.length })
        );

        if (confirmed) {
            try {
                await axios.post(CHANNELS_ID_DELETE, { ids: selectedIds });

                toast({
                    variant: "success",
                    title: t("Muvaffaqiyatli o'chirildi"),
                });

                setSelectedIds([]);
                refetch();
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: t("Xatolik yuz berdi"),
                    description: get(error, "response.data.message", t("Server bilan aloqa uzildi")),
                });
            }
        }
    }, [selectedIds, refetch, t, toast]);

    return {
        selectedIds,
        handleSelectRow,
        handleSelectAll,
        deleteMany,
    };
};