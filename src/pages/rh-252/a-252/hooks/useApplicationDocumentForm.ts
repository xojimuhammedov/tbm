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
      document_index: "",
      order_date: null,
      to: [],
      copy: [],
      responsible: "",
      point_a: "",
      point_b: "",
      count: "",
      payload: {
        basic: {
          organization_name: "",
          request_number: "",
          request_date: null,
          deadline: null,
          justification: "",
          signal_level: "",
          actions: [],
          context: "",
          title: "",
          connection_closure_type: "",
          max_duration_minutes: 0,
          start_time: "",
          end_time: "",
          timezone: "",
        },
        create: {
          flow_ids: [],
        },
        update: {
          update_type: "",
          flow_ids: [],
        },
        delete: {
          elements: [],
        },
        events: [],
        flow_ids: [],
      },
    },
  });

  const currentUpdateType = form.watch("payload.update.update_type");
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
    const currentFlows = form.getValues("payload.update.flow_ids");
    if (currentFlows && currentFlows.length > 0) {
      const clearedFlows = currentFlows.map(() => {
        if (currentUpdateType === "channels") {
          return { old: "", new: "" };
        } else {
          return {
            code: "",
            point_a: "",
            point_b: "",
            device_a: "",
            device_b: "",
            port_a: "",
            port_b: "",
            signal_level: "",
          };
        }
      });
      form.setValue("payload.update.flow_ids", clearedFlows);
    }
    clearValidation();
  }, [currentUpdateType, form]);

  const handleGenerate = useCallback(async () => {
    if (!count || Number(count) <= 0) return;
    try {
      const res = await request.get(
          `/api/flows-id/empty-id-numbers?count=${count}`,
      );
      const result = await res.data;

      const ids: string[] = result.data || [];

      const rows = Array.from({ length: Number(count) }).map((_, i) => ({
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
      toast({
        variant: "destructive",
        title: t("Error"),
        description: t("Failed to generate IDs"),
      });
      return [];
    }
  }, [count, stationA, stationB, toast, t]);

  const createBasePayload = (data: any) => ({
    code: data.code,
    document_index: data.document_index,
    order_date: data.order_date,
    to: data.to,
    copy: data.copy,
    responsible: data.responsible,
  });

  const formatToISO = (timeStr: string) => {
    if (!timeStr) return null;
    if (timeStr.includes('T')) return timeStr;
    const today = new Date().toISOString().split('T')[0];
    return `${today}T${timeStr}:00.000Z`;
  };
  const createPayload1745 = (data: any) => {
    const updatePayload: any = {};
    if (data.payload?.update?.flow_ids?.length > 0) {
      const updateType = data.payload.update.update_type;
      if (updateType === "channels") {
        updatePayload.channels = data.payload.update.flow_ids.map(
            (item: any) => ({
              old: item.old,
              new: item.new,
            }),
        );
      } else if (updateType === "flows") {
        updatePayload.flows = data.payload.update.flow_ids.map(
            (item: any) => ({
              code: item.code,
              point_a: item.point_a,
              point_b: item.point_b,
              device_a: item.device_a,
              device_b: item.device_b,
              port_a: item.port_a,
              port_b: item.port_b,
              signal_level: item.signal_level,
            }),
        );
      }
    }

    return {
      ...createBasePayload(data),
      payload: {
        basic: {
          organization_name: data.payload.basic.organization_name,
          request_number: data.payload.basic.request_number,
          request_date: data.payload.basic.request_date,
          deadline: data.payload.basic.deadline,
          justification: data.payload.basic.justification,
          signal_level: data.payload.basic.signal_level,
          actions: data.payload.basic.actions,
        },
        create: data.payload.basic.actions?.includes("create")
            ? {
              flow_ids:
                  data.payload.create?.flow_ids?.map(
                      ({ id_exist, ...rest }: any) => rest,
                  ) || [],
            }
            : undefined,
        update: data.payload.basic.actions?.includes("update")
            ? updatePayload
            : undefined,
        delete: data.payload.basic.actions?.includes("delete")
            ? {
              elements: currentIds,
            }
            : undefined,
      },
    };
  };

  const createPayload1754 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      basic: {
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        justification: data.payload.basic.justification,
        context: data.payload.basic.context,
      },
      events: data.payload.events || [],
    },
  });

  const createPayload1733 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      basic: {
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        deadline: data.payload.basic.deadline,
        justification: data.payload.basic.justification,
      },
      delete: {
        elements: data.payload.delete.elements || [],
      },
    },
  });

  const createPayload1770 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      basic: {
        title: data.payload.basic.title,
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        connection_closure_type: data.payload.basic.connection_closure_type,
        max_duration_minutes: data.payload.basic.max_duration_minutes,
        start_time: formatToISO(data.payload.basic.start_time),
        end_time: formatToISO(data.payload.basic.end_time),
        timezone: data.payload.basic.timezone,
      },
      flow_ids: data.payload.flow_ids || [],
    },
  });
  const submitPayload = (payload: any) => {
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
  };

  const handleSubmit = useCallback(
      (data: any) => {
        const code = data.code;
        let payload;

        switch (code) {
          case "17-45":
            payload = createPayload1745(data);
            break;
          case "17-54":
            payload = createPayload1754(data);
            break;
          case "17-33":
            payload = createPayload1733(data);
            break;
          case "17-70":
            payload = createPayload1770(data);
            break;
          default:
            console.error("Unknown code:", code);
            return;
        }

        submitPayload(payload);
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