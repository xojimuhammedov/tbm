import { Handler } from "@/pages/tbp/hujjatlar/hooks/component/types/types.ts";
import { buildBasePayload } from "../utils/commonPayload";
import { formatToISO } from "../utils/time";

const h1214: Handler = {
  populate: (form, payload) => {
    const basic = payload.basic || {};
    form.setValue("payload.basic.title", basic.title ?? payload.title ?? "");
    form.setValue(
      "payload.basic.start_time",
      basic.start_time ?? payload.start_time ?? ""
    );
    form.setValue(
      "payload.basic.end_time",
      basic.end_time ?? payload.end_time ?? ""
    );

    form.setValue("payload.content", payload.content ?? "");
    form.setValue("payload.including", payload.including ?? "");
    form.setValue("payload.main_routes", payload.main_routes ?? "");
    form.setValue("payload.reserve_routes", payload.reserve_routes ?? "");
    form.setValue("payload.concert_second", payload.concert_second ?? "");
    form.setValue("payload.responsible_person", payload.responsible_person ?? "");
    form.setValue("payload.concert_text", payload.concert_text ?? "");
    form.setValue("payload.basis", payload.basis ?? "");
    form.setValue("payload.file_name", basic.base_file ?? payload.file_name ?? "");

    const stoppedFlows = payload.stopped_flows || [];
    const formattedStoppedFlows = Array.isArray(stoppedFlows)
      ? stoppedFlows.map((item: any) => item.code || item)
      : [];

    form.setValue("payload.stopped_flows", formattedStoppedFlows, {
      shouldDirty: true,
      shouldValidate: true,
    });
  },

  build: (data, ctx) => {
    const basePayload = buildBasePayload(data, ctx.fullCode);
    return {
      ...basePayload,
      code: basePayload.code || "12-14",
      payload: {
        basic: {
          title: data.payload.basic.title,
          start_time: formatToISO(data.payload.basic.start_time),
          end_time: formatToISO(data.payload.basic.end_time),
          base_file: data.payload.file_name || data.payload?.basic?.base_file || "",
        },
        content: data.payload.content || "",
        stopped_flows: data.payload.stopped_flows || [],
        including: data.payload.including || "",
        main_routes: data.payload.main_routes || "",
        reserve_routes: data.payload.reserve_routes || "",
        responsible_person: data.payload.responsible_person || "",
        concert_text: data.payload.concert_text || "",
        concert_second: data.payload.concert_second || "",
        basis: data.payload.basis || "",
      },
    };
  },
};

export default h1214;
