import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast";
import usePostQuery from "@/shared/hooks/query/usePostQuery";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { request } from "@/request";
import { useFlowValidation } from "@/pages/rh-252/a-252/hooks/useCheckForm";

export interface UseApplicationDocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

const useApplicationDocumentForm = ({
                                      id,
                                      onSave,
                                    }: UseApplicationDocumentFormParams) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [currentIds, setCurrentIds] = useState<string[]>([]);

  const form = useForm<any>({
    shouldUnregister: false,
    defaultValues: {
      code: "",
      original_num: "",
      responsible: "",
      from: "TBM",
      to: "",
      count: "",
      dead_line: "",
      content:
          "tarmoqdan o'chirilganligi tasdiqlansin va texnologik hujjatlarga tegishli o'zgartirishlar kiritilsin:",
      signal_level: "",
      create: {
        flow_ids: [],
      },
      action_type: [],
      update: {
        update_type: "",
        flow_ids: [],
      },
    },
  });

  const currentUpdateType = form.watch("update.update_type");
  const count = form.watch("count");
  const stationA = form.watch("point_a");
  const stationB = form.watch("point_b");

  const { getValidationClass, getOriginalNumValidationClass, clearValidation } =
      useFlowValidation({
        control: form.control,
        updateType: currentUpdateType,
      });

  const { mutate } = usePostQuery({
    listKeyId: KEYS.RH_Order_Application,
  });
  
  useEffect(() => {
    if (!currentUpdateType) return;

    const currentFlows = form.getValues("update.flow_ids");
    if (currentFlows && currentFlows.length > 0) {
      const clearedFlows = currentFlows.map(() => {
        if (currentUpdateType === "channels") {
          return { id_or_channel: "", new_id_or_channel: "" };
        } else {
          return {
            id_or_channel: "",
          };
        }
      });
      form.setValue("update.flow_ids", clearedFlows);
    }
    clearValidation();
  }, [clearValidation, currentUpdateType, form]);

  const handleGenerate = useCallback(async () => {
    if (!count || Number(count) <= 0) return;

    try {
      const res = await request.get(
          `/api/flows-id/empty-id-numbers?count=${count}`,
      );
      const result = await res.data;

      const ids: string[] = result.data || [];

      const rows = Array.from({ length: count }).map((_, i) => ({
        code: ids[i] || "",
        point_a: stationA || "",
        point_b: stationB || "",
        signal_level: "",
        port_a: "",
        port_b: "",
        device_a: "",
        device_b: "",
        id_exist: null,
      }));

      return rows;
    } catch (error) {
      console.error("ID generate error:", error);
      toast({
        variant: "destructive",
        title: t("Error"),
        description: t("Failed to generate IDs"),
      });
      return [];
    }
  }, [count, stationA, stationB, toast, t]);

  const handleSubmit = useCallback(
      (data: any) => {
        const updatePayload: any = {};
        if (data.update?.flow_ids?.length > 0) {
          const channels = data.update.flow_ids
              .filter((item: any) => item.update_type === "channels")
              .map((item: any) => ({
                old: item.id_or_channel,
                new: item.new_id_or_channel,
              }));

          const flows = data.update.flow_ids
              .filter((item: any) => item.update_type === "flows")
              .map((item: any) => ({
                code: item.id_or_channel,
                point_a: item.point_a,
                point_b: item.point_b,
                device_a: item.device_a,
                device_b: item.device_b,
                port_a: item.port_a,
                port_b: item.port_b,
              }));

          if (channels.length > 0) updatePayload.channels = channels;
          if (flows.length > 0) updatePayload.flows = flows;
        }

        const payload = {
          code: data.code,
          original_num: data.original_num,
          order_date: data.order_date,
          responsible: data.responsible,
          from: data.from,
          to: data.to,
          count: data.count ? Number(data.count) : 0,
          dead_line: data.dead_line,
          action_type: data.action_type,
          signal_level: data.signal_level,
          content: data.content,
          create: {
            flow_ids: data.create?.flow_ids?.map(
                ({ id_exist, ...rest }: any) => rest,
            ),
          },
          delete: {
            elements: currentIds,
          },
          update: updatePayload,
        };

        mutate(
            {
              url: URLS.RH_Order_Application,
              attributes: payload,
            },
            {
              onSuccess: () => {
                form.reset();
                navigate("/rh-252/a-252");
                onSave?.();
                toast({
                  variant: "success",
                  title: t("Success"),
                  description: t("Application created successfully"),
                });
              },
              onError: (error: any) => {
                toast({
                  variant: "destructive",
                  title: t(`${get(error, "response.statusText", "Error")}`),
                  description: t(
                      `${get(error, "response.data.message", "An error occurred. Contact the administrator")}`,
                  ),
                });
              },
            },
        );
      },
      [currentIds, mutate, navigate, onSave, toast, t, form],
  );

  return {
    id,
    form,
    handleSubmit,
    handleGenerate,
    currentIds,
    setCurrentIds,
    getValidationClass,
    getOriginalNumValidationClass,
    currentUpdateType,
  };
};

export default useApplicationDocumentForm;