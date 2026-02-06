import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useToast } from "@/shared/hooks/useToast";
import useMutate from "@/shared/hooks/api/useMutate";
import useGetOne from "@/shared/hooks/api/useGetOne";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import { FLOWS_5_1_QUERY_KEY } from "@/pages/flows-5_1/constants/flows.constants.ts";
import { FlowInterface } from "@/pages/flows-5_1/interfaces/flow.interface.ts";
import { get } from "lodash";

export interface UpdateFormData {
    additional_information: string;
    reverse: string;
    forward: string;
    sp: string;
}

interface UseUpdateManyFlowsProps {
    selectedIds: string[];
    onSuccess?: () => void;
    onClose: () => void;
    isOpen: boolean;
}

const useUpdateManyFlows = ({
                                selectedIds,
                                onSuccess,
                                onClose,
                                isOpen,
                            }: UseUpdateManyFlowsProps) => {
    const { t } = useTranslation();
    const { toast } = useToast();

    const form = useForm<UpdateFormData>({
        defaultValues: {
            additional_information: "",
            reverse: "",
            forward: "",
            sp: "",
        },
    });

    const firstSelectedId = selectedIds[0];
    const { data: flowResponse, isLoading: isLoadingFlow } = useGetOne<{ data: FlowInterface }>({
        url: [FLOWS_5_1_QUERY_KEY, firstSelectedId],
        queryKey: [FLOWS_5_1_QUERY_KEY, firstSelectedId],
        options: {
            enabled: isOpen && !!firstSelectedId, // Modal ochilganda va ID mavjud bo'lsa
        },
    });

    useEffect(() => {
        const flowData = flowResponse?.data;
        console.log("🔍 Flow Response:", flowResponse);
        console.log("📦 Flow Data:", flowData);
        console.log("🚪 Modal Open:", isOpen);

        if (flowData && isOpen) {
            const resetData = {
                additional_information: flowData.additional_information || "",
                reverse: flowData.reverse || "",
                forward: flowData.forward || "",
                sp: flowData.sp || "",
            };

            console.log("✅ Resetting form with:", resetData);
            form.reset(resetData);
        }
    }, [flowResponse, isOpen, form]);

    useEffect(() => {
        if (!isOpen) {
            form.reset({
                additional_information: "",
                reverse: "",
                forward: "",
                sp: "",
            });
        }
    }, [isOpen, form]);

    const { query } = useMutate({
        url: [FLOWS_5_1_QUERY_KEY, "update-many"],
        method: MutateRequestMethod.PATCH,
        options: {
            onSuccess: () => {
                toast({
                    variant: "success",
                    title: t("Success"),
                    description: t(`Successfully updated ${selectedIds.length} flows`),
                });
                form.reset();
                onClose();
                onSuccess?.();
            },
            onError: (error: any) => {
                toast({
                    variant: "destructive",
                    title: t(`${get(error, "response.statusText", "Error")}`),
                    description: t(
                        `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`
                    ),
                });
            },
        },
    });

    const onSubmit = useCallback(
        (data: UpdateFormData) => {
            const updates: Partial<UpdateFormData> = {};

            if (data.additional_information?.trim()) {
                updates.additional_information = data.additional_information.trim();
            }
            if (data.reverse?.trim()) {
                updates.reverse = data.reverse.trim();
            }
            if (data.forward?.trim()) {
                updates.forward = data.forward.trim();
            }
            if (data.sp?.trim()) {
                updates.sp = data.sp.trim();
            }

            if (Object.keys(updates).length === 0) {
                toast({
                    variant: "destructive",
                    title: t("Error"),
                    description: t("Please fill at least one field"),
                });
                return;
            }

            const payload = {
                route_ids: selectedIds,
                updates,
            };

            query.mutate(payload);
        },
        [selectedIds, query, t, toast]
    );

    const handleClose = useCallback(() => {
        form.reset({
            additional_information: "",
            reverse: "",
            forward: "",
            sp: "",
        });
        onClose();
    }, [form, onClose]);

    return {
        form,
        onSubmit,
        handleClose,
        isLoading: query.isPending,
        isLoadingFlow,
    };
};

export default useUpdateManyFlows;