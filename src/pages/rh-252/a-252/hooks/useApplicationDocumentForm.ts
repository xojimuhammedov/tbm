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

export interface UseApplicationDocumentFormParams {
  id?: string | null;
  onSave?: () => void;
}

/** ===== Helpers ===== */
const safeArray = <T,>(v: any): T[] => (Array.isArray(v) ? v : []);
const codePrefix = (full?: string) => (full ? full.split("-").slice(0, 2).join("-") : "");

/** API datetime -> "HH:mm" */
const isoToHHmm = (iso?: string | null) => {
  if (!iso) return "";
  if (iso.includes("T")) return iso.split("T")[1]?.slice(0, 5) || "";
  return iso.slice(0, 5);
};

/** "HH:mm" -> ISO (today) */
const formatToISO = (timeStr: string) => {
  if (!timeStr) return null;
  if (timeStr.includes("T")) return timeStr;
  const today = new Date().toISOString().split("T")[0];
  return `${today}T${timeStr}:00.000Z`;
};

/** to/copy: array -> textarea string */
const listToText = (v: any) => safeArray<string>(v).join("\n");
/** textarea string -> array */
const textToList = (v: any) =>
    typeof v === "string" ? v.split("\n").map((x) => x.trim()).filter(Boolean) : safeArray<string>(v);

