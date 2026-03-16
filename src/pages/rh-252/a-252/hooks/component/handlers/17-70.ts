import { buildBasePayload } from "../utils/commonPayload";
import { formatToISO } from "../utils/time";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1770: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? payload.title ?? "");
    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? payload.organization_name ?? "",
    );
    form.setValue("payload.basic.request_number", basic.request_number ?? payload.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? payload.request_date ?? null);
    form.setValue(
      "payload.basic.connection_closure_type",
      basic.connection_closure_type ?? payload.connection_closure_type ?? "",
    );
    form.setValue(
      "payload.basic.max_duration_minutes",
      basic.max_duration_minutes ?? payload.max_duration_minutes ?? 0,
    );
    form.setValue("payload.basic.start_time", basic.start_time ?? payload.start_time ?? "");
    form.setValue("payload.basic.end_time", basic.end_time ?? payload.end_time ?? "");
    form.setValue("payload.basic.timezone", basic.timezone ?? payload.timezone ?? "");
    form.setValue("payload.basic.context", basic.context ?? payload.context ?? "");
    
    const rawFlowIds = (payload.flow_ids?.length > 0) ? payload.flow_ids : (payload.flow_ids_pending || []);
    const flowIds = Array.isArray(rawFlowIds)
      ? rawFlowIds.map((item: any) => item.code || item)
      : [];

    setTimeout(() => {
      form.setValue("payload.flow_ids", flowIds, { shouldDirty: true, shouldValidate: true });
    }, 0);
  },

  build: (data, ctx) => ({
    ...buildBasePayload(data, ctx.fullCode),
    payload: {
      basic: {
        title: data.payload.basic.title,
        organization_name: data.payload.basic.organization_name,
        request_number: data.payload.basic.request_number,
        request_date: data.payload.basic.request_date,
        connection_closure_type: data.payload.basic.connection_closure_type,
        max_duration_minutes: data.payload.basic.max_duration_minutes || 0,
        start_time: formatToISO(data.payload.basic.start_time),
        end_time: formatToISO(data.payload.basic.end_time),
        ...(data.payload.file_name ? { base_file: data.payload.file_name } : {}),
        context: data.payload.basic.context,
      },
      flow_ids: data.payload.flow_ids || [],
    },
  }),
};

export default h1770;
