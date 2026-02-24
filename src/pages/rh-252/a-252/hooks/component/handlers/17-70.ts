import { buildBasePayload } from "../utils/commonPayload";
import { isoToHHmm, formatToISO } from "../utils/time";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1770: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? "");
    form.setValue(
      "payload.basic.organization_name",
      basic.organization_name ?? "",
    );
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue(
      "payload.basic.connection_closure_type",
      basic.connection_closure_type ?? "",
    );
    form.setValue(
      "payload.basic.max_duration_minutes",
      basic.max_duration_minutes ?? 0,
    );
    form.setValue("payload.basic.start_time", isoToHHmm(basic.start_time));
    form.setValue("payload.basic.end_time", isoToHHmm(basic.end_time));
    form.setValue("payload.basic.timezone", basic.timezone ?? "");
    form.setValue("payload.basic.context", basic.context ?? "");
    const flowIds = Array.isArray(payload.flow_ids)
        ? payload.flow_ids.map((item: any) => item.code || item)
        : [];

    form.setValue("payload.flow_ids", flowIds);
    form.setValue(
        "payload.file_name",
        basic.base_file ?? payload?.file_name ?? "",
    );
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
        base_file: data.payload.file_name || "",
        context: data.payload.basic.context,
      },
      flow_ids: data.payload.flow_ids || [],
    },
  }),
};

export default h1770;
