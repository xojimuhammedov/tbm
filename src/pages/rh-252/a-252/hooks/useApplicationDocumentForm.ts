import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { get } from "lodash";
import { useToast } from "@/shared/hooks/useToast";
import useGetOne from "@/shared/hooks/api/useGetOne";
import useMutate from "@/shared/hooks/api/useMutate";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { request } from "@/request";
import { useFlowValidation } from "@/pages/rh-252/a-252/hooks/useCheckForm";
import { unwrapDoc } from "@/pages/rh-252/a-252/hooks/component/utils/doc.ts";
import { codePrefix } from "@/pages/rh-252/a-252/hooks/component/utils/common.ts";
import { listToText } from "@/pages/rh-252/a-252/hooks/component/utils/list.ts";
import { handlers } from "@/pages/rh-252/a-252/hooks/component/utils/registry.ts";

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

  const fullCodeRef = useRef<string>("");
  const [currentIds, setCurrentIds] = useState<string[]>([]);

  const form = useForm<any>({
    shouldUnregister: false,
    defaultValues: {
      code: "",
      order_date: null,
      to: "",
      copy: "",
      responsible: "",
      director: "",
      point_a: "",
      point_b: "",
      count: "",
      payload: {
        basic: {
          organization_name: "",
          request_number: "",
          request_date: null,
          deadline: null,
          base_file: "",
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
        create: { flow_ids: [] },
        update: { update_type: "", flow_ids: [] },
        delete: { elements: [] },
        events: [],
        flow_ids: [],
        content: "",
        including: "",
        main_routes: "",
        reserve_routes: "",
        stopped_flows: [],
        responsible_person: "",
        concert_text: "",
        basis: "",
        file_name: "",
      },
    },
  });

  const currentUpdateType = form.watch("payload.update.update_type");
  const count = form.watch("count");

  const { getValidationClass, getOriginalNumValidationClass, clearValidation } =
    useFlowValidation({
      control: form.control,
      updateType: currentUpdateType,
    });

  const { data: editData, isLoading } = useGetOne({
    url: [URLS.RH_Order_Application, id || ""],
    queryKey: [KEYS.RH_Order_Application, id || ""],
    options: { enabled: !!id },
  });

  const { query: saveMutation } = useMutate({
    url: [URLS.RH_Order_Application, id || ""],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        if (!id) {
          form.reset();
          setCurrentIds([]);
          fullCodeRef.current = "";
        }
        navigate("/rh-252/a-252");
        onSave?.();
        toast({
          variant: "success",
          title: t("Success"),
          description: id
            ? t("Application updated successfully")
            : t("Application created successfully"),
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
  });

  useEffect(() => {
    if (!editData || !id) return;
    const doc = unwrapDoc(editData);
    if (!doc?.code) return;

    const fullCode = doc.code || "";
    const prefix = codePrefix(fullCode);

    fullCodeRef.current = fullCode;

    form.setValue("code", prefix);
    form.setValue("order_date", doc.order_date ?? null);
    form.setValue("to", listToText(doc.to));
    form.setValue("copy", listToText(doc.copy));
    form.setValue("responsible", doc?.responsible?._id ?? "");
    form.setValue("director", doc?.director ?? "");

    const handler = handlers[prefix];
    if (!handler) return;

    handler.populate(form, doc.payload || {}, { setCurrentIds });
  }, [editData, id]);

  useEffect(() => {
    const prefix = codePrefix(fullCodeRef.current || "");
    if (prefix !== "17-45") return;
    if (!currentUpdateType) return;

    const currentFlows = form.getValues("payload.update.flow_ids") || [];
    const isAlreadyCleared =
      currentFlows.length > 0 &&
      currentFlows.every((f: any) => !f?.code && !f?.old_code);

    if (isAlreadyCleared) return;

    const clearedFlows = currentFlows.map(() => {
      if (currentUpdateType === "channels") {
        return { old_code: "", new_code: "", old_int: "", new_int: "" };
      }
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
    });

    form.setValue("payload.update.flow_ids", clearedFlows);
    clearValidation();
  }, [currentUpdateType]);

  const handleGenerate = useCallback(async () => {
    const cnt = Number(count);
    if (!cnt || cnt <= 0) return [];
    const stationA = form.getValues("point_a");
    const stationB = form.getValues("point_b");
    try {
      const res = await request.get(
        `/api/flows-id/empty-id-numbers?count=${cnt}`,
      );
      const result = await res.data;
      const ids: string[] = result.data || [];

      const rows = Array.from({ length: cnt }).map((_, i) => ({
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
  }, [count, form, toast, t]);

  const handleSubmit = useCallback(
    (data: any) => {
      const prefix = data.code; // UI prefix
      const handler = handlers[prefix];
      if (!handler) {
        console.error("Unknown code:", prefix);
        return;
      }
      const payload = handler.build(data, {
        fullCode: fullCodeRef.current || data.code,
        currentIds,
      });
      saveMutation.mutate(payload);
    },
    [currentIds, saveMutation],
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
    isLoading,
  };
};

export default useApplicationDocumentForm;
