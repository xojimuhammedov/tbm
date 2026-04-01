import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";
import { buildBasePayload } from "../utils/commonPayload";
import { formatToISO } from "../utils/time";

const h1234: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? payload.title ?? "");
    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? payload.organization_name ?? "",
    );
    form.setValue(
      "payload.basic.request_number",
      basic.request_number ?? payload.request_number ?? "",
    );
    form.setValue(
      "payload.basic.request_date",
      basic.request_date ?? payload.request_date ?? null,
    );
    form.setValue(
      "payload.basic.connection_closure_type",
      basic.connection_closure_type ?? payload.connection_closure_type ?? "",
    );
    form.setValue(
      "payload.basic.max_duration_minutes",
      basic.max_duration_minutes ?? payload.max_duration_minutes ?? 0,
    );
    form.setValue(
      "payload.basic.start_time",
      basic.start_time ?? payload.start_time ?? "",
    );
    form.setValue(
      "payload.basic.end_time",
      basic.end_time ?? payload.end_time ?? "",
    );
    form.setValue(
      "payload.basic.context",
      basic.context ?? payload.context ?? "",
    );

    const flowIds = payload.flow_ids || payload.with_a_pause || [];
    const formattedFlowIds = Array.isArray(flowIds)
      ? flowIds.map((item: any) => item.code || item) // Map objects back to string IDs/codes
      : [];

    form.setValue("payload.flow_ids", formattedFlowIds, {
      shouldDirty: true,
      shouldValidate: true,
    });
  },

  build: (data, ctx) => {
    const basePayload = buildBasePayload(data, ctx.fullCode);
    return {
      ...basePayload,
      code: basePayload.code || "12-34",
      from: Array.isArray(data.from) && data.from.length ? data.from : ["TBP"],
      payload: {
        basic: {
          title: data.payload.basic.title,
          organization_name: data.payload.basic.organization_name,
          request_number: data.payload.basic.request_number,
          request_date: formatToISO(data.payload.basic.request_date),
          connection_closure_type: data.payload.basic.connection_closure_type,
          start_time: formatToISO(data.payload.basic.start_time),
          end_time: formatToISO(data.payload.basic.end_time),
          context: data.payload.basic.context || null,
          base_file: data.payload.file_name || data.payload?.basic?.base_file || "",
        },
        flow_ids: data.payload.flow_ids || [],
      },
    };
  },
};

export default h1234;
