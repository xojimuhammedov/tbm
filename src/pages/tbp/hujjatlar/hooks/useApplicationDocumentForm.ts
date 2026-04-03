import { codePrefix } from "@/pages/tbp/hujjatlar/hooks/component/utils/common.ts";
import { unwrapDoc } from "@/pages/tbp/hujjatlar/hooks/component/utils/doc.ts";
import { listToText } from "@/pages/tbp/hujjatlar/hooks/component/utils/list.ts";
import { handlers } from "@/pages/tbp/hujjatlar/hooks/component/utils/registry.ts";
import KEYS from "@/shared/constants/keys";
import URLS from "@/shared/constants/urls";
import { MutateRequestMethod } from "@/shared/enums/MutateRequestMethod";
import useGetOne from "@/shared/hooks/api/useGetOne";
import useMutate from "@/shared/hooks/api/useMutate";
import { useToast } from "@/shared/hooks/useToast";
import { get } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  const form = useForm<any>({
    shouldUnregister: false,
    defaultValues: {
      code: "",
      order_date: null,
      to: [],
      copy: [],
      from: "",
      position: "",
      signer: "",
      payload: {
        basic: {
          organization_name: "",
          request_number: "",
          request_date: null,
          title: "",
          connection_closure_type: "",
          max_duration_minutes: 0,
          start_time: "",
          end_time: "",
          context: "",
          orientation: "",
          responsible: "",
          base_file: "",
          // 12-48 fields
          station_interval: "",
          cause: "",
          control_station: "",
          agreed: "",
          requirement_ip: "",
          requirement_ip_date: null,
          requirement_user: "",
          requirement_user_date: null,
          // 12-12 fields
          signal_level: "",
          actions: [],
          description: "",
        },
        // 12-12 sections
        create: { flow_ids: [] },
        update: { update_type: "", channels: [], flows: [] },
        delete: { elements: [] },
        flow_ids: [],
        consumers: [],
      },
    },
  });

  const { data: editData, isLoading } = useGetOne({
    url: [URLS.TBP_Order_Application, id || ""],
    queryKey: [KEYS.TBP_Order_Application, id || ""],
    options: { enabled: !!id },
  });

  const { query: saveMutation } = useMutate({
    url: id ? [URLS.TBP_Order_Application, id] : [URLS.TBP_Order_Application],
    method: id ? MutateRequestMethod.PUT : MutateRequestMethod.POST,
    options: {
      onSuccess: () => {
        if (!id) {
          form.reset();
          fullCodeRef.current = "";
        }
        navigate("/tbp/hujjatlar");
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

  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!id) {
      isInitialLoad.current = false;
      return;
    }

    if (!editData) return;

    const doc = unwrapDoc(editData);
    if (!doc?.code) {
      isInitialLoad.current = false;
      return;
    }

    const fullCode = doc.code || "";
    const prefix = codePrefix(fullCode);

    fullCodeRef.current = fullCode;

    form.setValue("code", prefix);
    form.setValue("order_date", doc.order_date ?? null);
    form.setValue(
      "nomenclature_number",
      doc.nomenclature_number || doc.document_index || "",
    );
    const normalizeToValue = (item: any) =>
      typeof item === "string"
        ? item
        : (item?._id ?? item?.value ?? item?.name ?? "");

    const toValues = (Array.isArray(doc.to) ? doc.to : [])
      .map(normalizeToValue)
      .filter(Boolean);

    form.setValue("to", toValues);

    const copyValues = (Array.isArray(doc.copy) ? doc.copy : [])
      .map(normalizeToValue)
      .filter(Boolean);
    form.setValue("copy", copyValues);
    form.setValue("from", listToText(doc.from));
    form.setValue("signer", doc.signer?._id ?? doc.signer ?? "");
    form.setValue("position", doc.position?._id ?? doc.position ?? "");

    const handler = handlers[prefix];
    if (!handler) {
      isInitialLoad.current = false;
      return;
    }

    handler.populate(form, doc.payload || {});

    setTimeout(() => {
      isInitialLoad.current = false;
    }, 200);
  }, [editData, id, form]);

  const handleSubmit = useCallback(
    (data: any) => {
      const prefix = data.code;
      const handler = handlers[prefix];
      if (!handler) {
        console.error("Unknown code:", prefix);
        return;
      }
      const payload = handler.build(data, {
        fullCode: fullCodeRef.current || data.code,
      });
      saveMutation.mutate(payload);
    },
    [saveMutation],
  );

  return {
    id,
    form,
    handleSubmit,
    isLoading,
  };
};

export default useApplicationDocumentForm;
