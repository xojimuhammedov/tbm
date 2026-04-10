import { buildBasePayload } from "../utils/commonPayload";
import { safeArray } from "../utils/common";
import { Handler } from "@/pages/rh-252/a-252/hooks/component/types/types.ts";

const h1746: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.direction", basic.direction ?? "global");
    form.setValue("payload.basic.action_type", basic.action_type ?? "block");
    form.setValue("payload.basic.company_name", basic.company_name ?? "");
    form.setValue("payload.basic.request_date", basic.request_date ?? null);
    form.setValue("payload.basic.request_number", basic.request_number ?? "");
    form.setValue("payload.basic.reason", basic.reason ?? "");
    form.setValue("payload.basic.start_date", basic.start_date ?? null);
    form.setValue("payload.basic.responsible_3_3", basic.responsible_3_3 ?? "");
    form.setValue(
      "payload.basic.flow_signal_level",
      basic.flow_signal_level ?? "",
    );
    form.setValue("payload.basic.base_file", basic.base_file ?? "");

    form.setValue(
      "payload.flow_ids",
      safeArray(payload.flow_ids).map((v: any) => ({ value: v })),
    );
    form.setValue(
      "payload.channels",
      safeArray(payload.channels).map((v: any) => ({ value: v })),
    );
  },

  build: (data, ctx) => {
    const { copy, ...base } = buildBasePayload(data, ctx.fullCode);
    return {
      ...base,
      payload: {
        basic: {
          direction: data.payload.basic.direction,
          action_type: data.payload.basic.action_type,
          company_name: data.payload.basic.company_name,
          request_date: data.payload.basic.request_date,
          request_number: data.payload.basic.request_number,
          reason: data.payload.basic.reason,
          start_date: data.payload.basic.start_date,
          responsible_3_3: data.payload.basic.responsible_3_3,
          flow_signal_level: data.payload.basic.flow_signal_level,
          base_file: data.payload.basic.base_file || data.payload.file_name,
        },
        flow_ids: safeArray(data.payload.flow_ids)
          .map((item: any) => (typeof item === "string" ? item : item?.value))
          .filter(Boolean),
        channels: safeArray(data.payload.channels)
          .map((item: any) => (typeof item === "string" ? item : item?.value))
          .filter(Boolean),
      },
    };
  },
};

export default h1746;