/** ===== Hook ===== */
const useApplicationDocumentForm = ({ id, onSave }: UseApplicationDocumentFormParams) => {
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
        create: {
          flow_ids: [],
        },
        update: {
          update_type: "",
          flow_ids: [],
        },
        delete: {
          channels: [],
        },
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
  const stationA = form.watch("point_a");
  const stationB = form.watch("point_b");

  const { getValidationClass, getOriginalNumValidationClass, clearValidation } = useFlowValidation({
    control: form.control,
    updateType: currentUpdateType,
  });

  /** ===== Edit uchun data ===== */
  const { data: editData, isLoading } = useGetOne({
    url: [URLS.RH_Order_Application, id || ""],
    queryKey: [KEYS.RH_Order_Application, id || ""],
    options: { enabled: !!id },
  });

  /** ===== Save mutate ===== */
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
          description: id ? t("Application updated successfully") : t("Application created successfully"),
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

  type AnyObj = Record<string, any>;
  const isObj = (v: unknown): v is AnyObj => typeof v === "object" && v !== null;
  const unwrapDoc = (v: unknown): AnyObj | null => {
    if (!isObj(v)) return null;
    if (isObj(v.data)) return v.data as AnyObj;
    return v as AnyObj;
  };

  useEffect(() => {
    if (!editData || !id) return;

    const doc = unwrapDoc(editData);
    if (!doc?.code) return;

    populateFormData(doc);
  }, [editData, id]);


  const populateFormData = (doc: any) => {
    const fullCode = doc?.code || "";
    const prefix = codePrefix(fullCode); // "17-45"

    fullCodeRef.current = fullCode;

    form.setValue("code", prefix);
    form.setValue("order_date", doc.order_date ?? null);

    // UI uchun string (textarea ko'rinishida)
    form.setValue("to", listToText(doc.to));
    form.setValue("copy", listToText(doc.copy));

    // responsible object -> id
    form.setValue("responsible", doc?.responsible?._id ?? "");

    // endi payload doc.payload ichida
    const payload = doc.payload || {};

    switch (prefix) {
      case "17-45":
        populateForm1745(payload);
        break;
      case "17-54":
        populateForm1754(payload);
        break;
      case "17-33":
        populateForm1733(payload);
        break;
      case "17-70":
        populateForm1770(payload);
        break;
      case "17-48":
        populateForm1748(payload);
        break;
      case "17-31":
        populateForm1731(payload);
        break;
      default:
        break;
    }
  };

  /** ====== 17-45 POPULATE (APIga mos) ====== */
  const populateForm1745 = (payload: any) => {
    const basic = payload.basic || {};

    form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.deadline", basic.deadline ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");
    form.setValue("payload.basic.signal_level", basic.signal_level ?? "");
    form.setValue("payload.basic.actions", safeArray<string>(basic.actions));

    // Create flow_ids (API: payload.create.flow_ids)
    if (payload.create?.flow_ids) {
      const rows = safeArray(payload.create.flow_ids).map((x: any) => ({
        code: x?.code ?? "",
        point_a: x?.point_a ?? "",
        point_b: x?.point_b ?? "",
        signal_level: x?.signal_level ?? "",
        port_a: x?.port_a ?? "",
        port_b: x?.port_b ?? "",
        device_a: x?.device_a ?? "",
        device_b: x?.device_b ?? "",
        id_exist: null,
      }));
      form.setValue("payload.create.flow_ids", rows);
    }

    // Update - channels yoki flows
    const hasChannels = safeArray(payload.update?.channels).length > 0;
    const hasFlows = safeArray(payload.update?.flows).length > 0;

    if (hasChannels) {
      form.setValue("payload.update.update_type", "channels");

      // API: channels: [{old:{code,int}, new:{code,int}}]
      const channelsUI = safeArray(payload.update.channels).map((ch: any) => ({
        old_code: ch?.old?.code ?? "",
        new_code: ch?.new?.code ?? "",
        old_int: ch?.old?.international_stream_number ?? "",
        new_int: ch?.new?.international_stream_number ?? "",
      }));

      form.setValue("payload.update.flow_ids", channelsUI);
    } else if (hasFlows) {
      form.setValue("payload.update.update_type", "flows");

      const flowsUI = safeArray(payload.update.flows).map((fl: any) => ({
        code: fl?.code ?? "",
        point_a: fl?.point_a ?? "",
        point_b: fl?.point_b ?? "",
        device_a: fl?.device_a ?? "",
        device_b: fl?.device_b ?? "",
        port_a: fl?.port_a ?? "",
        port_b: fl?.port_b ?? "",
        signal_level: fl?.signal_level ?? "",
      }));

      form.setValue("payload.update.flow_ids", flowsUI);
    } else {
      form.setValue("payload.update.update_type", "");
      form.setValue("payload.update.flow_ids", []);
    }

    // Delete: API payload.delete.channels: string[]
    const delChannels = safeArray<string>(payload.delete?.channels);
    setCurrentIds(delChannels);
    form.setValue("payload.delete.channels", delChannels);
  };

  /** ====== 17-54 ====== */
  const populateForm1754 = (payload: any) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");
    form.setValue("payload.basic.context", basic.context ?? "");
    form.setValue("payload.events", payload.events || []);
  };

  /** ====== 17-33 ====== */
  const populateForm1733 = (payload: any) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.deadline", basic.deadline ?? null);
    form.setValue("payload.basic.justification", basic.justification ?? "");

    // API delete.channels bo'lishi mumkin (sizning eski UI esa delete.elements edi)
    const delChannels = safeArray<string>(payload.delete?.channels);
    setCurrentIds(delChannels);
    form.setValue("payload.delete.channels", delChannels);
  };

  /** ====== 17-70 ====== */
  const populateForm1770 = (payload: any) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? "");
    form.setValue("payload.basic.organization_name", basic.organization_name ?? "");
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.connection_closure_type", basic.connection_closure_type ?? "");
    form.setValue("payload.basic.max_duration_minutes", basic.max_duration_minutes ?? 0);

    form.setValue("payload.basic.start_time", isoToHHmm(basic.start_time));
    form.setValue("payload.basic.end_time", isoToHHmm(basic.end_time));
    form.setValue("payload.basic.timezone", basic.timezone ?? "");

    form.setValue("payload.flow_ids", payload.flow_ids || []);
  };

  /** ====== 17-48 ====== */
  const populateForm1748 = (payload: any) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? "");
    form.setValue("payload.basic.start_time", basic.start_time ?? "");
    form.setValue("payload.basic.end_time", basic.end_time ?? "");
    form.setValue("payload.concert_second", payload.concert_second ?? "");
    form.setValue("payload.content", payload.content ?? "");
    form.setValue("payload.including", payload.including ?? "");
    form.setValue("payload.main_routes", payload.main_routes ?? "");
    form.setValue("payload.reserve_routes", payload.reserve_routes ?? "");
    form.setValue("payload.stopped_flows", payload.stopped_flows || []);
    form.setValue("payload.responsible_person", payload.responsible_person ?? "");
    form.setValue("payload.concert_text", payload.concert_text ?? "");
    form.setValue("payload.basis", payload.basis ?? "");
  };

  /** ====== 17-31 ====== */
  const populateForm1731 = (payload: any) => {
    form.setValue("payload.file_name", payload.file_name ?? "");
  };

  /** ===== UpdateType o'zgarsa: row strukturasi reset ===== */
  useEffect(() => {
    if (!currentUpdateType) return;

    const currentFlows = form.getValues("payload.update.flow_ids");

    // Agar massiv allaqachon tozalangan bo'lsa yoki kerakli strukturada bo'lsa, to'xtatamiz
    // Bu cheksiz siklni oldini oladi
    const isAlreadyCleared = currentFlows.every((f: { code: any; old_code: any; }) => !f.code && !f.old_code);
    if (currentFlows.length > 0 && isAlreadyCleared) return;

    const clearedFlows = currentFlows.map(() => {
      if (currentUpdateType === "channels") {
        return { old_code: "", new_code: "", old_int: "", new_int: "" };
      }
      return { code: "", point_a: "", point_b: "", device_a: "", device_b: "", port_a: "", port_b: "", signal_level: "" };
    });

    form.setValue("payload.update.flow_ids", clearedFlows);
    clearValidation();
  }, [currentUpdateType]); // Bog'liqliklar ro'yxatini minimallashtiring
  /** ===== Generate IDs ===== */
  const handleGenerate = useCallback(async () => {
    if (!count || Number(count) <= 0) return [];
    try {
      const res = await request.get(`/api/flows-id/empty-id-numbers?count=${count}`);
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

  /** ===== Base payload ===== */
  const createBasePayload = (data: any) => ({
    // 🔥 serverga full code yuboramiz
    code: fullCodeRef.current || data.code,
    order_date: data.order_date,
    // UI: textarea string -> array
    to: textToList(data.to),
    copy: textToList(data.copy),
    // UI: select id
    responsible: data.responsible,
  });

  /** ===== 17-45 SUBMIT (API format) ===== */
  const createPayload1745 = (data: any) => {
    const actions = safeArray<string>(data.payload?.basic?.actions);

    // UPDATE conversion
    const updateType = data.payload?.update?.update_type;
    let updatePayload: any = undefined;

    if (actions.includes("update")) {
      if (updateType === "channels") {
        updatePayload = {
          channels: safeArray(data.payload?.update?.flow_ids).map((row: any) => ({
            old: {
              code: row.old_code,
              international_stream_number: row.old_int || "",
            },
            new: {
              code: row.new_code,
              international_stream_number: row.new_int || "",
            },
          })),
          flows: [],
        };
      } else if (updateType === "flows") {
        updatePayload = {
          channels: [],
          flows: safeArray(data.payload?.update?.flow_ids).map((row: any) => ({
            code: row.code,
            point_a: row.point_a,
            point_b: row.point_b,
            device_a: row.device_a,
            device_b: row.device_b,
            port_a: row.port_a,
            port_b: row.port_b,
            signal_level: row.signal_level,
          })),
        };
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
          actions,
          base_file: data.payload.file_name || "",
        },

        create: actions.includes("create")
            ? {
              flow_ids:
                  data.payload.create?.flow_ids?.map(({ id_exist, ...rest }: any) => rest) || [],
            }
            : undefined,

        update: actions.includes("update") ? updatePayload : undefined,

        delete: actions.includes("delete")
            ? {
              // ✅ API: channels
              channels: currentIds,
              flow_ids: [],
              channel_ids: [],
            }
            : undefined,
      },
    };
  };

  /** ===== 17-54 SUBMIT ===== */
  const createPayload1754 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      basic: {
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        justification: data.payload.basic.justification,
        context: data.payload.basic.context,
        base_file: data.payload.file_name || "",
      },
      events: data.payload.events || [],
    },
  });

  /** ===== 17-33 SUBMIT (API delete.channels) ===== */
  const createPayload1733 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      basic: {
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        deadline: data.payload.basic.deadline,
        justification: data.payload.basic.justification,
        base_file: data.payload.file_name || "",
      },
      delete: {
        channels: currentIds,
        flow_ids: [],
        channel_ids: [],
      },
    },
  });

  /** ===== 17-70 SUBMIT ===== */
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
        base_file: data.payload.file_name || "",
      },
      flow_ids: data.payload.flow_ids || [],
    },
  });

  /** ===== 17-48 SUBMIT ===== */
  const createPayload1748 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      basic: {
        title: data.payload.basic.title,
        start_time: formatToISO(data.payload.basic.start_time),
        end_time: formatToISO(data.payload.basic.end_time),
        base_file: data.payload.file_name || "",
      },
      content: data.payload.content,
      concert_second: data.payload.concert_second,
      including: data.payload.including,
      main_routes: data.payload.main_routes,
      reserve_routes: data.payload.reserve_routes,
      stopped_flows: data.payload.stopped_flows || [],
      responsible_person: data.payload.responsible_person,
      concert_text: data.payload.concert_text,
      basis: data.payload.basis,
    },
  });

  /** ===== 17-31 SUBMIT ===== */
  const createPayload1731 = (data: any) => ({
    ...createBasePayload(data),
    payload: {
      file_name: data.payload.file_name,
    },
  });

  /** ===== Submit ===== */
  const handleSubmit = useCallback(
      (data: any) => {
        const prefix = data.code; // UI prefix
        let payload;

        switch (prefix) {
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
          case "17-48":
            payload = createPayload1748(data);
            break;
          case "17-31":
            payload = createPayload1731(data);
            break;
          default:
            console.error("Unknown code:", prefix);
            return;
        }

        saveMutation.mutate(payload);
      },
      [currentIds, saveMutation],
  );

  return {
    id,
    form,
    handleSubmit,
    handleGenerate,
    // delete.channels ni siz eski nom bilan ishlatyapsiz: currentIds
    currentIds,
    setCurrentIds,
    getValidationClass,
    getOriginalNumValidationClass,
    currentUpdateType,
    isLoading,
  };
};

export default useApplicationDocumentForm;
